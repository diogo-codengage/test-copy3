import React, { useState, useMemo, useEffect, memo } from 'react'

import styled from 'styled-components'
import { theme, ifProp, ifNotProp } from 'styled-tools'
import { isBrowser } from 'react-device-detect'
import { useApolloClient } from '@apollo/react-hooks'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANTypography,
    SANAvatar,
    SANLayoutContainer,
    SANSkeleton,
    SANEvaIcon
} from '@sanar/components'
import { getUTCDate } from '@sanar/utils/dist/Date'

import { GET_LIVE, ILiveQuery } from 'Apollo/Lives/Queries/live'

const skeletonProps = {
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
    <SANBox mt='xxl'>
        <SANSkeleton active paragraph={{ rows: 1, width: '10%' }} />
        <SANSkeleton
            avatar={{ size: 40, shape: 'circle' }}
            active
            paragraph={{ rows: 1, width: '40%' }}
        />
    </SANBox>
)

const Linkedin = styled(SANEvaIcon)`
    background-color: ${theme('colors.grey.0')};
    border: 1px solid ${theme('colors.grey.1')};
    border-radius: ${theme('radii.base')};
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Content = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 0;
`

const VideoWrapper = styled(SANBox)<{ current: boolean }>`
    border-radius: ${theme('radii.base')};
    width: ${ifProp('current', '68%', '100%')};
    padding-bottom: ${ifNotProp('current', '55.25%')};

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
    ${theme('mediaQueries.down.sm')} {
        border-radius: 0;
    }
`

const style = {
    position: 'relative',
    pb: '41.25%',
    height: 0,
    overflow: 'hidden'
}

const youtubeId = process.env.REACT_APP_YOUTUBE_ID

interface IRMLiveProps {
    id: string
    current?: boolean
}

const RMLive = memo<IRMLiveProps>(({ id, current = true }) => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const [hasLoadedVideo, setLoadedVideo] = useState(false)
    const [hasLoadedChat, setLoadedChat] = useState(false)
    const [loading, setLoading] = useState(false)
    const [live, setLive] = useState()

    useEffect(() => {
        const fetchLive = async () => {
            setLoading(true)
            try {
                const {
                    data: { live }
                } = await client.query<ILiveQuery>({
                    query: GET_LIVE,
                    variables: { id }
                })
                setLive(live)
            } catch {}
            setLoading(false)
        }
        !!id && fetchLive()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const chat = useMemo(
        () => (
            <ChatWrapper {...style}>
                {(!hasLoadedChat || loading) && <SkeletonChat />}
                {!loading && !!live && (
                    <Content
                        src={`https://www.youtube.com/live_chat?v=${live.youtubeId}&embed_domain=${window.location.hostname}`}
                        allowFullScreen
                        title='Chat'
                        referrerPolicy='origin'
                        onLoad={() => setLoadedChat(true)}
                    />
                )}
            </ChatWrapper>
        ),
        [loading, hasLoadedChat, live]
    )

    return (
        <>
            <SANLayoutContainer px={{ sm: 'md', _: '0' }}>
                <SANBox
                    display='flex'
                    justifyContent='space-between'
                    flexDirection={{ lg: 'row', _: 'column' }}
                >
                    <VideoWrapper current={current} {...style}>
                        {(!hasLoadedVideo || loading) && <SkeletonVideo />}
                        <Content
                            src={`https://www.youtube.com/embed/live_stream?channel=${youtubeId}`}
                            allowFullScreen
                            title='Stream'
                            onLoad={() => setLoadedVideo(true)}
                        />
                    </VideoWrapper>
                    {isBrowser && current && chat}
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
                            mt={{ xs: '8', _: 'xxl' }}
                        >
                            {live.title}
                        </SANTypography>
                        <SANTypography color='grey.4' fontSize='sm' mb='lg'>
                            {format(getUTCDate(live.date), 'DD/MM/YYYY')}
                        </SANTypography>
                        {!!live.description && (
                            <SANTypography color='grey.7' fontSize='md'>
                                {live.description}
                            </SANTypography>
                        )}
                        {!!live.professor && (
                            <SANBox display='flex' alignItems='center' mt='lg'>
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
                                    <SANBox display='flex' alignItems='center'>
                                        <Linkedin
                                            name='linkedin'
                                            mr='xs'
                                            size='xsmall'
                                        />
                                        <SANTypography
                                            color='grey.6'
                                            fontSize='sm'
                                        >
                                            Enfermeiro mestre em alguma coisa
                                        </SANTypography>
                                    </SANBox>
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
})

export default RMLive
