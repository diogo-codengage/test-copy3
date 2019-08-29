import React, { useRef } from 'react'

import { SANJwPlayer } from '@sanar/components'

const FLXClassroomVideo = () => {
    const playerRef = useRef()

    return (
        <SANJwPlayer
            ref={playerRef}
            playerId='playerId'
            playerScript='/jwplayer/jwplayer.js'
            playlist={{file:'https://cdn.jwplayer.com/manifests/eqXRiD4T.m3u8'}}
            licenseKey={process.env.REACT_APP_JWPLAYER}
            isMuted={false}
            title='Nome da aula exemplo que'
            subtitle='Disciplina 3, atividade 5'
        />
    )
}

export default FLXClassroomVideo
