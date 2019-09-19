import React from 'react'
import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'

import SANInputMask from './InputMask'

const maskOptions = {
    CEP: 'CEP',
    PHONE: 'PHONE',
    CREDIT_CARD: 'CREDIT_CARD',
    CVV: 'CVV'
}

storiesOf('Atoms.InputMask', module).add('Simple', () => (
    <SANInputMask
        mask={select('Mask', maskOptions, maskOptions.CEP)}
        InputProps={{ placeholder: 'Placeholder' }}
    />
))
