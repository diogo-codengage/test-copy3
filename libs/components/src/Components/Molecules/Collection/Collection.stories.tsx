import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number, text } from '@storybook/addon-knobs'

import SANCollection from './Collection'

const items = [
    {
        name: 'Nome da aula exemplo ellipsis',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: true,
        id: '1'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '2'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '3'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '4'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '5'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '6'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '7'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '8'
    }
]

storiesOf('Molecules.Collection', module).add(
    'Simple',
    () => (
        <SANCollection
            items={items}
            vertical={boolean('Vertical', true)}
            onChange={console.log}
            value={text('Value', '3')}
        />
    ),
    {
        style: {
            background: '#242938',
            padding: 40,
            maxWidth: 1000,
            margin: '0 auto'
        }
    }
)
