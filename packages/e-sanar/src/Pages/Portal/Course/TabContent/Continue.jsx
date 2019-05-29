import React from 'react'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import SessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESCardCourseModule from 'sanar-ui/dist/Components/Molecules/CardCourseModule'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { useTranslation } from 'react-i18next'

const mock = {
    image1:
        'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2016/12/21/104180485-GettyImages-457207765.1910x1000.jpg',
    image2:
        'https://www.ft.com/__origami/service/image/v2/images/raw/http://prod-upp-image-read.ft.com/98b79a4e-fefb-11e8-aebf-99e208d3e521?source=next&fit=scale-down&quality=highest&width=800'
}

const SANCourseContinue = () => {
    const { t } = useTranslation('esanar')

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
                            moduleName='Módulo 1'
                            title='Planner de estudo'
                            badge='25/30'
                            progress={75}
                            actionName={t(
                                'courseDetails.tabContent.cardModuleAction'
                            )}
                            moduleTime='30min'
                            image={mock.image1}
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
                            moduleName='Módulo 1'
                            title='Planner de estudo'
                            badge='25/30'
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
