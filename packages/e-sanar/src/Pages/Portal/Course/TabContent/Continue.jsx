import React from 'react'

import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import SessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESCardCourseModule from 'sanar-ui/dist/Components/Molecules/CardCourseModule'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import { useAuthContext } from 'Hooks/auth'
import { getClassRoute } from 'Utils/getClassRoute'

const SANCourseContinue = ({ history }) => {
    const { getEnrollment } = useAuthContext()
    const { t } = useTranslation('esanar')

    const { last_accessed, next_module } = getEnrollment()

    const percentProgressLast = last_accessed
        ? (last_accessed.module_progress.done * 100) /
          last_accessed.module_progress.total
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

    const getBadge = module =>
        module && module.module_progress
            ? `${module.module_progress.done}/${module.module_progress.total}`
            : '0/0'

    return (
        <div className='san-tab-course-content__continue'>
            <SANPortalPagesContainer>
                <ESRow gutter={24}>
                    <ESCol xs={24} md={12}>
                        <SessionTitle
                            title={t(
                                'courseDetails.tabContent.continue.whereStopped'
                            )}
                        />
                        <ESCardCourseModule
                            className='san-tab-course-content__continue--card'
                            moduleName={`${t(
                                'courseDetails.tabContent.modules.module.key'
                            )} ${last_accessed.module_order + 1}`}
                            title={last_accessed.module_title}
                            badge={getBadge(last_accessed)}
                            progress={percentProgressLast}
                            actionName={t(
                                'courseDetails.tabContent.cardModuleAction'
                            )}
                            moduleTime={`${last_accessed.duration || 0}min`}
                            image={last_accessed.thumbnail}
                            onClick={goClassroomLast(last_accessed)}
                        />
                    </ESCol>
                    <ESCol xs={24} md={12}>
                        <SessionTitle
                            title={t(
                                'courseDetails.tabContent.continue.nextModule'
                            )}
                        />
                        {/* <ESCardCourseModule
                            className='san-tab-course-content__continue--card'
                            moduleName={`${t(
                                'courseDetails.tabContent.modules.module.key'
                            )} ${next_module.index + 1}`}
                            title={next_module.name}
                            badge={getBadge(next_module)}
                            progress={percentProgressNext}
                            actionName={t(
                                'courseDetails.tabContent.cardModuleAction'
                            )}
                            moduleTime={`${next_module.duration || 0}min`}
                            image={next_module.cover_picture}
                            onClick={goClassroomNext(next_module)}
                        /> */}
                    </ESCol>
                </ESRow>
            </SANPortalPagesContainer>
        </div>
    )
}

export default withRouter(SANCourseContinue)
