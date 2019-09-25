import React, { useState } from 'react'

import { SANInput, ISANInputProps } from '../Input'

const password = {
    type: 'password',
    icon: 'eye-outline'
}

const text = {
    type: 'text',
    icon: 'eye-off-outline'
}

export interface ISANInputPasswordProps extends ISANInputProps {}

const SANInputPassword = props => {
    const [input, setInput] = useState(password)

    return (
        <SANInput
            {...props}
            type={input.type}
            iconRight={input.icon}
            rightClick={() =>
                setInput(old => (old.type === 'password' ? text : password))
            }
        />
    )
}

export default SANInputPassword
