import React from 'react'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { SANTypography } from 'Components/Atoms/Typography'

import error from 'Assets/images/error/load.svg'
import { useTranslation } from 'react-i18next'
import SANLeftOffContainer from './Container'

const SANLeftOffErrorStyled: React.FC = styled(SANLeftOffContainer)`
    color: ${theme('colors.white.10')};
    text-align: center;

    && img {
        margin-bottom: ${theme('space.7')};
    }
`

const SANLeftOffError = () => {
    const { t } = useTranslation('components')
    return (
        <SANLeftOffErrorStyled>
            <img src={error} alt='error-on-load' />
            <SANTypography variant='overline' transform='initial'>
                {t('error.leftOff')}
            </SANTypography>
        </SANLeftOffErrorStyled>
    )
}

export default SANLeftOffError
