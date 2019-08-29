import React from 'react'
import { storiesOf } from '@storybook/react'
import SANDisciplineDropdown from './DisciplineDropdown'

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
    }
]

storiesOf('Molecules.DisciplineDropdown', module).add('Simple', () => (
    <SANDisciplineDropdown
        onSelect={console.log}
        activeItem={items[0]}
        items={items}
        loading={false}
        progress={5}
    />
))
