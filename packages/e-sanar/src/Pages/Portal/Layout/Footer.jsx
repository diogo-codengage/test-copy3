import React, { useState } from 'react'
import classNames from 'classnames'

import { Layout as ANTDLayout } from 'antd'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESDivider from 'sanar-ui/dist/Components/Atoms/Divider'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

import { SANPortalPagesContainer } from '../Layout'

import logoSvg from 'assets/images/logo.svg'
import whiteLogo from 'assets/images/white-logo.svg'

import SANModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'

const SANFooter = ({ darkMode, history }) => {
    const { t } = useTranslation('esanar')
    const [showModalTermsAndPrivacy, setShowModalTermsAndPrivacy] = useState(
        false
    )
    const [activeKey, setActiveKey] = useState('0')

    const handleCloseModalTermsAndPrivacy = () =>
        setShowModalTermsAndPrivacy(false)

    const handleModalTermsAndPrivacy = (e, key) => {
        e.preventDefault()
        setActiveKey(key)
        setShowModalTermsAndPrivacy(true)
    }

    const goHelpCenter = () => history.push('/aluno/central-ajuda')

    return (
        <>
            <SANModalTermsAndPrivacy
                visible={showModalTermsAndPrivacy}
                onCancel={handleCloseModalTermsAndPrivacy}
                defaultActiveKey={activeKey}
            />

            <ANTDLayout.Footer
                className={classNames(
                    'san-portal-layout__footer',
                    `san-portal-layout__footer--${darkMode ? 'dark' : 'light'}`
                )}
            >
                <ESDivider
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
                                onClick={goHelpCenter}
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
                <ESDivider
                    className={
                        darkMode
                            ? 'san-portal-layout__footer--divider-dark'
                            : null
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
                            <a
                                onClick={e =>
                                    handleModalTermsAndPrivacy(e, '0')
                                }
                                href='foo'
                            >
                                {t('global.termsOfUse')}
                            </a>
                            {' | '}
                            <a
                                onClick={e =>
                                    handleModalTermsAndPrivacy(e, '1')
                                }
                                href='foo'
                            >
                                {t('global.privacyPolicy')}
                            </a>
                        </ESTypography>
                    </ESCol>
                </ESRow>
            </ANTDLayout.Footer>
        </>
    )
}

export default withRouter(SANFooter)
