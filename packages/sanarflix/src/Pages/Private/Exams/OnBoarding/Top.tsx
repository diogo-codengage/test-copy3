import React from 'react'
import { useTranslation } from 'react-i18next'

import {
    SANCol,
    SANLayoutContainer,
    SANRow,
    SANStyled,
    SANTypography
} from '@sanar/components'

import onBoarding from '../../../../Assets/images/exams/onBoardingTop.png'

import { theme } from 'styled-tools'

const Image = SANStyled.img`
    width: 450px;
    margin-bottom: ${theme('space.xxl')};
    margin-top: -30px;
`

const OnBoardingTop = () => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANLayoutContainer pt={8} pb={7}>
            <SANRow gutter={16}>
                <SANCol xs={24} md={12}>
                    <SANTypography
                        fontSize={{ md: 6 }}
                        color='grey.7'
                        strong
                        textAlign='left'
                        mb={10}
                    >
                        {t('exams.onBoarding.first.title')}
                    </SANTypography>
                    <SANTypography
                        fontSize={{ md: 2 }}
                        color='grey.7'
                        textAlign='left'
                        mb={10}
                    >
                        {t('exams.onBoarding.first.text')}
                    </SANTypography>
                    <SANTypography
                        fontSize={{ md: 2 }}
                        color='#600F30'
                        textAlign='left'
                        mb={20}
                    >
                        {t('exams.onBoarding.first.bottom')}
                    </SANTypography>
                </SANCol>
                <SANCol xs={24} md={12}>
                    <Image src={onBoarding}/>
                </SANCol>
            </SANRow>
        </SANLayoutContainer>
    )
}


export default (OnBoardingTop)