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
    margin-top: -65px;
`

const OnBoardingTop = () => {
    const { t } = useTranslation('sanarflix')
    return (
        <SANLayoutContainer pt={8}>
            <SANRow gutter={16}>
                <SANCol xs={24} md={12}>
                    <SANTypography
                        fontSize={{ md: 5 }}
                        color='grey.7'
                        strong
                        textAlign='left'
                        style={{marginBottom: 10}}
                    >
                        {t('exams.onBoarding.first.title')}
                    </SANTypography>
                    <SANTypography
                        fontSize={{ md: 2 }}
                        color='grey.7'
                        textAlign='left'
                        style={{marginBottom: 10}}
                    >
                        {t('exams.onBoarding.first.text')}
                    </SANTypography>
                    <SANTypography
                        fontSize={{ md: 2 }}
                        color='#600F30'
                        textAlign='left'
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