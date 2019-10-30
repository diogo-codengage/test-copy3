import React from 'react'

import { useTranslation } from 'react-i18next'

import {
    SANNavigationList,
    SANNavigationListItem,
    SANEvaIcon
} from '@sanar/components'

import { useLayoutContext } from '../Context'

const RMMenuInitial: React.FC = () => {
    const { t } = useTranslation('resmed')
    const { onCloseMenu, setMenuTab } = useLayoutContext()

    return (
        <SANNavigationList>
            <SANNavigationListItem
                to='/inicio/inicio'
                icon={<SANEvaIcon name='home-outline' color='default' />}
                onClick={onCloseMenu}
                dataTestid='rm-menu__go-to--home'
                title={t('mainMenu.initial.begin')}
            />
            <SANNavigationListItem
                to='/inicio/banco-questoes/filtro'
                icon={<SANEvaIcon name='edit-outline' color='default' />}
                onClick={onCloseMenu}
                dataTestid='rm-menu__go-to--practiceArea'
                title={t('mainMenu.initial.practiceArea')}
            />
            <SANNavigationListItem
                to='/inicio/desempenho'
                icon={<SANEvaIcon name='pie-chart-outline' color='default' />}
                onClick={onCloseMenu}
                dataTestid='rm-menu__go-to--performance'
                title={t('mainMenu.initial.performance')}
            />
            <SANNavigationListItem
                to='/inicio/lives'
                icon={<SANEvaIcon name='play-circle-outline' color='default' />}
                onClick={onCloseMenu}
                dataTestid='rm-menu__go-to--lives'
                title={t('mainMenu.initial.lives')}
            />
            <SANNavigationListItem
                to='/inicio/cronograma'
                icon={<SANEvaIcon name='calendar-outline' color='default' />}
                onClick={onCloseMenu}
                dataTestid='rm-menu__go-to--schedule'
                title={t('mainMenu.initial.schedule')}
            />
            <SANNavigationListItem
                icon={<SANEvaIcon name='person-outline' color='default' />}
                onClick={() => setMenuTab(1)}
                dataTestid='rm-menu__go-to--account'
                title={t('mainMenu.initial.account')}
            />
        </SANNavigationList>
    )
}

export default RMMenuInitial
