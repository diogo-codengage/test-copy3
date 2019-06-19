import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import ESJwPlayer from './JwPlayer'

// Example playlist
// playlist={[
//     {
//         title: 'Transtorno do neurodesenvolvimento (Autismo)',
//         description: 'Video description',
//         image:
//             'https://courses-platform-files-dev.s3.sa-east-1.amazonaws.com/thumb_5c3cc0c99e13b70026a54a46-large_1548557451.jpg',
//         file:
//             'https://cdn.jwplayer.com/manifests/o7cnm41y.m3u8?exp=1560821400&sig=db4c6fdbb7af8bb17d8d62ca81bec5c4',
//         tracks: [
//             {
//                 kind: 'thumbnails',
//                 file:
//                     'http://assets-jpcust.jwpsrv.com/strips/1b02B03R-120.vtt'
//             }
//         ]
//     }
// ]}

storiesOf('Molecules.JwPlayer', module).add('Simple', () => (
    <ESJwPlayer
        playerId='playerId'
        playlist='https://cdn.jwplayer.com/v2/media/yp34SRmf'
        playerScript='https://cdn.jwplayer.com/libraries/jX7FSJdG.js'
        isMuted={false}
        title='Nome da aula exemplo que'
        subtitle='Disciplina 3, atividade 5'
        rate={{
            value: 3,
            onChange: action('rateChange')
        }}
        onFavorite={action('onFavorite')}
        onOpenMenu={action('onOpenMenu')}
        onNext={action('onNext')}
        onPrevious={action('onPrevious')}
    />
))
