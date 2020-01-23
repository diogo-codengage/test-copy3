import React, { useState, memo } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANNavigationList,
    SANNavigationListItem,
    SANAvatarMenu,
    SANEvaIcon,
    SANBox,
    SANButton,
    SANTypography,
    SANDivider,
    SANScroll
} from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import RMLogout from 'Components/ModalLogout'
import { useLayoutContext } from '../Context'
import { useMainContext } from 'Pages/Private/Context'

import { logout } from 'Config/AWSCognito'

import RMModalTermsAndPrivacy from 'Components/ModalTermsAndPrivacy'

const RMMenuAccount = memo<RouteComponentProps>(({ history }) => {
    const { t } = useTranslation('resmed')
    const { setMe, me } = useAuthContext()
    const { onCloseMenu, setMenuTab } = useLayoutContext()
    const [visibleLogout, setVisibleLogout] = useState(false)
    const [showModalTerms, setShowModalTerms] = useState(false)
    const [activeKey, setActiveKey] = useState(0)
    const { handleTrack } = useMainContext()

    const signOut = () => {
        logout({})
        setMe(undefined)
        handleTrack('Logout', undefined)
        history.push('/auth/entrar')
    }

    const modalTermsOpen = defaultKey => {
        setActiveKey(defaultKey)
        setShowModalTerms(true)
    }

    return (
        <SANScroll>
            <RMLogout
                visible={visibleLogout}
                onLeave={signOut}
                onCancel={() => setVisibleLogout(false)}
            />
            <SANBox px='md'>
                <SANButton
                    mb='md'
                    size='xsmall'
                    variant='outlined'
                    color='white'
                    block
                    bold
                    onClick={() => setMenuTab(0)}
                >
                    <SANEvaIcon name='arrow-back-outline' mr='xs' />
                    {t('mainMenu.back')}
                </SANButton>
                <SANAvatarMenu
                    loading={!me}
                    src={!!me && me.profilePicture}
                    title={!!me && me.name}
                />
            </SANBox>
            <SANTypography variant='overline' px='md' pt='xl' color='white.5'>
                {t('mainMenu.account.management')}
            </SANTypography>
            <SANNavigationList>
                <SANNavigationListItem
                    to='/inicio/minha-conta/alterar-senha'
                    icon={<SANEvaIcon name='lock-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='rm_menu_my-account__go_to--change-password'
                    title={t('mainMenu.account.changePassword')}
                />
            </SANNavigationList>
            <SANNavigationList>
                <SANNavigationListItem
                    to='/inicio/minha-conta/dados-complementares'
                    icon={<SANEvaIcon name='clipboard' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='rm_menu_my-account__go_to--complementary-register'
                    title={t('mainMenu.account.complementaryRegister')}
                />
            </SANNavigationList>
            <SANDivider mx='md' my='lg' bg='white.1' />

            <SANTypography variant='overline' px='md' color='white.5'>
                {t('mainMenu.account.help')}
            </SANTypography>
            <SANNavigationList>
                <SANNavigationListItem
                    dataTestid='rm_menu_my-menu-navigation__my-account__help-center'
                    title={t('mainMenu.account.helpCenter')}
                    icon={<SANEvaIcon name='lock-outline' color='default' />}
                    onClick={onCloseMenu}
                    to='/inicio/central-ajuda'
                />
            </SANNavigationList>
            <SANDivider mx='md' my='lg' bg='white.1' />

            <SANTypography variant='overline' px='md' color='white.5'>
                {t('mainMenu.account.otherLinks')}
            </SANTypography>
            <SANNavigationList>
                <SANNavigationListItem
                    dataTestid='rm_menu_my-account__go_to--terms-of-use'
                    title={t('mainMenu.account.termsOfUse')}
                    onClick={() => modalTermsOpen('0')}
                />
                <SANNavigationListItem
                    dataTestid='rm_menu_my-account__go_to--privacy-policy'
                    title={t('mainMenu.account.privacyPolicy')}
                    onClick={() => modalTermsOpen('1')}
                />
                <SANNavigationListItem
                    onClick={() => setVisibleLogout(true)}
                    dataTestid='rm_menu_my-account__go_to--leave-account'
                    title={t('mainMenu.account.signOut')}
                />
            </SANNavigationList>

            <RMModalTermsAndPrivacy
                onCancel={() => {
                    setShowModalTerms(false)
                    setActiveKey(0)
                }}
                visible={showModalTerms}
                defaultActiveKey={activeKey}
                scrolling
            />
        </SANScroll>
    )
})

export default withRouter(RMMenuAccount)
