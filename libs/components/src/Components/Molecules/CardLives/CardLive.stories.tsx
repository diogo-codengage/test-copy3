import React from 'react'
import { storiesOf } from '@storybook/react'
import SANCardLive from './CardLive'

import { select } from '@storybook/addon-knobs'

function onButtonPress() {
    console.log('LIVE PRESS')
    return false
}
// Type config
const TC = {
    label: 'Type of display',
    options: {
        List: 'list',
        Grid: 'grid'
    },
    defaultValue: 'list',
    groupId: 'GROUP-ID1'
}

storiesOf('Molecules.CardLive', module).add('Desktop', () => (
    <SANCardLive
        imgUrl=''
        type={select(TC.label, TC.options, TC.defaultValue, TC.groupId)}
        title='Live de Correção da prova SUS-SP 2019'
        date='27/04/2019'
        description='Essa é a oportunidade de você aprender como planejar seus estudos em 2019! Saiba como montar um cronograma, quanto tempo deverá dedicar ao estudo por dia, quantas horas para cada matéria…'
        livePress={() => onButtonPress()}
    />
))

storiesOf('Molecules.CardLive', module)
    .addParameters({ viewport: { defaultViewport: 'iphone5' } })
    .add('Mobile', () => (
        <SANCardLive
            imgUrl=''
            type={select(TC.label, { List_only: 'list' }, 'list', 'GROUP-ID2')}
            title='Live de Correção da prova SUS-SP 2019'
            date='27/04/2019'
            description='Essa é a oportunidade de você aprender como planejar seus estudos em 2019! Saiba como montar um cronograma, quanto tempo deverá dedicar ao estudo por dia, quantas horas para cada matéria…'
            livePress={() => onButtonPress()}
        />
    ))
