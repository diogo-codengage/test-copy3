import React from 'react'
import { useTranslation } from 'react-i18next'

import {
    SANCol,
    SANLayoutContainer,
    SANRow,
    SANStyled,
    SANTypography
} from '@sanar/components'

import { theme } from 'styled-tools'
import onBoarding from '../../../../Assets/images/exams/onBoardingBottom.png'
import Form from './Form'

const Image = SANStyled.img`
    width: 450px;
    margin-bottom: ${theme('space.xxl')};
    margin-top: -10px;
`

const OnBoardingBottom = () => {
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
                        {t('exams.onBoarding.second.title')}
                    </SANTypography>
                    <SANTypography
                        fontSize={{ md: 2 }}
                        color='grey.7'
                        textAlign='left'
                        style={{marginBottom: 10}}
                    >
                        {t('exams.onBoarding.second.text')}
                    </SANTypography>
                    <Image src={onBoarding}/>
                </SANCol>
                <SANCol xs={24} md={12}>
                    <Form />
                </SANCol>
            </SANRow>
        </SANLayoutContainer>
    )
}


export default (OnBoardingBottom)