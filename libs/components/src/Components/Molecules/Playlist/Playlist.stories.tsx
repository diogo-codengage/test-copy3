import React from 'react'
import { storiesOf } from '@storybook/react'
import SANPlaylist from './Playlist'

import { boolean } from '@storybook/addon-knobs'

const items = [
    {
        id: '5d1f5a66b8e15b002750005b',
        progress: { id: '5d277cb11a4adc0039d31e28', percentage: 100 },
        title: 'Farmacocinética: Absorção',
        index: 6,
        resource_type: 'Document',
        document: {
            title: 'Title'
        }
    }
]

storiesOf('Molecules.Playlist', module).add('Simple', () => (
    <SANPlaylist
        loading={boolean('Loading', false)}
        items={items}
        currentIndex={0}
        goToResource={items[0]}
    />
))
