import React, { useState } from 'react'

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

import { logout } from 'Config/AWSCognito'

const RMMenuAccount: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('resmed')
    const { setMe } = useAuthContext()
    const { onCloseMenu, setMenuTab } = useLayoutContext()
    const [visibleLogout, setVisibleLogout] = useState(false)

    const signOut = () => {
        logout({})
        setMe(undefined)
        history.push('/auth/entrar')
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
                    onClick={() => setMenuTab(0)}
                >
                    <SANEvaIcon name='arrow-back-outline' />
                    {t('mainMenu.back')}
                </SANButton>
                <SANAvatarMenu
                    src='https://carroecarros.com.br/wp-content/uploads/2015/09/nova-honda-biz-125-2015-2016-2.jpg'
                    title={'Diogo Biz'}
                />
            </SANBox>
            <SANTypography variant='overline' px='md' pt='xl' color='white.5'>
                {t('mainMenu.account.management')}
            </SANTypography>
            <SANNavigationList>
                <SANNavigationListItem
                    to='/incio/minha-conta/meus-dados'
                    icon={<SANEvaIcon name='folder-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flix_menu_my-account__go_to--profile'
                    title={t('mainMenu.account.myData')}
                />
                <SANNavigationListItem
                    to='/incio/minha-conta/alterar-senha'
                    icon={<SANEvaIcon name='lock-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flix_menu_my-account__go_to--change-password'
                    title={t('mainMenu.account.changePassword')}
                />
            </SANNavigationList>

            <SANTypography variant='overline' px='md' color='white.5'>
                {t('mainMenu.account.help')}
            </SANTypography>
            <SANNavigationList>
                <SANNavigationListItem
                    data-testid='flix-menu-navigation__my-account__help-center'
                    title={t('mainMenu.account.helpCenter')}
                    icon={<SANEvaIcon name='lock-outline' color='default' />}
                    to='/inicio/central-ajuda'
                />
            </SANNavigationList>
            <SANDivider mx='md' my='lg' bg='white.1' />

            <SANTypography variant='overline' px='md' color='white.5'>
                {t('mainMenu.account.otherLinks')}
            </SANTypography>
            <SANNavigationList>
                <SANNavigationListItem
                    data-testid='flix_menu_my-account__go_to--terms-of-use'
                    title={t('mainMenu.account.termsOfUse')}
                />
                <SANNavigationListItem
                    data-testid='flix_menu_my-account__go_to--privacy-policy'
                    title={t('mainMenu.account.privacyPolicy')}
                />
                <SANNavigationListItem
                    onClick={() => setVisibleLogout(true)}
                    data-testid='flix_menu_my-account__go_to--leave-account'
                    title={t('mainMenu.account.signOut')}
                />
            </SANNavigationList>
        </SANScroll>
    )
}

export default withRouter(RMMenuAccount)
