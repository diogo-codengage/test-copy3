import React, { memo } from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANNavigationList,
    SANNavigationListItem,
    SANEvaIcon
} from '@sanar/components'

import { useLayoutContext } from '../Context'

const RMMenuInitial = memo(() => {
    const { t } = useTranslation('resmed')
    const { onCloseMenu, setMenuTab } = useLayoutContext()

    return (
        <SANNavigationList>
            <SANNavigationListItem
                to='/inicio/curso'
                icon={<SANEvaIcon name='home-outline' color='default' />}
                onClick={onCloseMenu}
                dataTestid='rm-menu__go-to--home'
                title={t('mainMenu.initial.begin')}
            />
            <SANNavigationListItem
                to='/inicio/area-pratica/filtro'
                icon={<SANEvaIcon name='edit-outline' color='default' />}
                onClick={onCloseMenu}
                dataTestid='rm-menu__go-to--practiceArea'
                title={t('mainMenu.initial.practiceArea')}
            />
            <SANNavigationListItem
                to='/inicio/cronograma'
                icon={<SANEvaIcon name='calendar-outline' color='default' />}
                onClick={onCloseMenu}
                dataTestid='rm-menu__go-to--schedule'
                title={t('mainMenu.initial.schedule')}
            />
            <SANNavigationListItem
                to='/inicio/lives'
                icon={<SANEvaIcon name='play-circle-outline' color='default' />}
                onClick={onCloseMenu}
                dataTestid='rm-menu__go-to--lives'
                title={t('mainMenu.initial.lives')}
            />
            <SANNavigationListItem
                icon={<SANEvaIcon name='person-outline' color='default' />}
                onClick={() => setMenuTab(1)}
                dataTestid='rm-menu__go-to--account'
                title={t('mainMenu.initial.account')}
            />
        </SANNavigationList>
    )
})

export default RMMenuInitial
