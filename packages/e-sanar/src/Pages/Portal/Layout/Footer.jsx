import React from 'react'
import { Layout as ANTDLayout, Divider as ANTDivider } from 'antd'
import { useTranslation } from 'react-i18next'

import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import { SANPortalPagesContainer } from '../Layout'

import logoSvg from 'assets/images/logo.svg'

import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

const SANFooter = () => {
    const { t } = useTranslation()

    return (
        <ANTDLayout.Footer className='san-portal-layout__footer'>
            <ANTDivider className='san-portal-layout__footer--divider' />
            <SANPortalPagesContainer>
                <ESRow
                    type='flex'
                    className='san-portal-layout__footer--contact'
                    justify='space-between'
                    align='middle'
                >
                    <ESCol
                        xs={24}
                        sm={24}
                        md={24}
                        lg={3}
                        className='san-portal-layout__footer--contact--logo'
                    >
                        <img src={logoSvg} alt='' />
                    </ESCol>
                    <ESCol
                        xs={24}
                        sm={12}
                        md={5}
                        lg={4}
                        className='san-portal-layout__footer--contact--help'
                        type='flex'
                    >
                        <ESButton
                            size='xsmall'
                            uppercase
                            bold
                            variant='outlined'
                        >
                            <ESTypography>
                                {t('footer.helpButton')}
                            </ESTypography>
                        </ESButton>
                    </ESCol>
                    <ESCol
                        xs={24}
                        sm={12}
                        md={4}
                        lg={4}
                        className='san-portal-layout__footer--contact--phone'
                    >
                        <ESEvaIcon name='phone-outline' />
                        <ESTypography>{t('footer.phone')}</ESTypography>
                    </ESCol>
                    <ESCol
                        xs={24}
                        sm={12}
                        md={7}
                        lg={6}
                        className='san-portal-layout__footer--contact--email'
                    >
                        <ESEvaIcon name='email-outline' />
                        <ESTypography>{t('footer.email')}</ESTypography>
                    </ESCol>
                    <ESCol
                        xs={24}
                        sm={12}
                        md={8}
                        lg={7}
                        className='san-portal-layout__footer--contact--attendance'
                    >
                        <ESTypography variant='caption'>
                            {t('footer.attendance')}
                        </ESTypography>
                    </ESCol>
                </ESRow>
            </SANPortalPagesContainer>
            <ANTDivider />
            <ESRow
                type='flex'
                justify='center'
                className='san-portal-layout__footer--copyright'
                gutter={8}
            >
                <ESCol>
                    <ESTypography>{t('footer.copyright')}</ESTypography>
                </ESCol>
                <ESCol>
                    <ESTypography strong>
                        <a href='foo'>{t('footer.termsOfUse')}</a>
                        {' | '}
                        <a href='foo'>{t('footer.privacyPolicy')}</a>
                    </ESTypography>
                </ESCol>
            </ESRow>
        </ANTDLayout.Footer>
    )
}

export default SANFooter
