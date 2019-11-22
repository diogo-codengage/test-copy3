import React, { useEffect } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'

import { useLayoutContext } from 'Pages/Private/Layout/Context'
import RMClassroomProvider from './Context'

const RMClassroomVideo = React.lazy(() => import('./Video'))
const RMClassroomQuiz = React.lazy(() => import('./Quiz'))
const RMClassroomRating = React.lazy(() => import('./Rating'))
const RMClassroomFeedback = React.lazy(() => import('./Feedback'))

const renderResourceContent = type => {
    switch (type) {
        case 'video':
            return <RMClassroomVideo />
        case 'quiz':
            return <RMClassroomQuiz />
        case 'avaliacao':
            return <RMClassroomRating />
        case 'feedback':
            return <RMClassroomFeedback />
        default:
            return <Redirect to='/portal/curso' />
    }
}

interface IParams {
    specialtyId: string
    subspecialtyId: string
    lessonId: string
    collectionId: string
    type: 'video' | 'quiz'
    status: 'avaliacao' | 'feedback'
    contentId: string
}

const Wrapper = styled.div`
    background-color: ${theme('colors.grey-solid.8')};
    flex: 1;
    display: flex;
    flex-direction: column;
`

const RMClassroom: React.FC<RouteComponentProps<IParams>> = ({
    match: { params }
}) => {
    const { setParams } = useLayoutContext()

    useEffect(() => {
        setParams(params)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    return (
        <RMClassroomProvider>
            <Wrapper>
                {renderResourceContent(params.type || params.status)}
            </Wrapper>
        </RMClassroomProvider>
    )
}

export default withRouter(RMClassroom)
