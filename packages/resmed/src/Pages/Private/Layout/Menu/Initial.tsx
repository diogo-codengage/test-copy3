import React, { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import {
    SANNavigationList,
    SANNavigationListItem,
    SANEvaIcon,
    SANLeftOff,
    SANLeftOffLoading,
    SANLeftOffError
} from '@sanar/components'

import {
    GET_SUGGESTED_CLASS,
    ISuggestedClassQuery
} from 'Apollo/Schedule/Queries/suggested-class'

import { useLayoutContext } from '../Context'

const formatMinutes = minutes =>
    new Date(minutes * 60000).toISOString().substr(11, 5)

const RMSuggestedClass = withRouter(({ history }) => {
    const { t } = useTranslation('resmed')
    const { loading, error, data } = useQuery<ISuggestedClassQuery>(
        GET_SUGGESTED_CLASS,
        {
            pollInterval: 120000
        }
    )

    const goToResource = () => {
        if (!!data && !!data.suggestedClass) {
            const {
                specialtyId,
                subSpecialtyId,
                lesson,
                collectionId,
                resource
            } = data.suggestedClass.accessContent

            const final = `${
                lesson.id
            }/${collectionId}/${resource.type.toLocaleLowerCase()}/${
                resource.id
            }`
            if (!!subSpecialtyId) {
                history.push(
                    `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${final}`
                )
            } else {
                history.push(`/inicio/sala-aula/${specialtyId}/${final}`)
            }
        }
    }

    if (loading) {
        return <SANLeftOffLoading />
    }

    if (error) {
        return <SANLeftOffError />
    }

    if (!data || (!!data && !data.suggestedClass)) {
        return null
    }

    return (
        <SANLeftOff
            label={t('schedule.suggestedClass')}
            onClick={goToResource}
            resourceType={'Video'}
            classReference={data.suggestedClass.title}
            moduleReference={formatMinutes(data.suggestedClass.timeInMinutes)}
            thumbnail={data.suggestedClass.image}
        />
    )
})

const RMMenuInitial = memo(() => {
    const { t } = useTranslation('resmed')
    const { onCloseMenu, setMenuTab } = useLayoutContext()

    return (
        <>
            <RMSuggestedClass />
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
                    icon={
                        <SANEvaIcon name='calendar-outline' color='default' />
                    }
                    onClick={onCloseMenu}
                    dataTestid='rm-menu__go-to--schedule'
                    title={t('mainMenu.initial.schedule')}
                />
                <SANNavigationListItem
                    to='/inicio/lives'
                    icon={
                        <SANEvaIcon
                            name='play-circle-outline'
                            color='default'
                        />
                    }
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
        </>
    )
})

export default RMMenuInitial
