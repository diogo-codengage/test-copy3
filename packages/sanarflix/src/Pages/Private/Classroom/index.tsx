import React from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
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
        case 'questoes':
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

const Wrapper = styled.div`
    background-color: ${theme('colors.grey-solid.8')};
    flex: 1;
    display: flex;
    flex-direction: column;
`

const FLXCourses: React.FC<RouteComponentProps<IParams>> = ({
    match: { params }
}) => {
    return (
        <FLXClassroomProvider>
            <Wrapper>{renderResourceContent(params.type)}</Wrapper>
        </FLXClassroomProvider>
    )
}

export default withRouter(FLXCourses)
