import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    ESAvatarMenu,
    ESNavigationList,
    ESNavigationListItem
} from 'sanar-ui/dist/Components/Organisms/MainMenu'

import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESDivider from 'sanar-ui/dist/Components/Atoms/Divider'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

import { useAuthContext } from 'Hooks/auth'

const intlPath = 'mainMenu.myAccount.'

const SANMyAccount = ({ setTab }) => {
    const { me } = useAuthContext()
    const { t } = useTranslation()

    return (
        <>
            <div className='pl-md pr-md mb-md'>
                <ESButton
                    className='mb-md'
                    size='xsmall'
                    variant='outlined'
                    color='white'
                    block
                    onClick={() => setTab(0)}
                >
                    <ESEvaIcon name='arrow-back-outline' />
                    {t('mainMenu.back')}
                </ESButton>
                <ESAvatarMenu
                    src={me.profile_picture}
                    title={me.name}
                    subtitle='Enfermagem'
                />
            </div>

            <ESTypography
                className='text-white-6 pl-md pr-md'
                variant='overline'
            >
                {t(`${intlPath}management`)}
            </ESTypography>
            <ESNavigationList onClick={console.log}>
                <ESNavigationListItem
                    key='0'
                    title={t(`${intlPath}myData`)}
                    icon={<ESEvaIcon name='folder-outline' color='default' />}
                />
                <ESNavigationListItem
                    key='1'
                    title={t(`${intlPath}changePassword`)}
                    icon={<ESEvaIcon name='lock-outline' color='default' />}
                />
            </ESNavigationList>
            <div className='pl-md pr-md'>
                <ESDivider className='mt-md mb-md' />
            </div>
            <ESTypography
                className='text-white-6 pl-md pr-md'
                variant='overline'
            >
                {t(`${intlPath}help`)}
            </ESTypography>
            <ESNavigationList onClick={console.log}>
                <ESNavigationListItem
                    key='0'
                    title={t(`${intlPath}sendFeedback`)}
                    icon={<ESEvaIcon name='email-outline' color='default' />}
                />
                <ESNavigationListItem
                    key='1'
                    title={t(`${intlPath}helpCenter`)}
                    icon={
                        <ESEvaIcon
                            name='question-mark-circle-outline'
                            color='default'
                        />
                    }
                />
            </ESNavigationList>
            <div className='pl-md pr-md'>
                <ESDivider className='mt-md mb-md' />
            </div>
            <ESTypography
                className='text-white-6 pl-md pr-md'
                variant='overline'
            >
                {t(`${intlPath}otherLinks`)}
            </ESTypography>
            <ESNavigationList onClick={console.log}>
                <ESNavigationListItem
                    key='0'
                    title={t(`${intlPath}termsOfUse`)}
                    arrow={false}
                />
                <ESNavigationListItem
                    key='1'
                    title={t(`${intlPath}privacyPolicy`)}
                    arrow={false}
                />
                <ESNavigationListItem
                    key='2'
                    title={t(`${intlPath}leaveAccount`)}
                    arrow={false}
                />
            </ESNavigationList>
        </>
    )
}

export default SANMyAccount
