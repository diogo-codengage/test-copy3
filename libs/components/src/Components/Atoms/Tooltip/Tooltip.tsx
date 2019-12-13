import React, { memo } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { layout, LayoutProps } from 'styled-system'
import ReactTooltip from 'react-tooltip'

export interface ISANTooltipProps extends ReactTooltip.Props, LayoutProps {}

const ReactTooltipStyled = styled(ReactTooltip)`
    && {
        ${layout}
        font-size: ${theme('fontSizes.md')};
        padding: ${theme('space.md')};
        &.type {
            &-success {
                background-color: ${theme('colors.success')};
            }
            &-warning {
                background-color: ${theme('colors.warning')};
            }
            &-error {
                background-color: ${theme('colors.error')};
            }
            &-info {
                background-color: ${theme('colors.info')};
            }
            &-light {
                background-color: ${theme('colors.white.10')};
                color: ${theme('colors.grey.7')};
                &.border {
                    border: 1px solid ${theme('colors.grey.2')};
                }
            }
        }
    }
`

const SANTooltip = memo<ISANTooltipProps>(props => (
    <ReactTooltipStyled {...props} />
))

export default SANTooltip
