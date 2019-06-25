import React from 'react'
import classNames from 'classnames'
import { Layout as ANTDLayout, Divider as ANTDivider } from 'antd'
import { useTranslation } from 'react-i18next'

import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import { SANPortalPagesContainer } from '../Layout'

import logoSvg from 'assets/images/logo.svg'
import whiteLogo from 'assets/images/white-logo.svg'

import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import { usePortalContext } from '../Context'

const SANFooter = () => {
    const { t } = useTranslation('esanar')
    const { darkMode } = usePortalContext()

    return (
        <ANTDLayout.Footer
            className={classNames(
                'san-portal-layout__footer',
                `san-portal-layout__footer--${darkMode ? 'dark' : 'light'}`
            )}
        >
            <ANTDivider
                className={`san-portal-layout__footer--divider${
                    darkMode ? '-dark' : ''
                }`}
            />
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
                        <img src={darkMode ? whiteLogo : logoSvg} alt='' />
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
                            color={darkMode ? 'light' : 'default'}
                            variant='outlined'
                        >
                            <ESTypography className='san-portal-layout__footer--contact--help-button'>
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
                        <ESEvaIcon
                            name='phone-outline'
                            color={darkMode ? 'light' : 'default'}
                        />
                        <ESTypography type={darkMode ? 'light' : 'default'}>
                            {t('footer.phone')}
                        </ESTypography>
                    </ESCol>
                    <ESCol
                        xs={24}
                        sm={12}
                        md={7}
                        lg={6}
                        className='san-portal-layout__footer--contact--email'
                    >
                        <ESEvaIcon
                            name='email-outline'
                            color={darkMode ? 'light' : 'default'}
                        />
                        <ESTypography type={darkMode ? 'light' : 'default'}>
                            {t('footer.email')}
                        </ESTypography>
                    </ESCol>
                    <ESCol
                        xs={24}
                        sm={12}
                        md={8}
                        lg={7}
                        className='san-portal-layout__footer--contact--attendance'
                    >
                        <ESTypography
                            variant='caption'
                            type={darkMode ? 'light' : 'default'}
                        >
                            {t('footer.attendance')}
                        </ESTypography>
                    </ESCol>
                </ESRow>
            </SANPortalPagesContainer>
            <ANTDivider
                className={
                    darkMode ? 'san-portal-layout__footer--divider-dark' : null
                }
            />
            <ESRow
                type='flex'
                justify='center'
                className='san-portal-layout__footer--copyright'
                gutter={8}
            >
                <ESCol>
                    <ESTypography
                        variant='caption'
                        type={darkMode ? 'light' : 'default'}
                    >
                        {t('footer.copyright')}
                    </ESTypography>
                </ESCol>
                <ESCol>
                    <ESTypography
                        variant='caption'
                        type={darkMode ? 'light' : 'default'}
                        strong
                    >
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
