import React from 'react'
import { storiesOf } from '@storybook/react'
import SANCardLive from './CardLive'

import { text } from '@storybook/addon-knobs'

function onButtonPress() {
    console.log('LIVE PRESS')
    return false
}

storiesOf('Molecules.CardLive', module).add('Simple', () => (
    <SANCardLive
        imgUrl=''
        type={text('type of display(grid ou list/null):', 'grid')}
        title='Live de Correção da prova SUS-SP 2019'
        date='27/04/2019'
        description='Essa é a oportunidade de você aprender como planejar seus estudos em 2019! Saiba como montar um cronograma, quanto tempo deverá dedicar ao estudo por dia, quantas horas para cada matéria…'
        livePress={() => onButtonPress()}
    />
))
