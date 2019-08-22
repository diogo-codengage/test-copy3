import React from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import {
    SANHeader,
    SANTabs,
    SANTabPane,
    SANTypography,
    SANBox,
    SANQuery
} from '@sanar/components'

import { GET_TOPICS, ITopics, ITopic } from 'Apollo/Courses/Queries/topics'

import FLXCoursesList from './List'
import FLXCoursesProvider from './Context'

const renderTab = (topic: ITopic) => (
    <SANTabPane
        tab={
            <SANTypography variant='subtitle2' strong>
                {topic.name}
            </SANTypography>
        }
        key={topic.id}
    >
        <FLXCoursesList id={topic.id} />
    </SANTabPane>
)

const Topics = () => {
    const { t } = useTranslation('sanarflix')

    return (
        <SANQuery query={GET_TOPICS} loaderProps={{ flex: true, minHeight: 0 }}>
            {({ data }: { data: ITopics }) => (
                <SANTabs defaultActiveKey='all' flex='1' container>
                    <SANTabPane
                        tab={
                            <SANTypography variant='subtitle2' strong>
                                {t('global.allCourses')}
                            </SANTypography>
                        }
                        key='all'
                    >
                        <FLXCoursesList />
                    </SANTabPane>
                    {data.topics.data.map(renderTab)}
                </SANTabs>
            )}
        </SANQuery>
    )
}

const FLXCourses: React.FC<RouteComponentProps> = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    return (
        <FLXCoursesProvider>
            <SANBox displayFlex flexDirection='column' flex='1'>
                <SANHeader
                    onBack={() => history.goBack()}
                    SessionTitleProps={{
                        title: t('courses.title'),
                        subtitle: t('courses.subtitle')
                    }}
                />
                <Topics />
            </SANBox>
        </FLXCoursesProvider>
    )
}

export default withRouter(FLXCourses)
