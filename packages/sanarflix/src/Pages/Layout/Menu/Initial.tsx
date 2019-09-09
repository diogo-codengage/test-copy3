import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANNavigationList,
    SANNavigationListItem,
    SANEvaIcon
} from '@sanar/components'

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
                    to='/portal/cursos'
                    icon={<SANEvaIcon name='book-outline' color='default' />}
                    onClick={onCloseMenu}
                    dataTestid='flx-menu__go-to--allCourses'
                    title={t('mainMenu.initial.allCourses')}
                />
            </SANNavigationList>
        </>
    )
}

export default FLXMenuInitial
