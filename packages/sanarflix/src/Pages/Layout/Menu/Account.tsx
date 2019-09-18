import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANNavigationList,
    SANNavigationListItem,
    SANAvatarMenu,
    SANEvaIcon,
    SANBox,
    SANButton,
    SANTypography,
    SANDivider
} from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import { useLayoutContext } from '../Context'

const FLXMenuAccount: React.FC = () => {
    const { t } = useTranslation('sanarflix')
    const { me } = useAuthContext()
    const { onCloseMenu } = useLayoutContext()

    return (
        <>
            <SANBox px='md'>
                <SANButton
                    mb='md'
                    size='xsmall'
                    variant='outlined'
                    color='white'
                    block
                >
                    <SANEvaIcon name='arrow-back-outline' />
                    {t('mainMenu.back')}
                </SANButton>
                <SANAvatarMenu
                    src={me.profile_picture}
                    title={me.name}
                    subtitle='Inserir plano'
                />
            </SANBox>
            <SANTypography variant='overline' px='md' pt='xl' color='white.5'>
                {t('mainMenu.account.management')}
            </SANTypography>
            <SANNavigationList>
                <SANNavigationListItem
                    icon={<SANEvaIcon name='folder-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flix_menu_my-account__go_to--profile'
                    title={t('mainMenu.account.myData')}
                />
                <SANNavigationListItem
                    icon={<SANEvaIcon name='lock-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flix_menu_my-account__go_to--change-password'
                    title={t('mainMenu.account.changePassword')}
                />
            </SANNavigationList>
            <SANDivider mx='md' my='lg' bg='white.1' />

            <SANTypography variant='overline' px='md' color='white.5'>
                {t('mainMenu.account.signature')}
            </SANTypography>
            <SANNavigationList>
                <SANNavigationListItem
                    icon={<SANEvaIcon name='menu-2-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flix_menu_my-account__go_to--account-plan'
                    title={t('mainMenu.account.myPlan')}
                />
                <SANNavigationListItem
                    icon={
                        <SANEvaIcon
                            name='credit-card-outline'
                            color='default'
                        />
                    }
                    onClick={onCloseMenu}
                    dataTestid='flix_menu_my-account__go_to--payment-methods'
                    title={t('mainMenu.account.paymentMethods')}
                />
                <SANNavigationListItem
                    icon={
                        <SANEvaIcon
                            name='close-square-outline'
                            color='default'
                        />
                    }
                    onClick={onCloseMenu}
                    dataTestid='flix_menu_my-account__go_to--plan-cancel'
                    title={t('mainMenu.account.unsubscribe')}
                />
            </SANNavigationList>
            <SANDivider mx='md' my='lg' bg='white.1' />

            <SANTypography variant='overline' px='md' color='white.5'>
                {t('mainMenu.account.otherLinks')}
            </SANTypography>
            <SANNavigationList>
                <SANNavigationListItem
                    onClick={onCloseMenu}
                    dataTestid='flix_menu_my-account__go_to--suport'
                    title={t('mainMenu.account.support')}
                />
                <SANNavigationListItem
                    onClick={onCloseMenu}
                    dataTestid='flix_menu_my-account__go_to--leave-account'
                    title={t('mainMenu.account.signOut')}
                />
            </SANNavigationList>
        </>
    )
}

export default FLXMenuAccount
