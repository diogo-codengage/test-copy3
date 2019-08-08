import React, { memo, forwardRef } from 'react'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'
import { theme, ifProp, switchProp } from 'styled-tools'

const Input = styled.input`
    border: 1px solid ${theme('colors.grey.2')};
    box-shadow: 0 1px 2px ${theme('colors.grey.1')};
    border-radius: ${theme('radii.base')}px;
    outline: none;
    color: ${theme('colors.grey-solid.7')};
    background-color: transparent;
    font-weight: ${theme('fontWeights.medium')};
    font-size: ${theme('fontSizes.md')}px;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    width: 100%;

    ${switchProp('size', {
        large: css`
            padding: ${theme('space.xs')}px;
        `,
        medium: css`
            padding: ${theme('space.1')}px;
        `,
        small: css`
            padding: ${theme('space.0')}px;
        `
    })}

    ${ifProp(
        'round',
        css`
            border-radius: 50vh;
        `,
        css`
            border-radius: ${theme('radii.base')}px;
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

    & .es-eva-icon {
        position: absolute;
        color: ${theme('colors.grey.6')};
    }

    ${ifProp(
        'iconLeft',
        css`
            & .es-eva-icon:first-child {
                left: ${theme('space.sm')}px;
            }
        `
    )}

    ${ifProp(
        'disabled',
        css`
            & .es-eva-icon {
                color: ${theme('colors.grey-solid.3')};
            }
        `
    )}

    ${ifProp(
        'iconRight',
        css`
            & .es-eva-icon:last-child {
                right: ${theme('space.sm')}px;
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

export const SInput = memo(
    forwardRef(
        ({ placeholder, iconRight, iconLeft, disabled, ...props }, ref) => {
            const customPlaceholder = props.required
                ? `${placeholder} *`
                : placeholder

            return (
                <Wrapper {...{ iconRight, iconLeft, disabled }}>
                    {iconLeft && iconLeft}
                    <Input
                        ref={ref}
                        {...{ ...props, disabled }}
                        placeholder={customPlaceholder}
                    />
                    {iconRight && iconRight}
                </Wrapper>
            )
        }
    )
)

SInput.propTypes = {
    disabled: PropTypes.bool,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['large', 'medium', 'small']),
    round: PropTypes.bool
}

SInput.defaultProps = {
    autoComplete: 'off',
    size: 'large'
}
