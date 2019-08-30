import React, { useRef } from 'react'

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

interface IParams {
    resourceId: string
    themeId: string
    type: string
}

const SANColStyled = styled(SANCol)`
    flex: 1;
`

const SANColHeader = styled(SANCol)`
    @media screen and (orientation: landscape) {
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
                    <SANRow
                        type='flex'
                        flexDirection='column'
                        flex='1'
                        gutter={16}
                    >
                        <SANColHeader xs={24} md={0}>
                            <SANClassroomHeader
                                title={resource.video.title}
                                subtitle={resource.course.name}
                                actions={false}
                            />
                        </SANColHeader>
                        <SANColStyled span={24}>
                            <SANJwPlayer
                                ref={playerRef}
                                playerId='playerId'
                                playerScript='/jwplayer/jwplayer.js'
                                playlist={playlist}
                                licenseKey={process.env.REACT_APP_JWPLAYER}
                                isMuted={false}
                                title={resource.video.title}
                                subtitle={resource.course.name}
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
                        </SANColStyled>
                        <SANCol xs={24} sm={24} md={0}>
                            <SANBox
                                displayFlex
                                justifyContent='space-between'
                                alignItems='center'
                                px='md'
                                py='xs'
                            >
                                <SANBox displayFlex alignItems='center'>
                                    <SANTypography
                                        variant='subtitle2'
                                        color='white.7'
                                        mr='xs'
                                    >
                                        {t('classroom.video.rate')}
                                    </SANTypography>
                                    <SANRate value={3} />
                                </SANBox>
                                <SANButton circle variant='text' color='white'>
                                    {false ? (
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
                        </SANCol>
                        <SANCol xs={24} sm={24} md={0}>
                            <SANBox
                                displayFlex
                                justifyContent='space-between'
                                alignItems='center'
                                px='md'
                                pt='xs'
                                pb='8'
                            >
                                <SANButton
                                    size='small'
                                    variant='outlined'
                                    color='white'
                                    mr='xs'
                                    block
                                >
                                    <SANEvaIcon
                                        name='arrow-back-outline'
                                        mr='xs'
                                        fontSize='lg'
                                    />
                                    Anterior
                                </SANButton>
                                <SANButton
                                    size='small'
                                    variant='outlined'
                                    color='white'
                                    ml='xs'
                                    block
                                >
                                    Próximo
                                    <SANEvaIcon
                                        name='arrow-forward-outline'
                                        ml='xs'
                                        fontSize='lg'
                                    />
                                </SANButton>
                            </SANBox>
                        </SANCol>
                    </SANRow>
                )
            }}
        </SANQuery>
    )
}

export default withRouter(FLXClassroomVideo)
