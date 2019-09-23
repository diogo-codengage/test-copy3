import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANNavigationList,
    SANNavigationListItem,
    SANAvatarMenu,
    SANEvaIcon,
    SANBox,
    SANButton,
    SANTypography,
    SANDivider,
    SANSupport
} from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import { SUPPORT_MESSAGE_MUTATION } from 'Apollo/Support/Mutations/support-message'
import FLXLogout from 'Components/ModalLogout'
import { useLayoutContext } from '../Context'

import { getInstance } from 'Config/AWSCognito'

const FLXMenuAccount: React.FC<RouteComponentProps> = ({ history }) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const { me } = useAuthContext()
    const { onCloseMenu, setMenuTab } = useLayoutContext()
    const [visibleLogout, setVisibleLogout] = useState(false)
    const [visibleSupport, setVisibleSupport] = useState(false)

    const signOut = () => {
        const config = getInstance()
        const user = config.userPool.getCurrentUser()
        if (!!user) {
            user.signOut()
            history.push('/')
        }
    }

    const handleSubmitSupport = async values => {
        try {
            await client.mutate({
                mutation: SUPPORT_MESSAGE_MUTATION,
                variables: {
                    email: values.email,
                    message: values.message,
                    allow_sanar_contact: values.check
                }
            })
            setVisibleSupport(false)
        } catch {}
    }

    return (
        <>
            <SANSupport
                onSubmit={handleSubmitSupport}
                data={{
                    email: me.email
                }}
                ModalProps={{
                    visible: visibleSupport,
                    onCancel: () => setVisibleSupport(false)
                }}
            />
            <FLXLogout
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
                    src={me.profile_picture}
                    title={me.name}
                    subtitle={t(
                        `mainMenu.account.plan.${me.plan.payment_frequency}`
                    )}
                />
            </SANBox>
            <SANTypography variant='overline' px='md' pt='xl' color='white.5'>
                {t('mainMenu.account.management')}
            </SANTypography>
            <SANNavigationList>
                <SANNavigationListItem
                    to='/portal/minha-conta/meus-dados'
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
                    to='/portal/minha-conta/formas-pagamento'
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
                    onClick={() => setVisibleSupport(true)}
                    dataTestid='flix_menu_my-account__go_to--suport'
                    title={t('mainMenu.account.support')}
                />
                <SANNavigationListItem
                    onClick={() => setVisibleLogout(true)}
                    dataTestid='flix_menu_my-account__go_to--leave-account'
                    title={t('mainMenu.account.signOut')}
                />
            </SANNavigationList>
        </>
    )
}

export default withRouter(FLXMenuAccount)
