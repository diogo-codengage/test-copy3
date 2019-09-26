import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANBox,
    SANButton,
    SANEvaIcon,
    SANQuestion,
    useSnackbarContext
} from '@sanar/components'

import { GET_QUESTIONS } from 'Apollo/QuestionsDatabase/Queries/questions'
import { ANSWER_MUTATION } from 'Apollo/QuestionsDatabase/Mutations/answer'
import { CREATE_BOOKMARK } from 'Apollo/Classroom/Mutations/bookmark'

import FLXSubheader from './Subheader'
import FLXEmpty from './Empty'
import { useQuestionsContext } from '../Context'

const getId = e => e.value

const getCorrect = alternative => alternative.correct

const initialResponse = {
    comment: null,
    answer: null,
    questionId: null
}

const FLXPractice = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')
    const client = useApolloClient()
    const snackbar = useSnackbarContext()
    const {
        filter,
        currentIndex,
        setCurrentIndex,
        startStopwatch,
        pauseStopwatch,
        setStats
    } = useQuestionsContext()
    const [loading, setLoading] = useState(false)
    const [bookmarked, setBookmark] = useState(false)
    const [response, setResponse] = useState(initialResponse)
    const [questions, setQuestions] = useState([])

    const handleConfirm = async alternativeId => {
        pauseStopwatch()
        setLoading(true)
        try {
            const {
                data: {
                    questionAnswer: {
                        answer: {
                            question: { comments, alternatives, id: questionId }
                        }
                    }
                }
            } = await client.mutate({
                mutation: ANSWER_MUTATION,
                variables: {
                    questionId: questions[currentIndex]['id'],
                    alternativeId
                }
            })

            const correct = alternatives.data.find(getCorrect)
            if (correct.id === alternativeId) {
                setStats(oldStats => ({
                    ...oldStats,
                    correct: oldStats.correct + 1
                }))
            } else {
                setStats(oldStats => ({
                    ...oldStats,
                    wrong: oldStats.wrong + 1
                }))
            }

            setResponse({
                comment:
                    comments.data && comments.data.length
                        ? comments.data[0]
                        : null,
                answer: correct.id,
                questionId
            })
        } catch (e) {
            snackbar({
                message: t('questionsDatabase.question.failReplyQuestion'),
                theme: 'error'
            })
        }
        setLoading(false)
    }

    const handleJump = () => {
        setStats(oldStats => ({
            ...oldStats,
            skipped: oldStats.skipped + 1
        }))
        handleNext()
    }

    const handleNext = () => {
        window.scrollTo(0, 0)
        setCurrentIndex(old => old + 1)
        setResponse(initialResponse)
        startStopwatch()
    }

    const handleBookmark = async () => {
        try {
            setBookmark(old => !old)
            await client.mutate({
                mutation: CREATE_BOOKMARK,
                variables: {
                    resourceId: questions[0]['id'],
                    resourceType: 'Question'
                }
            })
        } catch {
            setBookmark(questions[currentIndex]['bookmarked'])
            snackbar({
                message: t('questionsDatabase.question.failHandleBookmark'),
                theme: 'error'
            })
        }
    }

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true)
            const { selectedCourses, selectedThemes } = filter
            const courseIds =
                !!selectedCourses.length && selectedCourses.map(getId)
            const levelIds =
                !!selectedThemes.length && selectedThemes.map(getId)
            try {
                const {
                    data: { questions }
                } = await client.query({
                    query: GET_QUESTIONS,
                    variables: {
                        ...(!!courseIds && { courseIds }),
                        ...(!!levelIds && { levelIds }),
                        limit: 20
                    }
                })
                setQuestions(questions.data)
                setStats(oldStats => ({
                    ...oldStats,
                    total: questions.count
                }))
            } catch (error) {}
            setLoading(false)
        }
        fetchQuestions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter])

    useEffect(() => {
        if (questions && questions.length) {
            setBookmark(questions[currentIndex]['bookmarked'])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, questions])

    useEffect(() => {
        startStopwatch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!questions.length && !loading) {
        pauseStopwatch()
        return <FLXEmpty />
    }
    return <FLXEmpty />

    return (
        <>
            <FLXSubheader>
                <SANBox display='flex' alignItems='center'>
                    <SANButton
                        size='small'
                        variant='text'
                        bold
                        onClick={handleBookmark}
                    >
                        {bookmarked ? (
                            <SANEvaIcon
                                name='heart'
                                color='primary'
                                fontSize='lg'
                                mr='xs'
                            />
                        ) : (
                            <SANEvaIcon
                                name='heart-outline'
                                fontSize='lg'
                                mr='xs'
                            />
                        )}
                        {t('questionsDatabase.question.saveQuestion')}
                    </SANButton>
                    <SANButton
                        size='small'
                        variant='text'
                        bold
                        ml='xl'
                        onClick={() =>
                            history.push(
                                '/portal/banco-questoes/perguntas/filtro'
                            )
                        }
                    >
                        <SANEvaIcon
                            name='options-2-outline'
                            fontSize='lg'
                            mr='xs'
                        />
                        {t('questionsDatabase.question.seeFilters')}
                    </SANButton>
                </SANBox>
            </FLXSubheader>
            <SANQuestion
                question={questions[currentIndex]}
                onConfirm={handleConfirm}
                onJump={handleJump}
                onNext={handleNext}
                loading={loading}
                {...response}
            />
        </>
    )
}

export default withRouter(FLXPractice)
