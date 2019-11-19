import React from 'react'
import { storiesOf } from '@storybook/react'
import SANCardLive from './CardLive'

import { number } from '@storybook/addon-knobs'

function onButtonPress() {
    console.log('LIVE PRESS')
    return false
}

storiesOf('Molecules.CardLive', module).add('Desktop', () => (
    <>
        <SANCardLive
            title='Live de Correção da prova SUS-SP 2019'
            date='27/04/2019'
            description='Essa é a oportunidade de você aprender como planejar seus estudos em 2019! Saiba como montar um cronograma, quanto tempo deverá dedicar ao estudo por dia, quantas horas para cada matéria…'
            onClick={onButtonPress}
        />
        <div
            style={{
                marginTop: '50px',
                width: `${number('Largura do card(grid):', 232)}px`
            }}
        >
            <SANCardLive
                image=''
                hasList={false}
                title='Live de Correção da prova SUS-SP 2019'
                date='27/04/2019'
                description='Essa é a oportunidade de você aprender como planejar seus estudos em 2019! Saiba como montar um cronograma, quanto tempo deverá dedicar ao estudo por dia, quantas horas para cada matéria…'
                onClick={onButtonPress}
            />
        </div>
    </>
))

storiesOf('Molecules.CardLive', module)
    .addParameters({ viewport: { defaultViewport: 'iphone5' } })
    .add('Mobile', () => (
        <SANCardLive
            title='Live de Correção da prova SUS-SP 2019'
            date='27/04/2019'
            description='Essa é a oportunidade de você aprender como planejar seus estudos em 2019! Saiba como montar um cronograma, quanto tempo deverá dedicar ao estudo por dia, quantas horas para cada matéria…'
            onClick={onButtonPress}
        />
    ))
