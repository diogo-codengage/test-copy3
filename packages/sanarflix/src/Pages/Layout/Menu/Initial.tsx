import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANNavigationList,
    SANNavigationListItem
} from '@sanar/components/dist/Components/Organisms/MainMenu'
import SANEvaIcon from '@sanar/components/dist/Components/Atoms/EvaIcon'

import { useLayoutContext } from '../Context'

const FLXMenuInitial: React.FC = () => {
    const { t } = useTranslation('sanarflix')
    const { onCloseMenu } = useLayoutContext()

    return (
        <>
            <SANNavigationList>
                <SANNavigationListItem
                    to='/portal/inicio'
                    icon={<SANEvaIcon name='home-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flx-menu__go-to--home'
                    title={t('mainMenu.initial.begin')}
                />
                <SANNavigationListItem
                    to='#'
                    icon={<SANEvaIcon name='book-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flx-menu__go-to--allCourses'
                    title={t('mainMenu.initial.allCourses')}
                />
                <SANNavigationListItem
                    to='#'
                    icon={<SANEvaIcon name='heart-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flx-menu__go-to--bookmarks'
                    title={t('mainMenu.initial.bookmarks')}
                />
            </SANNavigationList>
        </>
    )
}

export default FLXMenuInitial
