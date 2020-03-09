import React from 'react'

import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import SessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESCardCourseModule from 'sanar-ui/dist/Components/Molecules/CardCourseModule'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import { usePortalContext } from 'Pages/Portal/Context'
import { useAuthContext } from 'Hooks/auth'
import { getClassRoute } from 'Utils/getClassRoute'

import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'

const SANCourseContinue = ({ history }) => {
    const {
        enrollment: { next_module }
    } = useAuthContext()
    const { t } = useTranslation('esanar')
    const { lastAccessed, error } = usePortalContext()

    const percentProgressLast =
        lastAccessed && lastAccessed.module_progress
            ? (lastAccessed.module_progress.done * 100) /
              lastAccessed.module_progress.total
            : 0

    const percentProgressNext =
        next_module && next_module.progress
            ? (next_module.progress.done * 100) / next_module.progress.total
            : 0

    const goClassroomLast = module => () =>
        history.push(
            `/aluno/sala-aula/${module.module_id}/${getClassRoute(
                module.resource_type
            )}/${module.resource_id}`
        )

    const goClassroomNext = module => () =>
        history.push(`/aluno/sala-aula/${module.id}`)

    const getBadge = (module, path) =>
        module && module[path]
            ? `${module[path].done}/${module[path].total}`
            : '0/0'

    const leftProps = {
        ...(lastAccessed && {
            moduleName: `${t(
                'courseDetails.tabContent.discipline.discipline.key'
            )} ${lastAccessed.module_order}`,
            title: lastAccessed.module_title,
            badge: getBadge(lastAccessed, 'module_progress'),
            progress: percentProgressLast,
            moduleTime: `${lastAccessed.duration || 0}min`,
            image: lastAccessed.thumbnail || lastAccessed.cover_picture_url,
            onClick: goClassroomLast(lastAccessed)
        })
    }

    return (
        <div className='san-tab-course-content__continue'>
            <SANPortalPagesContainer>
                {!error ? (
                    <ESRow gutter={24}>
                        {!!next_module && (
                            <ESCol xs={24} md={12}>
                                <SessionTitle
                                    title={t(
                                        'courseDetails.tabContent.continue.whereStopped'
                                    )}
                                />
                                <ESCardCourseModule
                                    data-testid='san-portal__tab-content__continue'
                                    className='san-tab-course-content__continue--card'
                                    {...leftProps}
                                    actionName={t(
                                        'courseDetails.tabContent.cardModuleAction'
                                    )}
                                />
                            </ESCol>
                        )}
                        {!!next_module && (
                            <ESCol xs={24} md={12}>
                                <SessionTitle
                                    title={t(
                                        'courseDetails.tabContent.continue.nextDiscipline'
                                    )}
                                />
                                <ESCardCourseModule
                                    data-testid='san-portal__tab-content__next-discipline'
                                    className='san-tab-course-content__continue--card'
                                    moduleName={`${t(
                                        'courseDetails.tabContent.discipline.discipline.key'
                                    )} ${next_module.index}`}
                                    title={next_module.name}
                                    badge={getBadge(next_module, 'progress')}
                                    progress={percentProgressNext}
                                    actionName={t(
                                        'courseDetails.tabContent.cardModuleAction'
                                    )}
                                    moduleTime={`${next_module.duration ||
                                        0}min`}
                                    image={next_module.cover_picture_url}
                                    onClick={goClassroomNext(next_module)}
                                />
                            </ESCol>
                        )}
                    </ESRow>
                ) : (
                    <SANErrorPiece
                        message={t(
                            'courseDetails.tabContent.continue.error.defaultMessage'
                        )}
                    />
                )}
            </SANPortalPagesContainer>
        </div>
    )
}

export default withRouter(SANCourseContinue)
