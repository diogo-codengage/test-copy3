import React from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import {
    SANHeader,
    SANTabs,
    SANTabPane,
    SANTypography
} from '@sanar/components'

import FLXCoursesList from './List'

const tags = [
    {
        id: 1,
        name: 'Todos os Cursos'
    },
    {
        id: 2,
        name: 'Ciclo Básico'
    },
    {
        id: 3,
        name: 'Clínica Cirúrgica'
    },
    {
        id: 4,
        name: 'Clínica Médica'
    },
    {
        id: 5,
        name: 'Ginecologia e Obstetrícia'
    },
    {
        id: 6,
        name: 'Pediatria'
    }
]

const renderTab = (tag, index) => (
    <SANTabPane
        tab={
            <SANTypography variant='subtitle2' strong>
                {tag.name}
            </SANTypography>
        }
        key={index}
    >
        <FLXCoursesList id={tag.id} />
    </SANTabPane>
)

const FLXCourses: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    return (
        <>
            <SANHeader
                onBack={() => history.goBack()}
                SessionTitleProps={{
                    title: t('courses.title'),
                    subtitle: t('courses.subtitle')
                }}
            />
            <SANTabs defaultActiveKey='0' center flex='1' overflow={false}>
                {tags.map(renderTab)}
            </SANTabs>
        </>
    )
}

export default withRouter(FLXCourses)
