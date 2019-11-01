import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'
import SANCardSubSpecialty from './CardSubSpecialty'

storiesOf('Molecules.CardSubSpecialty', module).add('Simple', () => (
    <SANCardSubSpecialty
        blocked={boolean('Blocked', false)}
        title={text('Title', 'Cirurgia')}
        progress={{ me: 60, others: 45 }}
        continue={{
            title: text('Continue title', 'Nome da aula exemplo'),
            index: 3
        }}
        onClickRight={console.log}
        onClickLeft={console.log}
    />
))
