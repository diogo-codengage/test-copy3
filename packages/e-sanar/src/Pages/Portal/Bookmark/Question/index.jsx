import React, { useState, useEffect } from 'react'

import { Mutation } from 'react-apollo'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { useAuthContext } from 'Hooks/auth'
import { useApolloContext } from 'Hooks/apollo'
import { BOOKMARKED_QUESTIONS } from 'Apollo/Bookmark/queries/bookmarkQuestion'
import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'
import { CHANGE_BOOKMARK } from 'Apollo/Bookmark/mutations/bookmark'

import ESDefaultError from 'Pages/Portal/Errors/Default'
import SANBookmarkedQuestionHeader from './Header'

const initialResponse = {
    answer: null,
    stats: null,
    comment: null
}

const SANBookmarkedQuestion = ({
    match: {
        params: { index }
    },
    history,
    onRemove
}) => {
    const { t } = useTranslation('esanar')
    const { width } = useWindowSize()
    const client = useApolloContext()
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState(null)
    const [questions, setQuestions] = useState([])
    const [total, setTotal] = useState(0)
    const [isFull, setIsFull] = useState(width <= 992)
    const [response, setResponse] = useState(initialResponse)
    const [error, setError] = useState(null)

    const { me } = useAuthContext()

    useEffect(() => {
        const fetchAllQuestions = async () => {
            setLoading(true)
            try {
                const {
                    data: {
                        bookmarksQuestions: { data, count }
                    }
                } = await client.query({
                    query: BOOKMARKED_QUESTIONS,
                    fetchPolicy: 'network-only'
                })

                const questions = data.map(({ question }) => ({
                    ...question,
                    bookmarked: true
                }))

                setQuestions(questions)
                setTotal(count)
            } catch {
                setError(true)
            }
            setLoading(false)
        }

        fetchAllQuestions()
    }, [])

    const handleNext = () => {
        setResponse(initialResponse)
        const idx =
            parseInt(index) >= total ? parseInt(index) : parseInt(index) + 1
        history.push(`/aluno/favoritos/questoes/${idx}`)
    }

    const handlePrevious = () => {
        setResponse(initialResponse)
        const idx = parseInt(index) <= 1 ? parseInt(index) : parseInt(index) - 1
        history.push(`/aluno/favoritos/questoes/${idx}`)
    }

    const handleBack = () => history.push('/aluno/favoritos')

    const handleConfirm = mutation => alternative => {
        mutation({
            variables: {
                userId: me.id,
                alternativeIds: [alternative],
                questionId: question.id
            }
        })
    }

    const callbackAnswer = ({
        questionAnswer: {
            answer: {
                question: { comments, alternatives }
            },
            stats
        }
    }) => {
        const correct = alternatives.data.find(
            alternative => alternative.correct
        )

        setResponse({
            stats: stats.alternatives,
            comment:
                comments.data && comments.data.length ? comments.data[0] : null,
            answer: correct.id
        })
    }

    useEffect(() => {
        setQuestion(questions[parseInt(index - 1)])
    }, [index, questions])

    useEffect(() => {
        setIsFull(width <= 992)
    }, [width])

    return (
        <Mutation mutation={ANSWER_MUTATION} onCompleted={callbackAnswer}>
            {(
                answerQuestion,
                { loading: loadingMutation, error: errorMutation }
            ) => {
                if (errorMutation || error) return <ESDefaultError />
                return (
                    <>
                        <SANBookmarkedQuestionHeader
                            goBack={handleBack}
                            bookmarked={question && question.bookmarked}
                            onRemove={onRemove}
                        />
                        <SANPortalPagesContainer>
                            <ESQuestion
                                full={isFull}
                                question={question}
                                onConfirm={handleConfirm(answerQuestion)}
                                onNext={handleNext}
                                onPrevious={handlePrevious}
                                loading={loading || loadingMutation}
                                isBookmarked
                                propsPrev={{
                                    disabled: parseInt(index) <= 1
                                }}
                                propsNext={{
                                    disabled: parseInt(index) >= total
                                }}
                                {...response}
                            />
                        </SANPortalPagesContainer>
                    </>
                )
            }}
        </Mutation>
    )
}

export default SANBookmarkedQuestion
