import React from 'react'

import { useTranslation } from 'react-i18next'

import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import SessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESCardCourseModule from 'sanar-ui/dist/Components/Molecules/CardCourseModule'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

// import { useAuthContext } from 'Hooks/auth'

const mock = {
    image1:
        'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2016/12/21/104180485-GettyImages-457207765.1910x1000.jpg',
    image2:
        'https://www.ft.com/__origami/service/image/v2/images/raw/http://prod-upp-image-read.ft.com/98b79a4e-fefb-11e8-aebf-99e208d3e521?source=next&fit=scale-down&quality=highest&width=800'
}

const SANCourseContinue = () => {
    // const { getEnrollment } = useAuthContext()
    const { t } = useTranslation('esanar')

    // const { last_accessed } = getEnrollment()

    // const percentProgress = last_accessed
    //     ? (last_accessed.module_progress.done * 100) /
    //       last_accessed.module_progress.total
    //     : 0

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
                        {/* <ESCardCourseModule
                            className='san-tab-course-content__continue--card'
                            moduleName={`${t(
                                'courseDetails.tabContent.modules.singularName'
                            )} ${last_accessed.module_order}`}
                            title={last_accessed.module_title}
                            badge={`${last_accessed.module_progress.done}/${
                                last_accessed.module_progress.total
                            }`}
                            progress={percentProgress}
                            actionName={t(
                                'courseDetails.tabContent.cardModuleAction'
                            )}
                            moduleTime={`${last_accessed.duration || 0}min`}
                            image={last_accessed.thumbnail}
                        /> */}
                    </ESCol>
                    <ESCol xs={24} md={12}>
                        <SessionTitle
                            title={t(
                                'courseDetails.tabContent.continue.nextModule'
                            )}
                        />
                        <ESCardCourseModule
                            className='san-tab-course-content__continue--card'
                            moduleName='Módulo 1'
                            title='Planner de estudo'
                            badge='15/30'
                            progress={75}
                            actionName={t(
                                'courseDetails.tabContent.cardModuleAction'
                            )}
                            moduleTime='30min'
                            image={mock.image2}
                        />
                    </ESCol>
                </ESRow>
            </SANPortalPagesContainer>
        </div>
    )
}

export default SANCourseContinue
