import PropTypes from 'prop-types'

import { ESFormItem } from 'sanar-ui/dist/Components/Molecules/Form'

import { SANElement } from '../../../Theme/createTheme'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { space, SpaceProps, compose } from 'styled-system'

export interface ISANFormItemProps
    extends PropTypes.InferProps<typeof ESFormItem.propTypes>,
        SpaceProps {}

const SANFormItem: SANElement<ISANFormItemProps> = styled(ESFormItem)`
    && {
        margin-bottom: ${theme('space.xxl')};

        &.ant-form-item-with-help {
            margin-bottom: 13px !important;
        }
        .ant-form-item-required {
            &::before {
                content: '' !important;
            }
        }

        .ant-form-item-label > label {
            &.ant-form-item-required:before {
                margin-right: 0;
            }
        }

        ${compose(space)}
    }
`

export default SANFormItem
