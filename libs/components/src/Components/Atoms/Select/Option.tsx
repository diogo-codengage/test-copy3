import PropTypes from 'prop-types'

import { ESOption } from 'sanar-ui/dist/Components/Atoms/Select'

import { SANElement } from '../../../Theme/createTheme'
import styled from 'styled-components'

export interface ISANSelectOptionProps
    extends PropTypes.InferProps<typeof ESOption.propTypes> {}

const SANSelectOption: SANElement<ISANSelectOptionProps> = styled(ESOption)`
    &&& {
        &,
        &:hover,
        .ant-select-dropdown-menu-item:hover,
        .ant-select-dropdown-menu-item-active {
            background-color: green !important;
        }
    }
`

export default SANSelectOption
