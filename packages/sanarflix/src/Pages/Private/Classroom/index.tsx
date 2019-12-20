import React, { useEffect } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'

import FLXClassroomProvider from './Context'
import { useLayoutContext, IUrlParams } from 'Pages/Layout/Context'

const FLXClassroomVideo = React.lazy(() => import('./Video'))
const FLXClassroomDocument = React.lazy(() => import('./Document'))
const FLXClassroomQuiz = React.lazy(() => import('./Quiz'))

const renderResourceContent = type => {
    switch (type) {
        case 'video':
            return <FLXClassroomVideo />
        case 'documento':
            return <FLXClassroomDocument />
        case 'questoes':
            return <FLXClassroomQuiz />
        default:
            return <Redirect to='/portal/inicio' />
    }
}

interface IParams extends IUrlParams {
    contentId: string
    themeId: string
    type: 'video' | 'documento' | 'questoes'
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
    const { setUrlParams } = useLayoutContext()

    useEffect(() => {
        setUrlParams({
            courseId: params.courseId,
            themeId: params.themeId,
            type: params.type,
            resourceId: params.resourceId
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.courseId, params.themeId, params.type, params.resourceId])

    return (
        <FLXClassroomProvider>
            <Wrapper>{renderResourceContent(params.type)}</Wrapper>
        </FLXClassroomProvider>
    )
}

export default withRouter(FLXCourses)
