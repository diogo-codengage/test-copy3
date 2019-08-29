import React from 'react'

import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'

import FLXClassroomProvider from './Context'


const FLXClassroomVideo = React.lazy(() => import('./Video'))
const FLXClassroomDocument = React.lazy(() => import('./Document'))

const renderResourceContent = type => {
    switch (type) {
        case 'video':
            return <FLXClassroomVideo />
        case 'documento':
            return <FLXClassroomDocument />
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
