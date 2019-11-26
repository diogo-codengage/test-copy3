import React from 'react'
import { storiesOf } from '@storybook/react'
import SANCardSchedule from './CardSchedule'

storiesOf('Molecules.CardSchedule', module).add('Simple', () => (
    <SANCardSchedule
        title='Cronograma Sugerido'
        subtitle='Cronograma criado pelos nossos professores'
        ButtonProps={{
            children: 'Acessar',
            onClick: console.log
        }}
    />
))
