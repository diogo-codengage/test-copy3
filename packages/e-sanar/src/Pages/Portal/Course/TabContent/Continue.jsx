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

const SANCourseContinue = ({ history }) => {
    const { getEnrollment } = useAuthContext()
    const { t } = useTranslation('esanar')
    const { lastAccessed } = usePortalContext()

    const { next_module } = getEnrollment()

    const percentProgressLast = lastAccessed
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

    const getBadge = module =>
        module && module.module_progress
            ? `${module.module_progress.done}/${module.module_progress.total}`
            : '0/0'

    const leftProps = {
        ...(lastAccessed && {
            moduleName: `${t(
                'courseDetails.tabContent.modules.module.key'
            )} ${lastAccessed.module_order + 1}`,
            title: lastAccessed.module_title,
            badge: getBadge(lastAccessed),
            progress: percentProgressLast,
            moduleTime: `${lastAccessed.duration || 0}min`,
            image: lastAccessed.thumbnail,
            onClick: goClassroomLast(lastAccessed)
        })
    }

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
                            {...leftProps}
                            actionName={t(
                                'courseDetails.tabContent.cardModuleAction'
                            )}
                        />
                    </ESCol>
                    <ESCol xs={24} md={12}>
                        <SessionTitle
                            title={t(
                                'courseDetails.tabContent.continue.nextModule'
                            )}
                        />
                        <ESCardCourseModule
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
                            image={next_module.cover_picture_url}
                            onClick={goClassroomNext(next_module)}
                        />
                    </ESCol>
                </ESRow>
            </SANPortalPagesContainer>
        </div>
    )
}

export default withRouter(SANCourseContinue)
