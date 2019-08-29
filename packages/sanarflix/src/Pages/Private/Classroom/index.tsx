import React from 'react'

import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'

import FLXClassroomProvider from './Context'

const renderResourceContent = type => {
    switch (type) {
        case 'video':
            return <div>video</div>
        case 'documento':
            return <div>Document</div>
        case 'questao':
            return <div>Quiz</div>
        default:
            return <Redirect to='/portal/inicio' />
    }
}

interface IParams {
    contentId: string
    themeId: string
    type: string
}

const FLXCourses: React.FC<RouteComponentProps<IParams>> = ({
    match: { params }
}) => {
    return (
        <FLXClassroomProvider>
            {renderResourceContent(params.type)}
        </FLXClassroomProvider>
    )
}

export default withRouter(FLXCourses)
