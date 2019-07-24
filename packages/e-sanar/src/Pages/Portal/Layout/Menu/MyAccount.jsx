import React, { useState } from 'react'

import { withRouter } from 'react-router'
import { Auth } from 'aws-amplify'
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
import ESModalTabs from 'sanar-ui/dist/Components/Organisms/ModalTabs'

import { useAuthContext } from 'Hooks/auth'
import SANLogout from 'Components/ModalLogout'
import SANFeedback from 'Components/ModalFeedback'
import ESTermsAndPrivacy from 'assets/TermsAndPrivacy'
import { useLayoutContext } from '../Context'

const intlPath = 'mainMenu.myAccount.'

const modalTermsContent = [
    {
        title: 'Termos de uso',
        content: <ESTermsAndPrivacy />
    }
]

const SANMyAccount = ({ handleBack, history }) => {
    const { me, getEnrollment } = useAuthContext()
    const { t } = useTranslation('esanar')
    const [open, setOpen] = useState(false)
    const [openFeedback, setOpenFeedback] = useState(false)
    const [openModalTerms, setOpenModalTerms] = useState(false)
    const { menuOpenOrClose } = useLayoutContext()

    const { course } = getEnrollment()

    const handleOtherLinks = ({ key }) => {
        setOpen(Number(key) === 2)
    }

    //FIXME: const handleHelp = ({ key }) => {
    //     setOpenFeedback(Number(key) === 0)
    // }

    const leaveAccount = () => {
        Auth.signOut().then(() => {
            history.push('/')
        })
    }

    const navIntoMyAccount = ({ key }) => {
        switch (Number(key)) {
            case 1:
                menuOpenOrClose()
                break
            case 2:
                menuOpenOrClose()
                break
            default:
                history.push('/aluno/minha-conta/')
        }
    }

    return (
        <>
            <SANLogout
                visible={open}
                onLeave={() => leaveAccount()}
                onCancel={() => setOpen(false)}
            />
            <SANFeedback
                visible={openFeedback}
                onLeave={() => setOpenFeedback(false)}
                onCancel={() => setOpenFeedback(false)}
                onSendEnd={() => setOpenFeedback(false)}
            />
            <ESModalTabs
                visible={openModalTerms}
                onCancel={() => setOpenModalTerms(false)}
                content={modalTermsContent}
            />

            <div className='pl-md pr-md mb-md'>
                <ESButton
                    className='mb-md'
                    size='xsmall'
                    variant='outlined'
                    color='white'
                    block
                    onClick={handleBack}
                >
                    <ESEvaIcon name='arrow-back-outline' />
                    {t('mainMenu.back')}
                </ESButton>
                <ESAvatarMenu
                    src={me.profile_picture}
                    title={me.name}
                    subtitle={course.knowledge_area}
                />
            </div>

            <ESTypography
                className='text-white-6 pl-md pr-md'
                variant='overline'
            >
                {t(`${intlPath}management`)}
            </ESTypography>
            <ESNavigationList className='mb-md' onClick={navIntoMyAccount}>
                {/*FIXME: <ESNavigationListItem
                    key='0'
                    title={t(`${intlPath}myData`)}
                    icon={<ESEvaIcon name='folder-outline' color='default' />}
                /> */}
                <ESNavigationListItem
                    data-testid='san-menu-navigation__my-account__change-password'
                    key='1'
                    title={t(`${intlPath}changePassword`)}
                    to='/aluno/minha-conta/alterar-senha'
                    icon={<ESEvaIcon name='lock-outline' color='default' />}
                />
            </ESNavigationList>
            <ESTypography
                className='text-white-6 pl-md pr-md'
                variant='overline'
            >
                {t(`${intlPath}help`)}
            </ESTypography>
            <ESNavigationList onClick={navIntoMyAccount}>
                <ESNavigationListItem
                    data-testid='san-menu-navigation__my-account__help-center'
                    key='2'
                    title={t(`${intlPath}helpCenter`)}
                    icon={<ESEvaIcon name='lock-outline' color='default' />}
                    to='/aluno/central-ajuda'
                />
            </ESNavigationList>
            {/*FIXME: <div className='pl-md pr-md'>
                <ESDivider className='mt-md mb-md' />
            </div>
            <ESTypography
                className='text-white-6 pl-md pr-md'
                variant='overline'
            >
                {t(`${intlPath}help`)}
            </ESTypography>
            <ESNavigationList onClick={handleHelp}>
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
            </ESNavigationList> */}
            <div className='pl-md pr-md'>
                <ESDivider className='mt-md mb-md' />
            </div>
            <ESTypography
                className='text-white-6 pl-md pr-md'
                variant='overline'
            >
                {t(`${intlPath}otherLinks`)}
            </ESTypography>
            <ESNavigationList onClick={handleOtherLinks}>
                <ESNavigationListItem
                    data-testid='san-menu-navigation__my-account__use-terms'
                    key={0}
                    title={t(`${intlPath}termsOfUse`)}
                    arrow={false}
                    onClick={() => setOpenModalTerms(true)}
                />
                <ESNavigationListItem
                    data-testid='san-menu-navigation__my-account__privacy-and-policy'
                    key={1}
                    title={t(`${intlPath}privacyPolicy`)}
                    arrow={false}
                    onClick={() => setOpenModalTerms(true)}
                />
                <ESNavigationListItem
                    data-testid='san-menu-navigation__my-account__leave-account'
                    key={2}
                    title={t(`${intlPath}leaveAccount`)}
                    arrow={false}
                />
            </ESNavigationList>
        </>
    )
}

export default withRouter(SANMyAccount)
