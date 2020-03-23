import React, { useRef, useState, useMemo, memo, useEffect } from 'react'

import { theme } from 'styled-tools'
import styled from 'styled-components'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as Sentry from '@sentry/browser'

import {
    SANJwPlayer,
    SANQuery,
    SANClassroomHeader,
    SANBox,
    ISANBoxProps
} from '@sanar/components'
import { useWindowSize } from '@sanar/utils/dist/Hooks'
import { createDebounce } from '@sanar/utils/dist/Debounce'

import { useAuthContext } from 'Hooks/auth'
import RMCollection from 'Components/Collection'
import { GET_VIDEO, IVideoQuery } from 'Apollo/Classroom/Queries/video'
import { useLayoutContext } from 'Pages/Private/Layout/Context'
import { useMainContext } from 'Pages/Private/Context'

import { useClassroomContext } from './Context'
import { IParams } from './'

const Header = styled.div`
    @media screen and (orientation: landscape) {
        display: none;
    }

    ${theme('mediaQueries.up.md')} {
        display: none;
    }
`

const RMClassroomVideo = memo<RouteComponentProps<IParams>>(
    ({ history, match: { params: paramsProp } }) => {
        const { width } = useWindowSize()
        const playerRef = useRef<any>()
        const collectionRef = useRef<any>()
        const {
            handleProgress,
            specialty,
            clickerName,
            setClickerName
        } = useClassroomContext()
        const { params, onOpenMenu, setParams } = useLayoutContext()
        const { handleTrack } = useMainContext()
        const [videoError, setVideoError] = useState(false)
        const [videoReady, setVideoReady] = useState(false)
        const [willStart, setWillStart] = useState(true)
        const { me } = useAuthContext()

        const dataToTrack = useMemo(
            () => ({
                'User ID': me.id,
                'Specialty ID': params.specialtyId,
                'Subspecialty ID': params.subspecialtyId,
                'Lesson ID': params.lessonId,
                'Clicker ID': params.collectionId,
                'Video ID': params.contentId
            }),
            [params, me]
        )

        const handleVideoReady = () => setVideoReady(true)

        const handlePlay = () => handleTrack('Video started', dataToTrack)

        const handleResume = () => {
            const timeInSeconds = parseInt(playerRef.current.position(), 10)
            handleTrack('Video resumed', {
                'Time in seconds': timeInSeconds,
                ...dataToTrack
            })
        }

        const handlePause = () => {
            const timeInSeconds = parseInt(playerRef.current.position(), 10)
            handleTrack('Video paused', {
                'Time in seconds': timeInSeconds,
                ...dataToTrack
            })
        }

        const handleComplete = () => handleTrack('Video completed', dataToTrack)

        const handleVideoError = e => {
            setVideoError(true)
            Sentry.captureException(e)
        }

        const getStartTime = time => {
            if (videoReady && playerRef && playerRef.current) {
                !!playerRef.current.seek && playerRef.current.seek(time)
                !!playerRef.current.pause && playerRef.current.pause()
                setWillStart(false)
            }
        }

        const onChangeCollection = collection => {
            setClickerName(collection.name)
            history.push(
                `../../${collection.id}/video/${collection.content.video.id}`
            )
        }

        const onProgress = (percentage, content) => {
            new Promise(resolve => {
                console.log({ videoError, content })
                if (!videoError && !!content && content.progress < 100) {
                    const timeInSeconds =
                        playerRef && playerRef.current
                            ? playerRef.current.position()
                            : 0

                    handleProgress({
                        timeInSeconds: parseInt(timeInSeconds, 10),
                        percentage,
                        resourceId: content.id,
                        resourceType: 'Video'
                    })
                    resolve()
                } else {
                    resolve()
                }
            }).then(() => {
                if (percentage === 100) {
                    goNextConteent()
                }
            })
        }

        const goNextConteent = () => {
            const current = collectionRef.current.getCurrent()
            // if have quiz on this clicker go to quiz
            if (
                !!current.content &&
                !!current.content.quiz &&
                !!current.content.quiz.questions &&
                !!current.content.quiz.questions.length
            ) {
                history.push(
                    `../../${current.id}/quiz/${current.content.quiz.id}/0`
                )
            } else {
                const next = collectionRef.current.getNext()
                // if have next clicker go to next
                if (!!next) {
                    history.push(
                        `../../${next.id}/video/${next.content.video.id}`
                    )
                } else {
                    history.push(`../../avaliacao`)
                }
            }
        }

        useEffect(() => {
            if (paramsProp.contentId !== params.contentId) {
                setParams(old => ({
                    ...old,
                    subspecialtyId: '',
                    ...paramsProp
                }))
                setWillStart(true)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [paramsProp])

        const wrapper: ISANBoxProps = useMemo(
            () =>
                width > 992
                    ? {
                          flexDirection: 'row'
                      }
                    : {
                          flexDirection: 'column'
                      },
            [width]
        )

        const pathScript = useMemo(
            () =>
                process.env.REACT_APP_ENV === 'production'
                    ? '/residenciamedica/jwplayer/jwplayer.js'
                    : '/jwplayer/jwplayer.js',
            []
        )

        const debounceProgress = createDebounce(onProgress, 500)

        return (
            <SANQuery
                query={GET_VIDEO}
                options={{
                    variables: { id: paramsProp.contentId },
                    skip: !paramsProp.contentId
                }}
                loaderProps={{ minHeight: '100vh', flex: true, dark: true }}
                errorProps={{ dark: true }}
            >
                {({ data: { video } }: { data: IVideoQuery }) => {
                    if (
                        willStart &&
                        video &&
                        video.timeInSeconds &&
                        video.timeInSeconds > 3 &&
                        video.progress < 100
                    ) {
                        getStartTime(video.timeInSeconds)
                    } else {
                        willStart && setWillStart(false)
                    }
                    return (
                        <SANBox bg='grey-solid.8' position='relative'>
                            <Header>
                                <SANClassroomHeader
                                    title={clickerName}
                                    subtitle={specialty.title}
                                    actions={false}
                                    onOpenMenu={onOpenMenu}
                                    plataform='resmed'
                                />
                            </Header>
                            <SANBox display='flex' bg='grey.9' {...wrapper}>
                                <SANBox flex='1'>
                                    <SANJwPlayer
                                        plataform='resmed'
                                        ref={playerRef}
                                        onReady={handleVideoReady}
                                        onPlay={handlePlay}
                                        onResume={handleResume}
                                        onPause={handlePause}
                                        onError={handleVideoError}
                                        onOpenMenu={onOpenMenu}
                                        playerId='playerId'
                                        playerScript={pathScript}
                                        playlist={[
                                            {
                                                file: video.source,
                                                image: video.image
                                            }
                                        ]}
                                        licenseKey={
                                            process.env.REACT_APP_JWPLAYER
                                        }
                                        isMuted={false}
                                        title={clickerName}
                                        subtitle={specialty.title}
                                        onThreeSeconds={() =>
                                            debounceProgress(1, video)
                                        }
                                        onTwentyFivePercent={() =>
                                            debounceProgress(25, video)
                                        }
                                        onFiftyPercent={() =>
                                            debounceProgress(50, video)
                                        }
                                        onSeventyFivePercent={() =>
                                            debounceProgress(75, video)
                                        }
                                        onNinetyFivePercent={() => {
                                            debounceProgress(100, video)
                                            handleComplete()
                                        }}
                                    />
                                </SANBox>
                                <SANBox
                                    {...(width <= 992 && {
                                        px: 'lg',
                                        mx: 'sm'
                                    })}
                                >
                                    <RMCollection
                                        parentId={params.lessonId}
                                        value={params.collectionId}
                                        vertical={width > 992}
                                        onChange={onChangeCollection}
                                        onCompleted={collection =>
                                            setClickerName(collection.name)
                                        }
                                        ref={collectionRef}
                                    />
                                </SANBox>
                            </SANBox>
                        </SANBox>
                    )
                }}
            </SANQuery>
        )
    }
)

export default withRouter(RMClassroomVideo)
