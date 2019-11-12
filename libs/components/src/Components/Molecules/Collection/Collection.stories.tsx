import React from 'react'
import { storiesOf } from '@storybook/react'

import SANCollection from './Collection'

const items = [
    {
        name: 'Nome da ula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: true
    },
    {
        name: 'Nome da ula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        current: true
    },
    {
        name: 'Nome da ula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false
    },
    {
        name: 'Nome da ula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false
    },
    {
        name: 'Nome da ula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false
    },
    {
        name: 'Nome da ula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false
    },
    {
        name: 'Nome da ula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false
    },
    {
        name: 'Nome da ula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false
    }
]

storiesOf('Molecules.Collection', module).add('Simple', () => (
    <SANCollection items={items} />
))
