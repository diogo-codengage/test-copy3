import React, { useState } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'

import {
    SANBox,
    SANTypography,
    SANAvatar,
    SANLayoutContainer,
    SANSkeleton
} from '@sanar/components'

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
    width: 68%;
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

const RMLive = () => {
    const [hasLoadedVideo, setLoadedVideo] = useState(false)
    const [hasLoadedChat, setLoadedChat] = useState(false)

    // window.navigator['__defineGetter__']('userAgent', function() {
    //     return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    // })

    return (
        <>
            <SANLayoutContainer px={{ sm: 'md', _: '0' }}>
                <SANBox
                    display='flex'
                    justifyContent='space-between'
                    flexDirection={{ lg: 'row', _: 'column' }}
                >
                    <VideoWrapper {...style}>
                        {!hasLoadedVideo && <SkeletonVideo />}
                        <Content
                            src='https://www.youtube.com/embed/live_stream?channel=UCuKwxu1nZp3ysEixnMQpPjA'
                            allowFullScreen
                            title='Stream'
                            onLoad={() => setLoadedVideo(true)}
                        />
                    </VideoWrapper>
                    <ChatWrapper {...style}>
                        {!hasLoadedChat && <SkeletonChat />}
                        <Content
                            src={`https://www.youtube.com/live_chat?v=642ce4LxrXc&embed_domain=${window.location.hostname}`}
                            allowFullScreen
                            title='Chat'
                            referrerPolicy='origin'
                            onLoad={() => setLoadedChat(true)}
                        />
                    </ChatWrapper>
                </SANBox>
            </SANLayoutContainer>
            <SANLayoutContainer>
                <SANTypography
                    color='grey.7'
                    fontWeight='bold'
                    fontSize='lg'
                    mb='xs'
                    mt={{ xs: '8', _: 'xxl' }}
                >
                    Live de Correção da prova SUS-SP 2019 - Parte 1
                </SANTypography>
                <SANTypography color='grey.4' fontSize='sm' mb='lg'>
                    27/04/2019
                </SANTypography>
                <SANTypography color='grey.7' fontSize='md'>
                    Essa é a oportunidade de você aprender como planejar seus
                    estudos em 2019! Saiba como montar um cronograma, quanto
                    tempo deverá dedicar ao estudo por dia, quantas horas para
                    cada matéria.
                </SANTypography>
                <SANBox display='flex' alignItems='center' mt='lg'>
                    <SANAvatar
                        src={
                            'https://cdn-images-1.medium.com/fit/c/200/200/0*XlT1iL_rE4s6_sa2.jpg'
                        }
                        size={40}
                        borderRadius={50}
                    />
                    <SANBox ml='sm'>
                        <SANTypography color='grey.4' fontSize='xs'>
                            LIVE FACILITADA POR:
                        </SANTypography>
                        <SANTypography
                            color='grey.7'
                            fontWeight='bold'
                            fontSize='md'
                        >
                            Diogo Biz
                        </SANTypography>
                        <SANTypography color='grey.6' fontSize='sm'>
                            Enfermeiro mestre em alguma coisa
                        </SANTypography>
                    </SANBox>
                </SANBox>
            </SANLayoutContainer>
        </>
    )
}

export default RMLive
