import React from 'react'

import InputMask from 'react-input-mask'

import { SANInput, ISANInputProps } from '../Input'

export interface ISANInputMaskProps
    extends Pick<ISANInputProps, 'value' | 'onChange'> {
    InputProps?: Omit<ISANInputProps, 'value' | 'onChange'>
    mask?:
        | 'POSTAL_CODE'
        | 'PHONE'
        | 'CREDIT_CARD'
        | 'CVV'
        | 'CREDIT_CARD_PREVIEW'
    customMask?: string
    alwaysShowMask?: boolean
    maskChar?: string
    formatChars?: object
}

const masks = {
    POSTAL_CODE: '99999-999',
    PHONE: '(99) 99999-9999',
    CREDIT_CARD: '9999 9999 9999 9999',
    CREDIT_CARD_PREVIEW: '\\*\\*\\*\\*\\ \\*\\*\\*\\*\\ \\*\\*\\*\\*\\ 9999',
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
