import React from 'react'
import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'

import SANTooltip from './Tooltip'
import { SANButton } from '../Button'

const placeOptions: any = {
    Top: 'top',
    Right: 'right',
    Bottom: 'bottom',
    Beft: 'left'
}

const typeOptions: any = {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
    Info: 'info',
    Light: 'light'
}

const effectOptions: any = {
    Float: 'float',
    Solid: 'solid'
}

storiesOf('Atoms.Tooltip', module).add(
    'Simple',
    () => (
        <>
            <SANButton
                variant='solid'
                color='primary'
                uppercase
                bold
                data-tip
                data-for='example'
            >
                Button
            </SANButton>
            <SANTooltip
                border
                place={select('Place', placeOptions, 'bottom')}
                type={select('Type', typeOptions, 'success')}
                effect={select('Effect', effectOptions, 'solid')}
                id='example'
            >
                3 ou 4 números impressos no cartão de crédito. O CVV é um código
                de segurança contra fraudes em transações feitas na Internet.
            </SANTooltip>
        </>
    ),
    {
        style: {
            padding: 100,
            display: 'flex',
            justifyContent: 'center'
        }
    }
)
