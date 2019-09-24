import React from 'react'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { SANInput } from '../Input'
import { compose, space } from 'styled-system'

const TextArea = styled('textarea')`
    ${compose(space)}
    line-height: 21.6px;
    padding: ${theme('space.sm')};
    height: auto;
    resize: none;
`

export const SANTextArea = props => <SANInput as={TextArea} {...props} />
