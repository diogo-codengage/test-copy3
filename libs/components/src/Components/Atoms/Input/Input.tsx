import React, { forwardRef } from 'react'

import styled, { css } from 'styled-components'
import { theme, ifProp, switchProp } from 'styled-tools'

import { SANEvaIcon } from '../EvaIcon'

const SANEvaIconStyled = styled(SANEvaIcon)`
    position: absolute;
    color: ${theme('colors.grey.6')};
`

const Input = styled.input`
    border: 1px solid ${theme('colors.grey.2')};
    box-shadow: 0 1px 2px ${theme('colors.grey.1')};
    outline: none;
    color: ${theme('colors.grey-solid.7')};
    background-color: ${theme('colors.white.10')};
    font-weight: ${theme('fontWeights.medium')};
    font-size: ${theme('fontSizes.md')};
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    width: 100%;
    padding: 0 ${theme('space.md')};
    caret-color: ${theme('colors.primary')};

    ${switchProp('customSize', {
        xlarge: css`
            height: 52px;
        `,
        large: css`
            height: 40px;
        `,
        medium: css`
            height: 32px;
        `,
        small: css`
            height: 24px;
        `
    })}

    ${ifProp(
        'round',
        switchProp('customSize', {
            xlarge: css`
                border-radius: 26px;
            `,
            large: css`
                border-radius: 20px;
            `,
            medium: css`
                border-radius: 16px;
            `,
            small: css`
                border-radius: 12px;
            `
        }),
        css`
            border-radius: ${theme('radii.base')};
        `
    )}

    &:disabled {
        background-color: ${theme('colors.grey-solid.2')};
        opacity: 0.5;
    }

    &:hover:not(:disabled) {
        border-color: ${theme('colors.primary')};
    }

    &:focus {
        border-color: ${theme('colors.primary')};
    }

    ::placeholder {
        color: ${theme('colors.grey-solid.5')};
    }

    ::autofill {
        background-color: transparent;
    }
`

const Wrapper = styled.div`
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 100%;

    ${ifProp(
        'iconLeft',
        css`
            & ${SANEvaIconStyled}:first-child {
                left: ${theme('space.sm')};
            }
        `
    )}

    ${ifProp(
        'disabled',
        css`
            & ${SANEvaIconStyled} {
                color: ${theme('colors.grey-solid.3')};
            }
        `
    )}

    ${ifProp(
        'iconRight',
        css`
            & ${SANEvaIconStyled}:last-child {
                right: ${theme('space.sm')};
            }
        `
    )}

    ${Input} {
        ${ifProp(
            'iconLeft',
            css`
                padding-left: 36px;
            `
        )}
        ${ifProp(
            'iconRight',
            css`
                padding-right: 36px;
            `
        )}
        ${ifProp(
            'uppercase',
            css`
                text-transform: uppercase;
            `
        )}
    }
`

export interface ISANInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    round?: boolean
    customRequired?: boolean
    size?: 'xlarge' | 'large' | 'medium' | 'small'
    iconRight?: string
    iconLeft?: string
    as?: React.ElementType | any
    uppercase?: boolean
    rightClick?: () => void
    leftClick?: () => void
}

const SANInput: React.RefForwardingComponent<any, ISANInputProps> = (
    {
        placeholder,
        iconRight,
        iconLeft,
        disabled,
        uppercase,
        size = 'medium',
        leftClick,
        rightClick,
        ...props
    },
    ref
) => {
    const customPlaceholder = props.customRequired
        ? `${placeholder} *`
        : placeholder

    const inputProps = {
        ...props,
        customSize: size,
        disabled
    }

    const wrapperProps = {
        iconRight,
        iconLeft,
        disabled,
        uppercase
    }

    return (
        <Wrapper {...wrapperProps}>
            {!!iconLeft && (
                <SANEvaIconStyled name={iconLeft} onClick={leftClick} />
            )}
            <Input ref={ref} {...inputProps} placeholder={customPlaceholder} />
            {!!iconRight && (
                <SANEvaIconStyled name={iconRight} onClick={rightClick} />
            )}
        </Wrapper>
    )
}

export default forwardRef(SANInput)
