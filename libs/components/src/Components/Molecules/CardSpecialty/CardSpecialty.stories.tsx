import React from 'react'
import { storiesOf } from '@storybook/react'
import SANCardSpecialty from './CardSpecialty'

storiesOf('Molecules.CardSpecialty', module).add('Simple', () => (
    <SANCardSpecialty
        image='https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg'
        title='Cirurgia'
        progress={{ me: 60, others: 45 }}
        onClick={console.log}
    />
))
