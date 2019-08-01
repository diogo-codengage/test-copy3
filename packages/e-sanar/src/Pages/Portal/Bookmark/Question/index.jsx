import React, { useState, useEffect } from 'react'

import { Mutation } from 'react-apollo'

import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { useAuthContext } from 'Hooks/auth'
import { useApolloContext } from 'Hooks/apollo'
import { BOOKMARKED_QUESTIONS } from 'Apollo/Bookmark/queries/bookmarkQuestion'
import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'

import ESDefaultError from 'Pages/Portal/Errors/Default'
import SANBookmarkedQuestionHeader from './Header'
import { useBookmarksContext } from '../Context'

const initialResponse = {
    answer: null,
    stats: null,
    comment: null
}

const SANBookmarkedQuestion = ({
    match: {
        params: { index }
    },
    history
}) => {
    const { width } = useWindowSize()
    const client = useApolloContext()
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState(null)
    const [questions, setQuestions] = useState([])
    const [total, setTotal] = useState(0)
    const [isFull, setIsFull] = useState(width <= 992)
    const [response, setResponse] = useState(initialResponse)
    const [error, setError] = useState(null)
    const { onRemove } = useBookmarksContext()

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleRemove = () =>
        onRemove({ id: question.id, resourceType: 'Question' })

    useEffect(() => {
        setQuestion(questions[parseInt(index - 1)])
    }, [index, questions])

    useEffect(() => {
        setIsFull(width <= 992)
    }, [width])

    return (
        <div className='san-bookmark-page__question'>
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
                                onRemove={handleRemove}
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
        </div>
    )
}

export default SANBookmarkedQuestion
