import React, { useRef } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANJwPlayer, SANQuery } from '@sanar/components'

import { GET_RESOURCE } from 'Apollo/Classroom/Queries/resource'

interface IParams {
    resourceId: string
    themeId: string
    type: string
}

const FLXClassroomVideo = (props: RouteComponentProps<IParams>) => {
    const {
        match: {
            params: { themeId, resourceId }
        }
    } = props
    const playerRef = useRef()

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
                    <SANJwPlayer
                        ref={playerRef}
                        playerId='playerId'
                        playerScript='/jwplayer/jwplayer.js'
                        playlist={playlist}
                        licenseKey={process.env.REACT_APP_JWPLAYER}
                        isMuted={false}
                        title={resource.video.title}
                        subtitle={resource.course.name}
                    />
                )
            }}
        </SANQuery>
    )
}

export default withRouter(FLXClassroomVideo)
