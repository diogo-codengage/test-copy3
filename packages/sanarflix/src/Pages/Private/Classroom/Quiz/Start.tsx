import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANStartQuiz } from '@sanar/components'

import { useClassroomQuizContext } from './Context'

const FLXClassRoomQuizStart = ({ history }: RouteComponentProps) => {
    const { questions } = useClassroomQuizContext()

    return (
        <SANStartQuiz
            name='Diogo Biz'
            ButtonProps={{
                onClick: () => history.push(`./${questions[0].id}`)
            }}
        />
    )
}

export default withRouter(FLXClassRoomQuizStart)
