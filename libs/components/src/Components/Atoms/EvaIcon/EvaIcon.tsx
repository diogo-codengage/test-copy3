import React from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'
import Icon from 'react-eva-icons'

import { switchProp, theme } from 'styled-tools'

const SANEvaIconStyled = styled.i`
    & svg {
        fill: currentColor !important;
        width: 1em;
        height: 1em;
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
                font-size: 20px;
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

type IProps = PropTypes.InferProps<typeof propTypes>

const SANEvaIcon: React.FC<IProps> = ({ color, size, ...props }) => {
    return (
        <SANEvaIconStyled {...{ color, size }}>
            <Icon {...props} />
        </SANEvaIconStyled>
    )
}

const propTypes = Object.assign(
    { ...Icon['propTypes'] },
    {
        color: PropTypes.oneOf([
            'primary',
            'secondary',
            'success',
            'warning',
            'error',
            'info',
            'default',
            'light',
            'grey'
        ]),
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge'])
    }
)

SANEvaIcon.defaultProps = Icon['defaultProps']

export default SANEvaIcon
