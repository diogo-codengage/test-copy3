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

const responsive = [
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
    return (
        <div className='san-tab-course-content__modules pt-md pb-lg'>
            <SANPortalPagesContainer>
                <ESRow type='flex' gutter={24}>
                    <ESCol xs={24} md={10} lg={24} xl={9} xxl={8}>
                        <ESSessionTitle
                            title='O que esse curso possui'
                            subtitle='Tudo o que você tem acesso na plataforma'
                        />
                    </ESCol>
                    <ESCol xs={24} md={14} lg={24} xl={15} xxl={16}>
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

                <ESDivider className='mb-xl mt-xl' />

                <ESSessionTitle
                    title='42 módulos'
                    extraOnLeft
                    extra={
                        <ESRadioGroup defaultValue='all' blocks>
                            <ESRadioButton value='all'>Todos</ESRadioButton>
                            <ESRadioButton value='done'>
                                Concluídos
                            </ESRadioButton>
                            <ESRadioButton value='incomplete'>
                                Incompleto
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
                                    moduleName={`Módulo ${
                                        item.module_reference
                                    }`}
                                    title={item.title}
                                    badge={`${item.progress.done}/${
                                        item.progress.total
                                    }`}
                                    progress={item.workload}
                                    actionName='Ver aulas'
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
