import React, { useState, useEffect } from 'react'
import { useApolloContext } from 'Hooks/apollo'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'
import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import SANBookmarkedQuestionHeader from './Header'
import { useAuthContext } from 'Hooks/auth'
import { BOOKMARKED_QUESTIONS } from 'Apollo/Bookmark/queries/bookmarkQuestion'
import { Mutation } from 'react-apollo'
import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'
import { CHANGE_BOOKMARK } from 'Apollo/Bookmark/mutations/bookmark'

const initialResponse = {
    answer: null,
    stats: null,
    comment: null
}

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
    const [total, setTotal] = useState(0)
    const [currentIdx, setCurrentIdx] = useState(0)
    const [isFull, setIsFull] = useState(width <= 992)
    const [response, setResponse] = useState(initialResponse)

    const { me } = useAuthContext()

    useEffect(() => {
        const fetchAllQuestions = async () => {
            const {
                data: {
                    bookmarksQuestions: { data }
                },
                count
            } = await client.query({
                query: BOOKMARKED_QUESTIONS,
                fetchPolicy: 'network-only'
            })
    
            const qts = data.map(({ question }) => {
                question.bookmarked = true
    
                return question
            })

            const qt = qts.find(i => i.id === id)
            const idx = qts.findIndex(i => i.id === id)
    
            setQuestion(qt)
            setCurrentIdx(idx)
            setQuestions(qts)
    
            console.log(qts)
            console.log(qt)
    
            setTotal(count)
    
            setLoading(false)
        }

        fetchAllQuestions()
    }, [])

    // useEffect(() => {
    //     setBookmarked(
    //         questions &&
    //             questions.length &&
    //             questions.find(i => i.id === question.id)
    //     )
    // }, [questions, question])

    useEffect(() => {
        setIsFull(width <= 992)
    }, [width])

    const handleNext = () => {
        if (currentIdx + 1 === total) return

        const current = questions[currentIdx + 1]

        setQuestion(current)
        setCurrentIdx(currentIdx + 1)
        setResponse(initialResponse)
    }

    const handlePrevious = () => {
        if (!currentIdx) return

        const current = questions[currentIdx - 1]

        setQuestion(current)
        setCurrentIdx(currentIdx - 1)
        setResponse(initialResponse)
    }

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

    const handleBack = () => history && history.goBack()

    const handleRemove = async () => {
        try {
            const q = Object.assign({}, question)
            q.bookmarked = false

            setQuestion(q)

            await client.mutate({
                mutation: CHANGE_BOOKMARK,
                variables: {
                    resourceId: question.id,
                    resourceType: 'Question',
                    userId: me.id
                }
            })
        } catch (err) {
            console.error(err)
        }
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
                            <SANBookmarkedQuestionHeader
                                goBack={handleBack}
                                bookmarked={question && question.bookmarked}
                                onRemove={handleRemove}
                            />
                        </SANPortalPagesContainer>
                        <SANPortalPagesContainer>
                            <ESQuestion
                                full={isFull}
                                question={question}
                                onConfirm={handleConfirm(answerQuestion)}
                                onNext={handleNext}
                                onPrevious={handlePrevious}
                                loading={loading || loadingMutation}
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
