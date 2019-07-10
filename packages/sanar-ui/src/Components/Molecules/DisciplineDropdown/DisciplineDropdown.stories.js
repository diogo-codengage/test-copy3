import React from 'react'
import { storiesOf } from '@storybook/react'
import ESDisciplineDropdown from './DisciplineDropdown'
import { object } from '@storybook/addon-knobs'

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

const onSelect = item => console.log(item)

storiesOf('Molecules.DisciplineDropdown', module).add(
    'Simple',
    () => (
        <ESDisciplineDropdown
            items={object('Items', items)}
            onSelect={onSelect}
        />
    ),
    {
        style: {
            background: '#242938',
            padding: '16px',
            height: 500
        }
    }
)
