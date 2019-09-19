import React from 'react'

import InputMask from 'react-input-mask'

import { SANInput, ISANInputProps } from '../Input'

export interface ISANInputMaskProps
    extends Pick<ISANInputProps, 'value' | 'onChange'> {
    InputProps?: Omit<ISANInputProps, 'value' | 'onChange'>
    mask?: 'CEP' | 'PHONE' | 'CREDIT_CARD' | 'CVV'
    customMask?: string
    alwaysShowMask?: boolean
    maskChar?: string
    formatChars?: object
}

const masks = {
    CEP: '99999-999',
    PHONE: '(99) 99999-9999',
    CREDIT_CARD: '9999 9999 9999 9999',
    CVV: '9999'
}

const SANInputMask = ({
    InputProps,
    customMask,
    mask,
    ...props
}: ISANInputMaskProps) => {
    return (
        <InputMask mask={mask ? masks[mask] : customMask} {...props}>
            {inputProps => <SANInput {...inputProps} {...InputProps} />}
        </InputMask>
    )
}

export default SANInputMask
