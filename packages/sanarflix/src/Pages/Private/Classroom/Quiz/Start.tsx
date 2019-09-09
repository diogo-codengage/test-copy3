import React, { useEffect } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANStartQuiz } from '@sanar/components'

import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { useLayoutContext } from 'Pages/Layout/Context'
import { useAuthContext } from 'Hooks/auth'
import { useClassroomQuizContext, initialStats } from './Context'

const FLXClassRoomQuizStart = ({ history }: RouteComponentProps) => {
    const { me } = useAuthContext()
    const { width } = useWindowSize()
    const { setFooterProps } = useLayoutContext()
    const { questions, setStats } = useClassroomQuizContext()

    useEffect(() => {
        if (width <= 768) {
            setFooterProps({
                mb: 8
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width])

    useEffect(() => {
        setStats(old => ({ ...initialStats, total: old.total }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SANStartQuiz
            name={me.name}
            ButtonProps={{
                onClick: () => history.push(`./${questions[0].id}`)
            }}
        />
    )
}

export default withRouter(FLXClassRoomQuizStart)
