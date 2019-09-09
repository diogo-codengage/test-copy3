import React from 'react'

import styled, { css } from 'styled-components'
import Icon from 'react-eva-icons'
import {
    color,
    space,
    typography,
    TypographyProps,
    SpaceProps,
    BackgroundColorProps,
    OpacityProps,
    ResponsiveValue
} from 'styled-system'

import { switchProp, theme } from 'styled-tools'

const SANEvaIconStyled = styled.i`
    ${color}
    ${space}
    ${typography}
    & svg {
        fill: currentColor !important;
    }

    & > i {
        display: flex;
    }

    ${switchProp('size', {
        xsmall: css`
            svg {
                font-size: @font-size-base - 2px;
            }
        `,
        small: css`
            svg {
                font-size: @font-size-base;
            }
        `,
        medium: css`
            svg {
                font-size: 16px;
            }
        `,
        large: css`
            svg {
                width: 20px;
                height: 20px;
            }
        `,
        xlarge: css`
            svg {
                font-size: 24px;
            }
        `
    })}

    ${switchProp('color', {
        light: css`
             {
                color: ${theme('colors.white.6')};
            }
        `,
        primary: css`
             {
                color: ${theme('colors.primary')};
            }
        `,
        secondary: css`
             {
                color: ${theme('colors.secondary')};
            }
        `,
        success: css`
             {
                color: ${theme('colors.success')};
            }
        `,
        warning: css`
             {
                color: ${theme('colors.warning')};
            }
        `,
        error: css`
             {
                color: ${theme('colors.error')};
            }
        `,
        info: css`
             {
                color: ${theme('colors.info')};
            }
        `,
        default: css`
             {
                color: ${theme('colors.normal')};
            }
        `,
        grey: css`
             {
                color: ${theme('colors.grey.6')};
            }
        `
    })}
`

export interface ISANEvaIconProps
    extends BackgroundColorProps,
        OpacityProps,
        SpaceProps,
        TypographyProps {
    color?: ResponsiveValue<any>
    size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
    name?: string
}

const SANEvaIcon: React.FC<ISANEvaIconProps> = ({
    color,
    size,
    name,
    ...props
}) => {
    return (
        <SANEvaIconStyled {...{ color, size, ...props }}>
            <Icon name={name} />
        </SANEvaIconStyled>
    )
}

export default SANEvaIcon
