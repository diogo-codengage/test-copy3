import PropTypes from 'prop-types'

import ESSelect from 'sanar-ui/dist/Components/Atoms/Select'

import { SANElement } from '../../../Theme/createTheme'
import { theme } from 'styled-tools'
import styled from 'styled-components'

export interface ISANSelectProps
    extends PropTypes.InferProps<typeof ESSelect.propTypes> {}

const SANSelect: SANElement<ISANSelectProps> = styled(ESSelect)`
    && {
        .ant-select-dropdown-menu-item-active {
            background: green !important;
        }
        .ant-select-selection {
            box-shadow: 0px 1px 2px #1113171a;
        }
        .ant-select-selection__placeholder {
            font-weight: 500;
            font-size: ${theme('fontSizes.md')};
            color: ${theme('colors.grey-solid.5')};
        }
        .ant-select-selection__rendered {
            margin: 0 ${theme('space.md')};
            cursor: pointer;
        }
        .ant-select-selection__choice {
            font-weight: 500;
            font-size: ${theme('fontSizes.md')};
        }

        &.ant-select-lg {
            font-size: ${theme('fontSizes.md')};
        }
    }
`

export default SANSelect
