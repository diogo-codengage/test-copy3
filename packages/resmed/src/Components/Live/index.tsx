import React, { useState, useMemo, memo } from 'react'

import styled from 'styled-components'
import { theme, ifProp, ifNotProp } from 'styled-tools'
import { isBrowser } from 'react-device-detect'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    ISANBoxProps,
    SANTypography,
    SANAvatar,
    SANLayoutContainer,
    SANSkeleton
} from '@sanar/components'

import { ILive } from 'Apollo/Lives/Queries/lives'

const skeletonProps: ISANBoxProps = {
    bg: 'grey.8',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: { sm: 'base', _: '0' }
}

const SkeletonVideo = () => (
    <SANBox {...skeletonProps} p='md'>
        <SANSkeleton
            dark
            avatar={{ size: 40, shape: 'circle' }}
            active
            paragraph={false}
        />
    </SANBox>
)

const arr = new Array(7).fill(0).map((_, i) => i)
const renderSkeleton = e => (
    <SANSkeleton
        key={e}
        dark
        avatar={{ size: 24, shape: 'circle' }}
        active
        paragraph={false}
    />
)

const SkeletonChat = () => (
    <SANBox {...skeletonProps} px='md' pt='8' pb='115px'>
        {arr.map(renderSkeleton)}
    </SANBox>
)

const SkeletonDescription = () => (
    <SANBox mt={{ md: '7', _: '0' }}>
        <SANSkeleton active paragraph={{ rows: 1, width: '10%' }} />
        <SANSkeleton
            avatar={{ size: 40, shape: 'circle' }}
            active
            paragraph={{ rows: 1, width: '40%' }}
        />
    </SANBox>
)

const Content = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 0;
`

const VideoWrapper = styled(SANBox)<{ hasLive: boolean }>`
    border-radius: ${theme('radii.base')};
    width: ${ifProp('hasLive', '68%', '100%')};
    padding-bottom: ${ifNotProp('hasLive', '55.25%')};

    ${theme('mediaQueries.down.lg')} {
        width: 100%;
        margin-bottom: ${theme('space.md')};
        padding-bottom: 56.25%;
    }
    ${theme('mediaQueries.down.sm')} {
        border-radius: 0;
    }
`

const ChatWrapper = styled(SANBox)`
    border-radius: ${theme('radii.base')};
    border: 1px solid ${theme('colors.grey.2')};
    width: 30%;
    ${theme('mediaQueries.down.lg')} {
        width: 100%;
        padding-bottom: 100%;
    }
    ${theme('mediaQueries.down.md')} {
        border-radius: 0;
    }
`

const style: ISANBoxProps = {
    position: 'relative',
    pb: '41.25%',
    height: 0,
    overflow: 'hidden'
}

interface IRMLiveProps {
    hasLive?: boolean
    loading?: boolean
    hasOnline?: boolean
    live?: ILive
}

const RMLive = memo<IRMLiveProps>(
    ({ live, loading = false, hasLive = true, hasOnline = false }) => {
        const { t } = useTranslation('resmed')
        const [hasLoadedVideo, setLoadedVideo] = useState(false)
        const [hasLoadedChat, setLoadedChat] = useState(false)

        const chat = useMemo(
            () => (
                <ChatWrapper {...style}>
                    {(!hasLoadedChat || loading) && <SkeletonChat />}
                    {!loading && !!live && (
                        <Content
                            src={`https://www.youtube.com/live_chat?v=${live.youtubeId}&embed_domain=${window.location.hostname}`}
                            allowFullScreen
                            title='Chat'
                            onLoad={() => setLoadedChat(true)}
                        />
                    )}
                </ChatWrapper>
            ),
            [loading, hasLoadedChat, live]
        )

        const videoPath = useMemo(
            () =>
                !!live ? `https://www.youtube.com/embed/${live.youtubeId}` : '',
            [live]
        )

        const startDate = useMemo(
            () => new Date(!!live ? live.startDate : ''),
            [live]
        )
        const formatType = useMemo(
            () => `DD/MM/YYYY [${t('lives.nextsList.at')}] HH[h]`,
            [t]
        )

        return (
            <>
                <SANLayoutContainer px={{ md: 'md', _: '0' }}>
                    <SANBox
                        display='flex'
                        justifyContent='space-between'
                        flexDirection={{ lg: 'row', _: 'column' }}
                    >
                        <VideoWrapper hasLive={hasLive} {...style}>
                            {(!hasLoadedVideo || loading) && <SkeletonVideo />}
                            <Content
                                src={videoPath}
                                allowFullScreen
                                title='Stream'
                                onLoad={() => setLoadedVideo(true)}
                            />
                        </VideoWrapper>
                        {isBrowser && hasOnline && chat}
                    </SANBox>
                </SANLayoutContainer>
                <SANLayoutContainer>
                    {!loading && !!live ? (
                        <>
                            <SANTypography
                                color='grey.7'
                                fontWeight='bold'
                                fontSize='lg'
                                mb='xs'
                                mt={{ md: '7', _: '0' }}
                            >
                                {live.title}
                            </SANTypography>
                            <SANTypography
                                color='grey.4'
                                fontSize='sm'
                                mb={{ md: 'lg', _: 'md' }}
                            >
                                {format(
                                    startDate,
                                    startDate.getMinutes() > 0
                                        ? `${formatType} mm[m]`
                                        : formatType
                                )}
                            </SANTypography>
                            {!!live.description && (
                                <SANTypography color='grey.7' fontSize='md'>
                                    {live.description}
                                </SANTypography>
                            )}
                            {!!live.professor && (
                                <SANBox
                                    display='flex'
                                    alignItems='center'
                                    mt={{ md: 'lg', _: 'md' }}
                                >
                                    <SANAvatar
                                        src={live.professor.profilePicture}
                                        size={40}
                                        borderRadius={50}
                                    />
                                    <SANBox ml='sm'>
                                        <SANTypography
                                            color='grey.4'
                                            fontSize='xs'
                                            transform='uppercase'
                                        >
                                            {t('lives.facilitedBy')}
                                        </SANTypography>
                                        <SANTypography
                                            color='grey.7'
                                            fontWeight='bold'
                                            fontSize='md'
                                        >
                                            {live.professor.name}
                                        </SANTypography>
                                        <SANTypography
                                            color='grey.6'
                                            fontSize='sm'
                                        >
                                            {live.professor.academicTraining}
                                        </SANTypography>
                                    </SANBox>
                                </SANBox>
                            )}
                        </>
                    ) : (
                        <SkeletonDescription />
                    )}
                </SANLayoutContainer>
            </>
        )
    }
)

export default RMLive
