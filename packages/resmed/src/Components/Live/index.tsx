import React, { useState, useMemo, forwardRef } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    ISANBoxProps,
    SANTypography,
    SANAvatar,
    SANLayoutContainer,
    SANSkeleton,
    SANChat
} from '@sanar/components'
import {
    ISANChatProps,
    ISANChatRef
} from '@sanar/components/dist/Components/Organisms/Chat'
import { getUTCDate } from '@sanar/utils/dist/Date'

import { ILive } from 'Apollo/Lives/Queries/lives'
import { useAuthContext } from 'Hooks/auth'

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

const VideoWrapper = styled(SANBox)`
    border-radius: ${theme('radii.base')};
    position: relative;
    padding-bottom: 41.25%;
    height: 0;
    overflow: hidden;
    width: 73%;

    ${theme('mediaQueries.down.lg')} {
        width: 100%;
        margin-bottom: ${theme('space.md')};
        padding-bottom: 56.25%;
    }
    ${theme('mediaQueries.down.sm')} {
        border-radius: 0;
    }
`

const youtubeId = process.env.REACT_APP_YOUTUBE_ID

interface IRMLiveProps {
    hasLive?: boolean
    loadingLive?: boolean
    live?: ILive
    chat: ISANChatProps
}

const RMLive = forwardRef<ISANChatRef, IRMLiveProps>(
    ({ live, loadingLive = false, hasLive = true, chat }, ref) => {
        const { t } = useTranslation('resmed')
        const { me } = useAuthContext()
        const [hasLoadedVideo, setLoadedVideo] = useState(false)

        const videoPath = useMemo(() => {
            if (hasLive) {
                return `https://www.youtube.com/embed/live_stream?channel=${youtubeId}`
            } else if (!!live) {
                return `https://www.youtube.com/embed/${live.youtubeId}`
            }
        }, [hasLive, live])

        return (
            <>
                <SANLayoutContainer px={{ md: 'md', _: '0' }}>
                    <SANBox
                        display='flex'
                        justifyContent='space-between'
                        flexDirection={{ lg: 'row', _: 'column' }}
                    >
                        <VideoWrapper>
                            {(!hasLoadedVideo || loadingLive) && (
                                <SkeletonVideo />
                            )}
                            <Content
                                src={videoPath}
                                allowFullScreen
                                title='Stream'
                                onLoad={() => setLoadedVideo(true)}
                            />
                        </VideoWrapper>
                        <SANBox
                            mb={{ lg: '0', _: 'xl' }}
                            width={{ lg: '24%', _: '100%' }}
                        >
                            <SANTypography
                                color='grey.7'
                                fontWeight='bold'
                                fontSize='lg'
                                mb='sm'
                                ml={{ lg: '0', _: 'md' }}
                            >
                                {!chat || !chat.blocked
                                    ? t('lives.liveChat')
                                    : t('lives.chat')}
                            </SANTypography>
                            <SANChat
                                ref={ref}
                                hasMore={chat.hasMore}
                                loadMore={chat.loadMore}
                                messages={chat.messages}
                                onSend={chat.onSend}
                                blocked={chat.blocked}
                                loading={chat.loading}
                                image={me.profilePicture}
                            />
                        </SANBox>
                    </SANBox>
                </SANLayoutContainer>
                <SANLayoutContainer>
                    {!loadingLive && !!live ? (
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
                                    getUTCDate(live.startDate),
                                    'DD/MM/YYYY'
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
