import React from 'react'
import styled from 'styled-components'

import { theme } from 'styled-tools'

import { SANButton } from '../../Atoms/Button'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import {
    SANSessionTitle,
    ISANSessionTitleProps
} from '../../Atoms/SessionTitle'
import { SANRow, SANCol, ISANColProps } from '../Grid'
import { SANLayoutContainer } from '../../Organisms/Layout'

const SANButtonBack = styled(SANButton)``

const SANHeaderStyled = styled.div`
    min-height: 124px;
    border-bottom: 1px solid ${theme('colors.grey.2')};
    display: flex;
    align-items: center;
    background: ${theme('colors.white.10')};
    ${theme('mediaQueries.down.sm')} {
        padding: ${theme('space.xl')} 0;
    }

    ${SANLayoutContainer} {
        position: relative;

        ${theme('mediaQueries.down.xl')} {
            ${SANButtonBack} {
                display: none !important;
            }
        }

        ${SANButtonBack} {
            position: absolute;
            left: -24px;
            top: 6px;
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
    ExtraProps?: ISANColProps
    onBack?: () => void
    extra?: React.ReactNode
}

const SANHeader: React.FC<ISANHeaderProps> = ({
    SessionTitleProps,
    ExtraProps,
    onBack,
    extra
}) => {
    const responsive = !!extra ? { xs: 24, sm: 12, md: 14 } : { xs: 24 }

    return (
        <SANHeaderStyled data-testid='san-header'>
            <SANLayoutContainer>
                {!!onBack && (
                    <SANButtonBack
                        circle
                        size='xsmall'
                        variant='text'
                        onClick={onBack}
                        data-testid='san-header__back'
                    >
                        <SANEvaIcon
                            name='arrow-ios-back-outline'
                            size='medium'
                        />
                    </SANButtonBack>
                )}
                <SANRow
                    type='flex'
                    align='middle'
                    justify='space-between'
                    gutter={24}
                >
                    <SANCol {...responsive}>
                        <SANSessionTitle
                            {...{ ...SessionTitleProps, levelTitle: 4 }}
                        />
                    </SANCol>
                    {!!extra && (
                        <SANCol
                            mt={{ sm: 0, _: 'md' }}
                            xs={24}
                            sm={12}
                            md={10}
                            {...ExtraProps}
                        >
                            {extra}
                        </SANCol>
                    )}
                </SANRow>
            </SANLayoutContainer>
        </SANHeaderStyled>
    )
}

export default SANHeader
