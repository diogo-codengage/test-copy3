import React, { useRef, useEffect, useState } from 'react'

import { theme } from 'styled-tools'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANJwPlayer,
    SANQuery,
    SANClassroomHeader,
    SANTypography,
    SANRow,
    SANCol,
    SANRate,
    SANBox,
    SANButton,
    SANEvaIcon
} from '@sanar/components'
import { createDebounce } from '@sanar/utils/dist/Debounce'

import { events } from 'Config/Segment'

import { GET_RESOURCE } from 'Apollo/Classroom/Queries/resource'
import { CREATE_RATING } from 'Apollo/Classroom/Mutations/rating'
import { useClassroomContext } from './Context'
import { useLayoutContext, IUrlParams } from 'Pages/Layout/Context'

interface IParams extends IUrlParams {
    courseId: string
    resourceId: string
    themeId: string
    type: 'video' | 'documento' | 'questoes'
}

const Header = styled.div`
    @media screen and (orientation: landscape) {
        display: none;
    }

    ${theme('mediaQueries.up.md')} {
        display: none;
    }
`

const FLXClassroomVideo = (props: RouteComponentProps<IParams>) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const {
        match: {
            params: { themeId, resourceId, courseId }
        }
    } = props
    const playerRef = useRef<any>()
    const { handleBookmark, handleProgress } = useClassroomContext()
    const { onOpenMenu, navigations } = useLayoutContext()
    const [videoError, setVideoError] = useState(false)
    const [videoReady, setVideoReady] = useState(false)
    const [willStart, setWillStart] = useState(true)

    const handleVideoReady = () => {
        setVideoReady(true)
    }

    const handleVideoError = () => {
        setVideoError(true)
    }

    const handleRating = async ({ value, resourceId }) => {
        try {
            window.analytics.track(
                events['E-Learning']['Video Evaluated'].event,
                events['E-Learning']['Video Evaluated'].data
            )
            await client.mutate({
                mutation: CREATE_RATING,
                variables: {
                    resourceId,
                    resourceType: 'Video',
                    rating: { value, type: 'numeric' }
                }
            })
        } catch {}
    }

    const handlePlay = () => {
        window.analytics.track(
            events['E-Learning']['Content Watched'].event,
            events['E-Learning']['Content Watched'].data
        )
    }

    const handlePause = () => {
        window.analytics.track(
            events['E-Learning']['Content Stopped'].event,
            events['E-Learning']['Content Stopped'].data
        )
    }

    const handleComplete = () => {
        window.analytics.track(
            events['E-Learning']['Content Completed'].event,
            events['E-Learning']['Content Completed'].data
        )
    }

    const handlePlaybackRateChanged = () => {
        window.analytics.track(
            events['E-Learning']['Content Evaluated'].event,
            events['E-Learning']['Content Evaluated'].data
        )
    }

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    const onProgress = percentage => {
        if (!videoError && videoReady) {
            const timeInSeconds =
                playerRef && playerRef.current
                    ? playerRef.current.position()
                    : 0

            handleProgress({
                timeInSeconds,
                percentage,
                courseId,
                resource: {
                    id: resourceId,
                    type: 'Video'
                }
            })
        }
    }

    const onComplete = () => {
        handleProgress({
            percentage: 100,
            courseId,
            resource: {
                id: resourceId,
                type: 'Video'
            }
        })
        handleComplete()
    }

    const getStartTime = time => {
        if (videoReady && playerRef && playerRef.current) {
            playerRef.current.seek(time)
            setWillStart(false)
        }
    }

    return (
        <SANQuery
            query={GET_RESOURCE}
            options={{
                variables: { themeId, resourceId, courseId },
                fetchPolicy: 'network-only'
            }}
            loaderProps={{ minHeight: '100vh', flex: true, dark: true }}
            errorProps={{ dark: true }}
        >
            {({ data: { resource } }) => {
                const file = resource.video.providers.data.find(
                    provider => provider.code === 'jwplayer'
                )

                const playlist = [
                    {
                        file: file && file.files.smil.url,
                        image: resource.video.thumbnails.large
                    }
                ]

                const debounceProgress = createDebounce(onProgress, 500)

                willStart &&
                    resource &&
                    resource.video.progress &&
                    getStartTime(resource.video.progress.timeInSeconds)

                return (
                    <>
                        <SANBox
                            displayFlex
                            flexDirection='column'
                            flex='1'
                            bg='grey-solid.8'
                        >
                            <Header>
                                <SANClassroomHeader
                                    title={resource.video.title}
                                    subtitle={resource.course.name}
                                    actions={false}
                                    onOpenMenu={onOpenMenu}
                                />
                            </Header>
                            <SANJwPlayer
                                ref={playerRef}
                                onReady={handleVideoReady}
                                onError={handleVideoError}
                                onOpenMenu={onOpenMenu}
                                playerId='playerId'
                                playerScript='/jwplayer/jwplayer.js'
                                playlist={playlist}
                                licenseKey={process.env.REACT_APP_JWPLAYER}
                                isMuted={false}
                                title={resource.video.title}
                                subtitle={resource.course.name}
                                onNext={navigations.next.onClick}
                                onPrevious={navigations.previous.onClick}
                                onPlay={handlePlay}
                                onPause={handlePause}
                                onOneHundredPercent={onComplete}
                                onThreeSeconds={() => debounceProgress(1)}
                                onTwentyFivePercent={() => debounceProgress(25)}
                                onFiftyPercent={() => debounceProgress(50)}
                                onSeventyFivePercent={() =>
                                    debounceProgress(75)
                                }
                                onPlaybackRateChanged={
                                    handlePlaybackRateChanged
                                }
                                rate={{
                                    value:
                                        resource.video.rating &&
                                        resource.video.rating.rating.value,
                                    onChange: value =>
                                        handleRating({
                                            value,
                                            resourceId: resource.video.id
                                        })
                                }}
                                BookmarkProps={{
                                    value: resource.video.bookmarked,
                                    onClick: () =>
                                        handleBookmark({
                                            resourceId,
                                            resourceType: 'Video',
                                            bookmark: resource.video.bookmarked
                                        })
                                }}
                            />
                            <SANBox
                                display={{ md: 'none', _: 'flex' }}
                                justifyContent='space-between'
                                alignItems='center'
                                bg='grey-solid.8'
                                px='md'
                                pt='xs'
                            >
                                <SANBox displayFlex alignItems='center'>
                                    <SANTypography
                                        variant='subtitle2'
                                        color='white.7'
                                        mr='xs'
                                    >
                                        {t('classroom.video.rate')}
                                    </SANTypography>
                                    <SANRate
                                        value={
                                            resource.video.rating &&
                                            resource.video.rating.rating.value
                                        }
                                        onChange={value =>
                                            handleRating({
                                                value,
                                                resourceId: resource.video.id
                                            })
                                        }
                                    />
                                </SANBox>
                                <SANButton
                                    circle
                                    variant='text'
                                    color='white'
                                    onClick={() =>
                                        handleBookmark({
                                            resourceId,
                                            resourceType: 'Video',
                                            bookmark: resource.video.bookmarked
                                        })
                                    }
                                >
                                    {resource.video.bookmarked ? (
                                        <SANEvaIcon
                                            name='heart'
                                            key='bookmarked'
                                            color='secondary'
                                            fontSize='lg'
                                        />
                                    ) : (
                                        <SANEvaIcon
                                            name='heart-outline'
                                            key='not-bookmarked'
                                            fontSize='lg'
                                        />
                                    )}
                                </SANButton>
                            </SANBox>
                        </SANBox>
                        <SANRow
                            gutter={16}
                            p='md'
                            mb='8'
                            display={{ md: 'none', _: 'flex' }}
                        >
                            <SANCol xs={12} md={0} bg='grey-solid.8'>
                                <SANButton
                                    size='small'
                                    variant='outlined'
                                    color='white'
                                    block
                                    onClick={navigations.previous.onClick}
                                    disabled={navigations.previous.disabled}
                                >
                                    <SANEvaIcon
                                        name='arrow-back-outline'
                                        mr='xs'
                                        fontSize='lg'
                                    />
                                    <span>{navigations.previous.children}</span>
                                </SANButton>
                            </SANCol>

                            <SANCol xs={12} md={0} bg='grey-solid.8'>
                                <SANButton
                                    size='small'
                                    variant='outlined'
                                    color='white'
                                    block
                                    onClick={navigations.next.onClick}
                                    disabled={navigations.next.disabled}
                                >
                                    <span>{navigations.next.children}</span>
                                    <SANEvaIcon
                                        name='arrow-forward-outline'
                                        ml='xs'
                                        fontSize='lg'
                                    />
                                </SANButton>
                            </SANCol>
                        </SANRow>
                    </>
                )
            }}
        </SANQuery>
    )
}

export default withRouter(FLXClassroomVideo)
