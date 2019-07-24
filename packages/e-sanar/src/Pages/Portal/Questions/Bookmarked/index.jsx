import React, { useState, useEffect } from 'react'
import { useApolloContext } from 'Hooks/apollo'
import { GET_QUESTION } from 'Apollo/Bookmark/queries/question'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'
import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import SANBookmarkedQuestionHeader from './Header'
import { useAuthContext } from 'Hooks/auth'
import { BOOKMARKED_QUESTIONS } from 'Apollo/Bookmark/queries/bookmarkQuestion'
import { Mutation } from 'react-apollo'
import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'

const SANBookmarkedQuestion = ({
    match: {
        params: { id }
    },
    history
}) => {
    const { width } = useWindowSize()
    const client = useApolloContext()
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState(null)
    const [questions, setQuestions] = useState([])
    const [currentIdx, setCurrentIdx] = useState(0)
    const [isFull, setIsFull] = useState(width <= 992)
    const [answerQuestion, setAnswerQuestion] = useState(null)
    const [selected, setSelect] = useState(null)
    const [response, setResponse] = useState({
        answer: null,
        stats: null,
        comment: null
    })

    const { me } = useAuthContext()

    useEffect(() => {
        const fetchAllQuestions = async () => {
            const {
                data: {
                    bookmarksQuestions: { data }
                }
            } = await client.query({
                query: BOOKMARKED_QUESTIONS,
                fetchPolicy: 'network-only'
            })

            const qts = data.map(i => i.question)
            const qt = qts.find(i => i.id === id)
            const idx = qts.findIndex(i => i.id === id)

            setQuestion(qt)
            setCurrentIdx(idx)

            setQuestions(qts)

            setLoading(false)
        }

        fetchAllQuestions()
    }, [])

    useEffect(() => {
        setIsFull(width <= 992)
    }, [width])

    useEffect(() => {
        const applyIndex = () => {
            setCurrentIdx(
                questions &&
                    questions.length &&
                    questions.findIndex(i => i.resource_id === id)
            )
        }

        applyIndex()
    }, [questions])

    const handleNext = () => {
        const current = questions[currentIdx + 1]

        setQuestion(current)
        setCurrentIdx(currentIdx + 1)
    }

    const handlePrevious = () => {
        const current = questions[currentIdx - 1]

        setQuestion(current)
        setCurrentIdx(currentIdx - 1)
    }

    const handleConfirm = mutation => alternative => {
        setSelect(alternative)

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

    return (
        <Mutation mutation={ANSWER_MUTATION} onCompleted={callbackAnswer}>
            {(
                answerQuestion,
                { loading: loadingMutation, error: errorMutation }
            ) => {
                if (errorMutation) return `Error! ${errorMutation}`
                return (
                    <>
                        <SANPortalPagesContainer>
                            <SANBookmarkedQuestionHeader />
                        </SANPortalPagesContainer>
                        <SANPortalPagesContainer>
                            <ESQuestion
                                full={isFull}
                                question={question}
                                onConfirm={handleConfirm(answerQuestion)}
                                onNext={handleNext}
                                onPrevious={handlePrevious}
                                loading={loading}
                                isHistoric={true}
                                isBookmarked={true}
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
