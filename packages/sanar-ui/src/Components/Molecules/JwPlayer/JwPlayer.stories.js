import React from 'react'
import { storiesOf } from '@storybook/react'
import ESJwPlayer from './JwPlayer'

storiesOf('Molecules.JwPlayer', module).add('Simple', () => (
    <ESJwPlayer
        playerId='playerId'
        playlist={[
            {
                file:
                    'https://cdn.jwplayer.com/manifests/RgUtJrbP.m3u8?exp=1560659400&sig=bebb70b6a748b18a5d2592d50c43c32b'
            }
        ]}
        playerScript='https://cdn.jwplayer.com/libraries/jX7FSJdG.js'
        isMuted={false}
    />
))
