import React from 'react'
import { RouteComponentProps } from 'react-router'
import { VideoParams } from './QuestionsContext'
import { QuestionsPage } from './QuestionsPage'

interface IRouteProps {
    videoParams
}

interface IProps extends RouteComponentProps<IRouteProps> {
}

export const QuestionsFromCoursePage: React.FC<IProps> = (props) => {
    let course: VideoParams = null
    if (props.match.params.videoParams) {
        course = JSON.parse(atob(props.match.params.videoParams))
    }
    return <QuestionsPage course={course}/>
}