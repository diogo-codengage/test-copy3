import React from 'react'

import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    ESNavigationList,
    ESNavigationListItem,
    ESLeftOff
} from 'sanar-ui/dist/Components/Organisms/MainMenu'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import { useAuthContext } from 'Hooks/auth'
import { getClassRoute } from 'Utils/getClassRoute'

const intlPath = 'mainMenu.initial.'

const SANInitial = ({ setTab, history }) => {
    const { getEnrollment } = useAuthContext()
    const { t } = useTranslation('esanar')

    const { course, last_accessed } = getEnrollment()

    const moduleReference = `${t(
        'global.subject'
    )} ${last_accessed.module_order + 1}, ${t(
        'global.activity'
    )} ${last_accessed.resource_order + 1}`

    const goClassroom = () =>
        history.push(
            `/aluno/sala-aula/${last_accessed.module_id}/${getClassRoute(
                last_accessed.resource_type
            )}/${last_accessed.resource_id}`
        )

    const renderNextContent = e => {
        setTab(Number(e.key))
    }

    return (
        <>
            <div className='pl-md pr-md'>
                <ESLeftOff
                    title={course.name}
                    classReference={last_accessed.module_title}
                    moduleReference={moduleReference}
                    thumbnail={last_accessed.thumbnail}
                    onClick={goClassroom}
                />
            </div>
            <ESNavigationList onClick={renderNextContent}>
                <ESNavigationListItem
                    key={0}
                    title={t(`${intlPath}init`)}
                    icon={<ESEvaIcon name='home-outline' color='default' />}
                />
                {/*FIXME: <ESNavigationListItem
                    key={1}
                    title={t(`${intlPath}notifications`)}
                    icon={
                        <ESBadge dot border={false} style={{ right: 10 }}>
                            <ESEvaIcon name='bell-outline' color='default' />
                        </ESBadge>
                    }
                />
                <ESNavigationListItem
                    key={2}
                    title={t(`${intlPath}schedule`)}
                    icon={<ESEvaIcon name='calendar-outline' color='default' />}
                />
                <ESNavigationListItem
                    key={3}
                    title={t(`${intlPath}saved`)}
                    icon={<ESEvaIcon name='heart-outline' color='default' />}
                />
                <ESNavigationListItem
                    key={4}
                    title={t(`${intlPath}performace`)}
                    icon={
                        <ESEvaIcon name='pie-chart-outline' color='default' />
                    }
                /> */}
                <ESNavigationListItem
                    key={5}
                    title={t(`${intlPath}questions`)}
                    icon={<ESEvaIcon name='edit-outline' color='default' />}
                />
                {/*FIXME: <ESNavigationListItem
                    key={6}
                    title={t(`${intlPath}changeCourse`)}
                    icon={<ESEvaIcon name='swap-outline' color='default' />}
                /> */}
                <ESNavigationListItem
                    key={7}
                    title={t(`${intlPath}myAccount`)}
                    icon={<ESEvaIcon name='person-outline' color='default' />}
                />
            </ESNavigationList>
        </>
    )
}

export default withRouter(SANInitial)
