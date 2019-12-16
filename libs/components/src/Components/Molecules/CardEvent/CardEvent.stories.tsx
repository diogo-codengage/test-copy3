import React from 'react'
import { storiesOf } from '@storybook/react'
import SANCardEvent from './CardEvent'

function onButtonPress() {
    console.log('ACTION PRESS')
}

storiesOf('Molecules.CardEvent', module).add('simple', () => (
    <>
        <div style={{ marginBottom: '16px' }}>
            <SANCardEvent
                title='Inscrição para a prova tal'
                date='12/06/2019, às 10h até 12/07/2019, às 18h'
                type={'viewed'}
                onClick={onButtonPress}
            />
        </div>
        <div style={{ marginBottom: '16px' }}>
            <SANCardEvent
                title='Live de Correção da prova SUS-SP 2019'
                date='14:00'
                type={'live'}
                onClick={onButtonPress}
            />
        </div>
        <div>
            <SANCardEvent
                title='Aula wnofeihwoenso oaihnwejknfçod'
                date='9:30 até 10:30'
                type={'unseen'}
                onClick={onButtonPress}
            />
        </div>
    </>
))
