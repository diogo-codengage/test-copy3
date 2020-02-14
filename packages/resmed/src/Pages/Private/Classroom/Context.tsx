import React, { useContext, createContext, useEffect, useState } from 'react'

import { useApolloClient } from '@apollo/react-hooks'
import * as Sentry from '@sentry/browser'

import { useLayoutContext } from 'Pages/Private/Layout/Context'
import { CREATE_PROGRESS } from 'Apollo/Classroom/Mutations/create-progress'
import {
    GET_LESSON,
    ILessonQuery,
    ILesson
} from 'Apollo/Classroom/Queries/lesson'
import {
    GET_SPECIALTY,
    ISpecialtyQuery,
    ISpecialty
} from 'Apollo/Classroom/Queries/specialty'

interface IRMClassroomProviderValue {
    handleProgress: (data: IDataProgress) => Promise<any>
    lesson: ILesson
    specialty: ISpecialty
    clickerName: string
    setClickerName: React.Dispatch<React.SetStateAction<string>>
    hasQuestions: boolean
    setHasQuestions: React.Dispatch<React.SetStateAction<boolean>>
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
        title: ''
    })
    const [specialty, setSpecialty] = useState<ISpecialty>({
        id: '',
        title: ''
    })
    const [clickerName, setClickerName] = useState('')
    const [hasQuestions, setHasQuestions] = useState(false)
    const { setMenuTab, params, fetchSuggestedClass } = useLayoutContext()

    const handleProgress = (data: IDataProgress) =>
        client
            .mutate({
                mutation: CREATE_PROGRESS,
                variables: data
            })
            .catch(Sentry.captureException)

    useEffect(() => {
        const fetchSpecialtyId = async () => {
            try {
                const {
                    data: { specialty }
                } = await client.query<ISpecialtyQuery>({
                    query: GET_SPECIALTY,
                    variables: {
                        id: params.specialtyId
                    }
                })
                setSpecialty(specialty)
            } catch (error) {
                Sentry.captureException(error)
            }
        }
        !!params.specialtyId && fetchSpecialtyId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.specialtyId])

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
            } catch (error) {
                Sentry.captureException(error)
            }
        }
        !!params.lessonId && fetchLesson()
        setHasQuestions(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.lessonId])

    useEffect(() => {
        setMenuTab(2)
        return () => {
            setMenuTab(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        return fetchSuggestedClass
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value: IRMClassroomProviderValue = {
        handleProgress,
        lesson,
        specialty,
        clickerName,
        setClickerName,
        setHasQuestions,
        hasQuestions
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

export default RMClassroomProvider
