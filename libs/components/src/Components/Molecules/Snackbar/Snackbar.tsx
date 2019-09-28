import React from 'react'
import styled from 'styled-components'
import { useCallback } from 'react'
import { SANEvaIcon } from 'Components/Atoms/EvaIcon'

const Styled = styled.div`
    display: flex;
    margin: 20px 0;
    align-items: center;
    padding: 12px 12px;
    background: #fff;
    border-radius: 4px;
    -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
        <Styled>
            {iconInfo(theme).icon && (
                <SANEvaIcon
                    mr={2}
                    name={iconInfo(theme).icon}
                    color={iconInfo(theme).color}
                />
            )}
            {message}
        </Styled>
    )
}

export default SANSnackbar
