import React, { useRef } from 'react'

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

import { GET_RESOURCE } from 'Apollo/Classroom/Queries/resource'
import { CREATE_RATING } from 'Apollo/Classroom/Mutations/rating'
import { useClassroomContext } from './Context'
import { useLayoutContext } from 'Pages/Layout/Context'

interface IParams {
    resourceId: string
    themeId: string
    type: string
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
            params: { themeId, resourceId }
        }
    } = props
    const playerRef = useRef()
    const { handleBookmark } = useClassroomContext()
    const { onOpenMenu, navigations } = useLayoutContext()

    const handleRating = async ({ value, resourceId }) => {
        try {
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

    return (
        <SANQuery
            query={GET_RESOURCE}
            options={{ variables: { themeId, resourceId } }}
            loaderProps={{ minHeight: '100vh', flex: true, dark: true }}
        >
            {({ data: { resource } }) => {
                const file = resource.video.providers.data.find(
                    provider => provider.code === 'jwplayer'
                )
                const playlist = {
                    file: file && file.files.smil.url,
                    image: resource.video.thumbnails.large
                }
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