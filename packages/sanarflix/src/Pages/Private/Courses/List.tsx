import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import {
    color,
    flex,
    layout,
    ColorProps,
    FlexProps,
    LayoutProps
} from 'styled-system'

import {
    SANLayoutContainer,
    SANCardCourseModule,
    SANInfiniteScroll,
    SANSessionTitle,
    SANRow,
    SANCol
} from '@sanar/components'

import i18n from 'sanar-ui/dist/Config/i18n'
import { SANStyled } from '@sanar/components/dist/Theme'

import { FLXCompletenessFilters } from 'Components/CompletenessFilters'

const mock = [
    {
        id: 1,
        name: 'Anatomia do Sistema Locomotor',
        progress: 60
    },
    {
        id: 2,
        name: 'Anatomia dos Órgãos e Sistemas',
        progress: 100
    },
    { id: 3, name: 'Antibioticoterapia', progress: 100 },
    { id: 4, name: 'Biofísica', progress: 60 },
    { id: 5, name: 'Biologia Molecular e Celular', progress: 60 },
    { id: 6, name: 'Bioquímica', progress: 0 },
    { id: 7, name: 'Eletrocardiograma (ECG)', progress: 60 },
    { id: 8, name: 'Embriologia', progress: 50 },
    { id: 9, name: 'Exames Laboratoriais', progress: 25 },
    { id: 10, name: 'Farmacologia', progress: 37 },
    { id: 11, name: 'Medicina Preventiva', progress: 8 },
    { id: 12, name: 'Microbiologia', progress: 20 },
    { id: 13, name: 'Exames Laboratoriais', progress: 96 },
    { id: 14, name: 'Farmacologia', progress: 44 },
    { id: 15, name: 'Medicina Preventiva', progress: 29 },
    { id: 16, name: 'Microbiologia', progress: 2 },
    { id: 17, name: 'Exames Laboratoriais', progress: 1 },
    { id: 18, name: 'Farmacologia', progress: 8 },
    { id: 19, name: 'Medicina Preventiva', progress: 17 },
    { id: 20, name: 'Microbiologia - 1', progress: 15 },
    { id: 21, name: 'Microbiologia - 2', progress: 15 },
    { id: 22, name: 'Microbiologia - 3', progress: 15 },
    { id: 23, name: 'Microbiologia - 4', progress: 15 },
    { id: 24, name: 'Microbiologia - 5', progress: 15 }
]

const getMock = ({ limit = 12, offset = 0 }) =>
    mock.slice(offset, offset + limit)

const Box: React.FC<ColorProps & FlexProps & LayoutProps> = SANStyled.div`
    ${color}
    ${flex}
    ${layout}
`

const renderCourse = (course: any) => (
    <SANCol key={course.id} xs={12} lg={8} xl={6}>
        <SANCardCourseModule
            mb='xl'
            image='https://www.tmlawyers.com/wp-content/uploads/2018/11/data-breach-min-2-232x128.jpg'
            title={`${course.name} - ${course.id}`}
            progress={course.progress}
            badge={`${course.progress}%`}
            actionName={i18n.t('sanarflix:courses.viewCourse')}
        />
    </SANCol>
)

const FLXCoursesList: React.FC<{ id?: string }> = () => {
    const { t } = useTranslation('sanarflix')
    const [courses, setCourses] = useState<Object[]>([])

    const loadMore = (page: number) => {
        setTimeout(() => {
            const res = getMock({ offset: courses.length })
            setCourses(old => [...old, ...res])
        }, 500)
    }

    return (
        <Box bg='grey-solid.1' flex='1' height='100%'>
            <SANLayoutContainer pt={8} pb={7}>
                <SANSessionTitle
                    title={t('courses.subheader.keyWithCount', {
                        count: 60
                    })}
                    extra={<FLXCompletenessFilters defaultValue={1} />}
                    extraOnLeft
                    m='0'
                />
            </SANLayoutContainer>
            <SANLayoutContainer pb={7}>
                <SANInfiniteScroll
                    useWindow={false}
                    threshold={204}
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={courses.length < 36}
                >
                    <SANRow gutter={24}>{courses.map(renderCourse)}</SANRow>
                </SANInfiniteScroll>
            </SANLayoutContainer>
        </Box>
    )
}

export default FLXCoursesList
