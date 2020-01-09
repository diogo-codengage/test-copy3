import React from 'react'

import InputMask from 'react-input-mask'

import { SANInput, ISANInputProps } from '../Input'

type IInput =
    | 'onChange'
    | 'onPaste'
    | 'onMouseDown'
    | 'onFocus'
    | 'onBlur'
    | 'value'
    | 'disabled'

export interface ISANInputMaskProps extends Pick<ISANInputProps, IInput> {
    InputProps?: Omit<ISANInputProps, IInput>
    mask?:
        | 'POSTAL_CODE'
        | 'PHONE'
        | 'CREDIT_CARD'
        | 'CVV'
        | 'CREDIT_CARD_PREVIEW'
        | 'CPF_PREVIEW'
    customMask?: string
    alwaysShowMask?: boolean
    maskChar?: string
    formatChars?: object
    customRequired?: boolean
}

const masks = {
    POSTAL_CODE: '99999-999',
    PHONE: '(99) 99999-9999',
    CREDIT_CARD: '9999 9999 9999 9999',
    CREDIT_CARD_PREVIEW: '\\*\\*\\*\\*\\ \\*\\*\\*\\*\\ \\*\\*\\*\\*\\ 9999',
    CPF_PREVIEW: '\\*\\*\\*\\ \\*\\*\\*\\ \\*\\99-99',
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
            {inputProps => (
                <SANInput
                    disabled={props.disabled}
                    {...inputProps}
                    {...InputProps}
                />
            )}
        </InputMask>
    )
}

export default SANInputMask
