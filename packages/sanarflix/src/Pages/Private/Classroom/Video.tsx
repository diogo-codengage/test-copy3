import React, { useRef } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANJwPlayer, SANQuery } from '@sanar/components'

import { GET_RESOURCE } from 'Apollo/Classroom/Queries/resource'

interface IParams {
    contentId: string
    themeId: string
    type: string
}

const FLXClassroomVideo = (props: RouteComponentProps<IParams>) => {
    const {
        match: {
            params: { themeId, contentId }
        }
    } = props
    const playerRef = useRef()

    return (
        <SANQuery
            query={GET_RESOURCE}
            options={{ variables: { themeId, resourceId: contentId } }}
            loaderProps={{ minHeight: '100vh', flex: true, dark: true }}
        >
            {({ data }) => (
                <SANJwPlayer
                    ref={playerRef}
                    playerId='playerId'
                    playerScript='/jwplayer/jwplayer.js'
                    playlist={{
                        file: 'https://cdn.jwplayer.com/manifests/eqXRiD4T.m3u8'
                    }}
                    licenseKey={process.env.REACT_APP_JWPLAYER}
                    isMuted={false}
                    title='Nome da aula exemplo que'
                    subtitle='Disciplina 3, atividade 5'
                />
            )}
        </SANQuery>
    )
}

export default withRouter(FLXClassroomVideo)
