import React from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom'

import RMClassroomProvider from './Context'

const renderResourceContent = type => {
    switch (type) {
        case 'video':
            return <p>Video</p>
        case 'quiz':
            return <p>questoes</p>
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
    contentId: string
}

const Wrapper = styled.div`
    background-color: ${theme('colors.grey-solid.8')};
    flex: 1;
    display: flex;
    flex-direction: column;
`

const FLXClassroom: React.FC<RouteComponentProps<IParams>> = ({
    match: { params }
}) => {
    console.log('FLXClassroom')
    return (
        <RMClassroomProvider>
            <Wrapper>{renderResourceContent(params.type)}</Wrapper>
        </RMClassroomProvider>
    )
}

export default withRouter(FLXClassroom)
