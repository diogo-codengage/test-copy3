import React from 'react'
import { storiesOf } from '@storyDocument/react'

import ESPlaylist from './Playlist'
import ESPlaylistList from './PlaylistList'
import ESPlaylistItem from './PlaylistItem'

const items = [
    {
        id: 1,
        type: 'Video',
        description: 'Nome da aula',
        time: '15:00',
        finish: true
    },
    {
        id: 2,
        type: 'Document',
        description: 'Material para leitura',
        finish: true
    },
    {
        id: 3,
        type: 'Video',
        description: 'Nome da aula grande fica lorem ipsum bla etc',
        time: '15:00',
        finish: true
    },
    {
        id: 4,
        type: 'Document',
        description: 'Simulado módulo 1',
        finish: true
    },
    {
        id: 5,
        type: 'Video',
        description: 'Nome da aula grande fica lorem ipsum bla etc',
        time: '15:00',
        current: true
    },
    {
        id: 6,
        type: 'Document',
        description: 'Material para leitura'
    },
    {
        id: 7,
        type: 'Video',
        description: 'Nome da aula',
        time: '15:00'
    },
    {
        id: 8,
        type: 'Document',
        description: 'Material para leitura'
    },
    {
        id: 9,
        type: 'Video',
        description: 'Nome da aula',
        time: '15:00'
    },
    {
        id: 10,
        type: 'Quiz',
        description: 'Simulado'
    }
]

storiesOf('Molecules.Playlist', module)
    .add(
        'Simple',
        () => (
            <ESPlaylistList>
                {items.map((item, i) => (
                    <ESPlaylistItem key={item.id} index={i + 1} {...item} />
                ))}
            </ESPlaylistList>
        ),
        {
            style: {
                backgroundColor: '#242938',
                padding: 20,
                minHeight: 200
            }
        }
    )
    .add('Controlled', () => <ESPlaylist items={items} />, {
        style: {
            backgroundColor: '#242938',
            padding: 20,
            minHeight: 200
        }
    })
