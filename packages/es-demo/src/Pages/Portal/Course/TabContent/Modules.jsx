import React from 'react'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESPagination from 'sanar-ui/dist/Components/Atoms/Pagination'
import ESCarousel from 'sanar-ui/dist/Components/Atoms/Carousel'
import ESDivider from 'sanar-ui/dist/Components/Atoms/Divider'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESCardInfo from 'sanar-ui/dist/Components/Molecules/CardInfo'
import ESCardCourseModule from 'sanar-ui/dist/Components/Molecules/CardCourseModule'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import {
    ESRadioGroup,
    ESRadioButton
} from 'sanar-ui/dist/Components/Atoms/Radio'

import { modules, courseFeatures } from './mocks'
import { useTranslation } from 'react-i18next'

const responsive = [
    {
        breakpoint: 2500,
        settings: {
            slidesToShow: 3,
            variableWidth: true,
            arrows: true
        }
    },
    {
        breakpoint: 1920,
        settings: {
            slidesToShow: 3,
            variableWidth: true,
            arrows: true
        }
    },
    {
        breakpoint: 1280,
        settings: {
            variableWidth: true,
            slidesToShow: 2,
            arrows: true
        }
    },
    {
        breakpoint: 992,
        settings: {
            variableWidth: true,
            arrows: false
        }
    }
]

const SANCourseModules = () => {
    const { t } = useTranslation('esanar')

    return (
        <div className='san-tab-course-content__modules pt-md pb-lg'>
            <SANPortalPagesContainer>
                <ESRow type='flex' align='middle' gutter={24}>
                    <ESCol xs={24} md={10} lg={9} xxl={8}>
                        <ESSessionTitle
                            className='san-tab-course-content__modules--module-feature'
                            title={t(
                                'courseDetails.tabContent.modules.whatCourseHas'
                            )}
                            subtitle={t(
                                'courseDetails.tabContent.modules.whatCourseHasSubtitle'
                            )}
                        />
                    </ESCol>
                    <ESCol xs={24} md={14} lg={15} xxl={16}>
                        <ESCarousel
                            slidesToScroll={1}
                            infinite={false}
                            dots={false}
                            draggable
                            responsive={responsive}
                        >
                            {courseFeatures.map((course, index) => (
                                <ESCardInfo
                                    key={index}
                                    image={course.image}
                                    count={course.count}
                                    limit={course.limit}
                                    text={course.text}
                                />
                            ))}
                        </ESCarousel>
                    </ESCol>
                </ESRow>

                <ESDivider className='san-tab-course-content__modules--divider' />

                <ESSessionTitle
                    title={`42 ${t(
                        'courseDetails.tabContent.modules.pluralName'
                    )}`}
                    extraOnLeft
                    extra={
                        <ESRadioGroup defaultValue='all' blocks>
                            <ESRadioButton value='all'>
                                {t(
                                    'courseDetails.tabContent.modules.status.all'
                                )}
                            </ESRadioButton>
                            <ESRadioButton value='done'>
                                {t(
                                    'courseDetails.tabContent.modules.status.done'
                                )}
                            </ESRadioButton>
                            <ESRadioButton value='incomplete'>
                                {t(
                                    'courseDetails.tabContent.modules.status.incomplete'
                                )}
                            </ESRadioButton>
                        </ESRadioGroup>
                    }
                />

                <ESRow gutter={24}>
                    {modules.map((item, index) => {
                        return (
                            <ESCol key={index} xs={12} md={8} lg={8} xl={6}>
                                <ESCardCourseModule
                                    className='san-tab-course-content__continue--card'
                                    moduleName={`${t(
                                        'courseDetails.tabContent.modules.singularName'
                                    )} ${item.module_reference}`}
                                    title={item.title}
                                    badge={`${item.progress.done}/${
                                        item.progress.total
                                    }`}
                                    progress={item.workload}
                                    actionName={
                                        <span className='san-tab-course-content__modules--card-action'>
                                            {t(
                                                'courseDetails.tabContent.cardModuleAction'
                                            )}
                                        </span>
                                    }
                                    moduleTime='30min'
                                    image={item.thumbnail}
                                />
                            </ESCol>
                        )
                    })}
                </ESRow>
                <ESPagination pageSize={12} current={1} total={200} />
            </SANPortalPagesContainer>
        </div>
    )
}

export default SANCourseModules
