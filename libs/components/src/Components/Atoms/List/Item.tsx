import React from 'react'

import { theme } from 'styled-tools'
import styled from 'styled-components'
import { SANBox, ISANBoxProps } from '../Box'

export interface ISANListItemProps extends ISANBoxProps {}

const SANListItem: React.FC<ISANListItemProps> = styled(SANBox)`
    padding: ${theme('space.md')} ${theme('space.lg')};

    &:not(:last-of-type) {
        border-bottom: 0.5pt solid ${theme('colors.grey.2')};
    }
`

export default SANListItem
