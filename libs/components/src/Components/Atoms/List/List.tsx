import React from 'react'
import PropTypes from 'prop-types'

import { SANStyled } from 'Theme'
import { theme } from 'styled-tools'

import ESListView from 'sanar-ui/dist/Components/Atoms/ListView'

interface IProps extends PropTypes.InferProps<typeof ESListView.propTypes> {}

const SANList: React.FC<IProps> = SANStyled(ESListView)`
    && {
        background: ${theme('colors.white.10')};
        border-radius: ${theme('radii.base')};
        box-shadow: 0 1px 2px ${theme('colors.grey.2')};
        border: 0.5pt solid ${theme('colors.grey.2')}
    }
`

export default SANList
