import React, { useContext, createContext, useEffect, useState } from 'react'

import { useApolloClient } from '@apollo/react-hooks'

import { useLayoutContext } from 'Pages/Private/Layout/Context'
import { CREATE_PROGRESS } from 'Apollo/Classroom/Mutations/create-progress'
import {
    GET_LESSON,
    ILessonQuery,
    ILesson
} from 'Apollo/Classroom/Queries/lesson'

interface IRMClassroomProviderValue {
    handleProgress: (data: IDataProgress) => void
    lesson: ILesson
}

interface IDataProgress {
    timeInSeconds?: number
    percentage: number
    resourceId: string
    resourceType: 'Video' | 'Quiz'
}

const Context = createContext<IRMClassroomProviderValue>({} as any)
export const useClassroomContext = () => useContext(Context)

const RMClassroomProvider: React.FC = ({ children }) => {
    const client = useApolloClient()
    const [lesson, setLesson] = useState<ILesson>({
        id: '',
        title: '',
        subSpecialty: {
            id: '',
            specialty: {
                id: '',
                name: ''
            }
        }
    })
    const { setMenuTab, params } = useLayoutContext()

    const handleProgress = async (data: IDataProgress) =>
        await client.mutate({
            mutation: CREATE_PROGRESS,
            variables: data
        })

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const {
                    data: { lesson }
                } = await client.query<ILessonQuery>({
                    query: GET_LESSON,
                    variables: {
                        id: params.lessonId
                    }
                })
                setLesson(lesson)
            } catch {}
        }
        !!params.lessonId && fetchLesson()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.lessonId])

    useEffect(() => {
        setMenuTab(2)
        return () => {
            setMenuTab(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value: IRMClassroomProviderValue = {
        handleProgress,
        lesson
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default RMClassroomProvider
