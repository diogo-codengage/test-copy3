import React from 'react'

import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    ESNavigationList,
    ESNavigationListItem,
    ESRanking,
    ESLeftOff
} from 'sanar-ui/dist/Components/Organisms/MainMenu'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import { useAuthContext } from 'Hooks/auth'
import { usePortalContext } from 'Pages/Portal/Context'
import { getClassRoute } from 'Utils/getClassRoute'
import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'
import { useLayoutContext } from '../../Layout/Context'

const intlPath = 'mainMenu.initial.'

const SANInitial = ({ setTab, history }) => {
    const { lastAccessed, error } = usePortalContext()
    const { getEnrollment } = useAuthContext()
    const { menuOpenOrClose } = useLayoutContext()
    const { t } = useTranslation('esanar')

    const { course, ranking } = getEnrollment()

    const moduleReference = last =>
        `${t('global.subject')} ${last.module_order + 1}, ${t(
            'global.activity'
        )} ${last.resource_order + 1}`

    const goClassroom = () =>
        history.push(
            `/aluno/sala-aula/${lastAccessed.module_id}/${getClassRoute(
                lastAccessed.resource_type
            )}/${lastAccessed.resource_id}`
        )

    const leftProps = {
        title: course.name,
        ...(lastAccessed && {
            classReference: lastAccessed.module_title,
            thumbnail: lastAccessed.thumbnail,
            moduleReference: moduleReference(lastAccessed),
            onClick: goClassroom
        })
    }

    const rankingProps = {
        ranking: ranking.position,
        score: ranking.points
    }

    const renderNextContent = e => {
        setTab(Number(e.key))
    }

    return (
        <>
            <div className='pl-md pr-md mb-md'>
                <ESRanking {...rankingProps} />
            </div>
            <div className='pl-md pr-md'>
                {!error ? (
                    <ESLeftOff {...leftProps} />
                ) : (
                    <div className='san-portal-layout__error-card'>
                        <SANErrorPiece
                            message={t(
                                'courseDetails.tabContent.continue.error.defaultMessage'
                            )}
                        />
                    </div>
                )}
            </div>
            <ESNavigationList onClick={renderNextContent}>
                <ESNavigationListItem
                    key={0}
                    title={t(`${intlPath}init`)}
                    icon={<ESEvaIcon name='home-outline' color='default' />}
                    onClick={() => menuOpenOrClose()}
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
                    onClick={() => menuOpenOrClose()}
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
