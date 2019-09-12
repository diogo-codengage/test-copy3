import React from 'react'
import styled from 'styled-components'
import { theme } from 'styled-tools'

const SANLeftOffContainer: React.FC = styled('div')`
    background: ${theme('colors.white.1')};
    border: 1px solid ${theme('colors.white.3')};
    margin: ${theme('space.4')};
    border-radius: 4px;
    padding: ${theme('space.7')};
`

export default SANLeftOffContainer
