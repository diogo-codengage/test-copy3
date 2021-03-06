import React, { memo } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import {
    SANNavigationList,
    SANNavigationListItem,
    SANEvaIcon,
    SANLeftOff,
    SANLeftOffLoading,
    SANLeftOffError,
    useSnackbarContext
} from '@sanar/components'

import { useAuthContext } from 'Hooks/auth'
import { useLayoutContext } from '../Context'

const formatMinutes = minutes =>
    new Date(minutes * 60000).toISOString().substr(11, 5)

const RMSuggestedClass = withRouter(({ history }) => {
    const { t } = useTranslation('resmed')
    const createSnackbar = useSnackbarContext()
    const { suggestedClass } = useLayoutContext()

    const goToResource = () => {
        try {
            if (!!suggestedClass && !!suggestedClass.data) {
                const {
                    specialtyId,
                    subSpecialtyId,
                    lesson,
                    collectionId,
                    resource
                } = suggestedClass.data.accessContent

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
        } catch (error) {
            console.error('[RMSuggestedClass]:goToResource', error)
            createSnackbar({
                message: t('schedule.errorGoClass'),
                theme: 'error'
            })
        }
    }

    if (suggestedClass.loading) {
        return <SANLeftOffLoading />
    }

    if (suggestedClass.error) {
        return <SANLeftOffError />
    }

    if (!suggestedClass || !suggestedClass.data) {
        return null
    }

    return (
        <SANLeftOff
            label={t('schedule.suggestedClass')}
            onClick={goToResource}
            resourceType={'Video'}
            classReference={suggestedClass.data.title}
            moduleReference={formatMinutes(suggestedClass.data.timeInMinutes)}
            thumbnail={suggestedClass.data.image}
        />
    )
})

const RMMenuInitial = memo(() => {
    const { t } = useTranslation('resmed')
    const { me, activeCourse } = useAuthContext()
    const { onCloseMenu, setMenuTab } = useLayoutContext()

    const canShowSimulatedLink = () => {
        const notAllowed = (process.env.REACT_APP_SANAR_COURSES_ID!).split(', ')
        return !notAllowed.includes(activeCourse.id)
    }

    const openSimulatedLink = () => {
        window.open('http://sanar.link/simulado-residenciamedica')
    }

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
                {!!me && me.hasSchedule && (
                    <SANNavigationListItem
                        to='/inicio/cronograma'
                        icon={
                            <SANEvaIcon
                                name='calendar-outline'
                                color='default'
                            />
                        }
                        onClick={onCloseMenu}
                        dataTestid='rm-menu__go-to--schedule'
                        title={t('mainMenu.initial.schedule')}
                    />
                )}
                {!!me && me.hasLives && (
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
                )}
                {!!activeCourse && canShowSimulatedLink() && (
                    <SANNavigationListItem
                        icon={
                            <SANEvaIcon
                                name='checkmark-circle-outline'
                                color='default'
                            />
                        }
                        onClick={openSimulatedLink}
                        dataTestid='rm-menu__go-to--simulated'
                        title={t('mainMenu.initial.simulated')}
                    />
                )}
                {!!me && me.countCourses > 1 && (
                    <SANNavigationListItem
                        dataTestid='rm-menu__go-to--change-course'
                        onClick={() => setMenuTab(3)}
                        icon={
                            <SANEvaIcon name='swap-outline' color='default' />
                        }
                        title={t('mainMenu.initial.changeCourse')}
                    />
                )}
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