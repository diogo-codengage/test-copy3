import React from 'react'
import { storiesOf } from '@storybook/react'
import ESDisciplineDropdown from './DisciplineDropdown'
import { object } from '@storybook/addon-knobs'

const items = [
    {
        description: 'Lorem ipsum dolor sit amet',
        active: false,
        completed: true
    },
    {
        description: 'Dolor sit amet',
        active: true,
        completed: false,
        incomplete: true
    },
    {
        description: 'Ipsum dolor sit amet',
        active: false,
        completed: false
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
