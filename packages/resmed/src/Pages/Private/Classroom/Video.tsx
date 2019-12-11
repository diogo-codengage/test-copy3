import React, { useRef, useState, useMemo } from 'react'

import { theme } from 'styled-tools'
import styled from 'styled-components'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANJwPlayer,
    SANQuery,
    SANClassroomHeader,
    SANBox
} from '@sanar/components'
import { useWindowSize } from '@sanar/utils/dist/Hooks'
import { createDebounce } from '@sanar/utils/dist/Debounce'

import RMCollection from 'Components/Collection'
import { GET_VIDEO, IVideoQuery, IVideo } from 'Apollo/Classroom/Queries/video'
import { useLayoutContext } from 'Pages/Private/Layout/Context'
import { useMainContext } from 'Pages/Private/Context'
import { useClassroomContext } from './Context'

import { useAuthContext } from 'Hooks/auth'

const Header = styled.div`
    @media screen and (orientation: landscape) {
        display: none;
    }

    ${theme('mediaQueries.up.md')} {
        display: none;
    }
`

const RMClassroomVideo = ({ history }: RouteComponentProps) => {
    const { width } = useWindowSize()
    const playerRef = useRef<any>()
    const collectionRef = useRef<any>()
    const { handleProgress, specialty } = useClassroomContext()
    const { params, onOpenMenu } = useLayoutContext()
    const { handleTrack } = useMainContext()
    const [videoError, setVideoError] = useState(false)
    const [videoReady, setVideoReady] = useState(false)
    const [willStart, setWillStart] = useState(true)
    const [video, setVideo] = useState<IVideo>()
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

    const handleResume = () => handleTrack('Video resumed', dataToTrack)

    const handlePause = () => handleTrack('Video paused', dataToTrack)

    const handleComplete = () => handleTrack('Video completed', dataToTrack)

    const handleVideoError = () => setVideoError(true)

    const getStartTime = time => {
        if (videoReady && playerRef && playerRef.current) {
            playerRef.current.seek(time)
            playerRef.current.pause()
            setWillStart(false)
        }
    }

    const onChangeCollection = collection =>
        history.push(
            `../../${collection.id}/video/${collection.content.video.id}`
        )

    const onCompleted = ({ video }) => setVideo(video)

    const onProgress = (percentage, resourceId) => {
        if (!videoError && !!video && video.progress < 100) {
            const timeInSeconds =
                playerRef && playerRef.current
                    ? playerRef.current.position()
                    : 0

            handleProgress({
                timeInSeconds: parseInt(timeInSeconds, 10),
                percentage,
                resourceId,
                resourceType: 'Video'
            })
        }

        if (percentage === 100) {
            const current = collectionRef.current.getCurrent()
            // if have quiz on this clicker go to quiz
            if (!!current && !!current.content.quiz) {
                history.push(
                    `../../${current.id}/quiz/${current.content.quiz.id}/${current.content.quiz.questions[0].id}`
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
    }

    const wrapper = useMemo(
        () =>
            width > 884
                ? {
                      flexDirection: 'row'
                  }
                : {
                      flexDirection: 'column'
                  },
        [width]
    )

    const debounceProgress = createDebounce(onProgress, 500)

    return (
        <SANQuery
            query={GET_VIDEO}
            options={{
                variables: { id: params.contentId },
                fetchPolicy: 'network-only',
                skip: !params.contentId,
                onCompleted: onCompleted
            }}
            loaderProps={{ minHeight: '100vh', flex: true, dark: true }}
            errorProps={{ dark: true }}
        >
            {({ data: { video } }: { data: IVideoQuery }) => {
                willStart &&
                    video &&
                    video.timeInSeconds &&
                    video.progress < 100 &&
                    getStartTime(video.timeInSeconds)

                return (
                    <SANBox bg='grey-solid.8' position='relative'>
                        <Header>
                            <SANClassroomHeader
                                title={video.title}
                                subtitle={specialty.title}
                                actions={false}
                                onOpenMenu={onOpenMenu}
                                plataform='resmed'
                            />
                        </Header>
                        <SANBox display='flex' {...wrapper}>
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
                                    playerScript='/jwplayer/jwplayer.js'
                                    playlist={[
                                        {
                                            file: video.source,
                                            image: video.image
                                        }
                                    ]}
                                    licenseKey={process.env.REACT_APP_JWPLAYER}
                                    isMuted={false}
                                    title={video.title}
                                    subtitle={specialty.title}
                                    onThreeSeconds={() =>
                                        debounceProgress(1, video.id)
                                    }
                                    onTwentyFivePercent={() =>
                                        debounceProgress(25, video.id)
                                    }
                                    onFiftyPercent={() =>
                                        debounceProgress(50, video.id)
                                    }
                                    onSeventyFivePercent={() =>
                                        debounceProgress(75, video.id)
                                    }
                                    onOneHundredPercent={() => {
                                        debounceProgress(100, video.id)
                                        handleComplete()
                                    }}
                                />
                            </SANBox>
                            <RMCollection
                                parentId={params.lessonId}
                                value={params.collectionId}
                                vertical={width > 884}
                                onChange={onChangeCollection}
                                ref={collectionRef}
                            />
                        </SANBox>
                    </SANBox>
                )
            }}
        </SANQuery>
    )
}

export default withRouter(RMClassroomVideo)
