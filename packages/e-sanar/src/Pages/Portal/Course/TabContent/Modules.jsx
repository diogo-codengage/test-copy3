import React from 'react'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESPagination from 'sanar-ui/dist/Components/Atoms/Pagination'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESCardCourseModule from 'sanar-ui/dist/Components/Molecules/CardCourseModule'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import {
    ESRadioGroup,
    ESRadioButton
} from 'sanar-ui/dist/Components/Atoms/Radio'

import { modules } from './mocks'

const SANCourseModules = () => {
    return (
        <div className='san-tab-course-content__modules pt-md pb-lg'>
            <SANPortalPagesContainer>
                <ESSessionTitle
                    title='42 módulos'
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
