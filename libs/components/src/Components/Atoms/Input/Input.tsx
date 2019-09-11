import React, { forwardRef } from 'react'

import { omit } from 'ramda'
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
    background-color: transparent;
    font-weight: ${theme('fontWeights.medium')};
    font-size: ${theme('fontSizes.md')};
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    width: 100%;

    ${switchProp('customSize', {
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
        css`
            border-radius: 50vh;
        `,
        css`
            border-radius: ${theme('radii.base')};
        `
    )}

    &:disabled {
        background-color: ${theme('colors.grey-solid.2')};
        opacity: 0.5;
    }

    &:hover:not(:disabled) {
        border-color: ${theme('colors.grey.5')};
    }

    &:focus {
        border-color: ${theme('colors.blue.1')};
        caret-color: ${theme('colors.blue.1')};
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
    }
`

export interface ISANInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    round: boolean
    size: 'large' | 'medium' | 'small'
    iconRight: string
    iconLeft: string
}

const SANInput: React.FC<Partial<ISANInputProps>> = (
    { placeholder, iconRight, iconLeft, disabled, ...props },
    ref
) => {
    const customPlaceholder = props.required ? `${placeholder} *` : placeholder

    const inputProps = {
        ...omit(['size'], props),
        customSize: props.size,
        disabled
    }

    const wrapperProps = {
        iconRight,
        iconLeft,
        disabled
    }

    return (
        <Wrapper {...wrapperProps}>
            {!!iconLeft && <SANEvaIconStyled name={iconLeft} />}
            <Input ref={ref} {...inputProps} placeholder={customPlaceholder} />
            {!!iconRight && <SANEvaIconStyled name={iconRight} />}
        </Wrapper>
    )
}

export default forwardRef<typeof SANInput, ISANInputProps>(SANInput)
