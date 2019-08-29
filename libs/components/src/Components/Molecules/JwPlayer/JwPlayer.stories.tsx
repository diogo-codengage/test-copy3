import React from 'react'
import { storiesOf } from '@storybook/react'

import SANJwPlayer from './JwPlayer'

const Example = () => (
    <SANJwPlayer
        playerId='playerId'
        playlist='https://cdn.jwplayer.com/v2/media/yp34SRmf'
        playerScript='https://cdn.jwplayer.com/libraries/jX7FSJdG.js'
        isMuted={false}
        title='Nome da aula exemplo que'
        subtitle='Disciplina 3, atividade 5'
        rate={{
            value: 3,
            onChange: console.log
        }}
        onFavorite={console.log}
        onOpenMenu={console.log}
        onNext={console.log}
        onPrevious={console.log}
    />
)

storiesOf('Molecules.Banner', module).add('Simple', () => <Example />, {
    style: {
        padding: 0
    }
})

