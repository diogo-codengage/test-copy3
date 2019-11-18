import React, { useCallback } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'

import { SANEvaIcon } from 'Components/Atoms/EvaIcon'

const SnackbarStyled = styled.div`
    display: flex;
    margin: 20px 0;
    align-items: center;
    padding: ${theme('space.sm')};
    background: ${theme('colors.white.10')};
    border-radius: ${theme('radii.base')};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`

const SANSnackbar = ({ message, theme }) => {
    const iconInfo = useCallback(
        theme => {
            switch (theme) {
                case 'success':
                    return {
                        icon: 'checkmark-circle-2',
                        color: 'success'
                    }
                case 'error':
                    return {
                        icon: 'close-circle',
                        color: 'error'
                    }
                default:
                    return {}
            }
        },
        [theme]
    )
    return (
        <SnackbarStyled>
            {iconInfo(theme).icon && (
                <SANEvaIcon
                    mr={2}
                    name={iconInfo(theme).icon}
                    color={iconInfo(theme).color}
                />
            )}
            {message}
        </SnackbarStyled>
    )
}

export default SANSnackbar
