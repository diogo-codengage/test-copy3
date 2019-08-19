import React from 'react'
import styled, { css } from 'styled-components'

import { theme, ifProp, prop } from 'styled-tools'

import { SANButton } from '../../Atoms/Button'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import {
    SANSessionTitle,
    ISANSessionTitleProps
} from '../../Atoms/SessionTitle'
import { SANLayoutContainer } from '../../Organisms/Layout'

const SANHeaderStyled = styled.div`
    height: 124px;
    border-bottom: 1px solid ${theme('colors.grey.2')};
    display: flex;
    align-items: center;

    ${SANLayoutContainer} {
        position: relative;

        ${theme('mediaQueries.down.xl')} {
            ${SANButton} {
                display: none !important;
            }
        }

        ${SANButton} {
            position: absolute;
            left: -24px;
            top: calc(100% - 30px);
            background-color: ${theme('colors.grey.0')};
            color: ${theme('colors.grey.6')};

            &:hover {
                background-color: ${theme('colors.grey.1')};
            }
        }

        ${SANSessionTitle} {
            margin-bottom: 0;
        }
    }
`

export interface ISANHeaderProps {
    SessionTitleProps?: ISANSessionTitleProps
    onBack?: () => void
}

const SANHeader: React.FC<ISANHeaderProps> = ({
    SessionTitleProps,
    onBack
}) => {
    return (
        <SANHeaderStyled>
            <SANLayoutContainer>
                <SANButton circle size='xsmall' variant='text' onClick={onBack}>
                    <SANEvaIcon name='arrow-ios-back-outline' />
                </SANButton>
                <SANSessionTitle {...{ ...SessionTitleProps, levelTitle: 4 }} />
            </SANLayoutContainer>
        </SANHeaderStyled>
    )
}

export default SANHeader
