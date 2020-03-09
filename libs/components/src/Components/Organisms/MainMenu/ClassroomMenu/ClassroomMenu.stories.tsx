import React from 'react'
import { storiesOf } from '@storybook/react'
import SANClassroomMenu from './ClassroomMenu'

import { text, number, boolean } from '@storybook/addon-knobs'

const items = [
    {
        id: '123',
        name: 'Odontologia Pratica',
        progress: {
            total: 3,
            done: 1,
            status: 'low'
        }
    },
    {
        id: '123',
        name: 'Cirurgia Geral',
        progress: {
            total: 3,
            done: 1,
            status: 'low'
        }
    },
    {
        id: '123',
        name: 'Ortopedia pediátrica',
        progress: {
            total: 3,
            done: 1,
            status: 'low'
        }
    },
    {
        id: '123',
        name: 'Ortopedia pediátrica',
        progress: {
            total: 3,
            done: 1,
            status: 'low'
        }
    },
    {
        id: '123',
        name: 'Ortopedia pediátrica',
        progress: {
            total: 3,
            done: 1,
            status: 'low'
        }
    }
]

const playlistItems = [
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

storiesOf('Organisms.MainMenu.ClassroomMenu', module).add(
    'Default',
    () => (
        <div style={{ width: 320, height: '100vh' }}>
            <SANClassroomMenu
                currentThemeIndex={0}
                totalThemes={0}
                course={{
                    knowledgeArea: text('Knowledge area', 'Enfermagem'),
                    name: text('Course name', 'Primeiros Socorros'),
                    progress: number('Progress', 50)
                }}
                DisciplineDropdownProps={{
                    onSelect: console.log,
                    activeItem: items[0],
                    items,
                    loading: boolean('DisciplineDropdown loading', false),
                    progress: 50
                }}
                PlaylistProps={{
                    items: playlistItems,
                    loading: boolean('Playlist loading', false),
                    currentIndex: 0,
                    goToResource: console.log
                }}
            />
        </div>
    ),
    {
        style: {
            padding: 0
        }
    }
)
