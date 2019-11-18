import React from 'react'
import { storiesOf } from '@storybook/react'
import SANCardSchedule from './CardSchedule'

import { number } from '@storybook/addon-knobs'

function onButtonPress() {
    console.log('BUTTON PRESS')
    return false
}

storiesOf('Molecules.CardSchedule', module).add('Simple', () => (
    <SANCardSchedule
        imgUrl=''
        title='Cronograma Sugerido'
        subtitle='Cronograma criado pelos nossos professores'
        buttonTitle='ACESSAR'
        buttonPress={() => onButtonPress()}
    />
))
