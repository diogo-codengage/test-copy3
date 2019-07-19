import React, { useState, useEffect } from 'react'
import { useApolloContext } from 'Hooks/apollo'
import { GET_QUESTION } from 'Apollo/Bookmark/queries/question'
import SANPortalPagesContainer from 'Pages/Portal/Layout/Container'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'
import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import SANBookmarkedQuestionHeader from './Header'

const SANBookmarkedQuestion = ({
    match: {
        params: { id }
    }
}) => {
    const { width } = useWindowSize()
    const client = useApolloContext()
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState(null)
    const [isFull, setIsFull] = useState(width <= 992)
    const [answerQuestion, setAnswerQuestion] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await client.query({
                    query: GET_QUESTION,
                    fetchPolicy: 'network-only',
                    variables: { questionId: id }
                })

                const {
                    data: { question }
                } = result

                setQuestion(question)
                setLoading(false)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        setIsFull(width <= 992)
    }, [width])

    const handleNext = () => {}

    const handleJump = () => {}

    const handleConfirm = () => {}

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
                    onJump={handleJump}
                    onNext={handleNext}
                    loading={loading}
                />
            </SANPortalPagesContainer>
        </>
    )
}

export default SANBookmarkedQuestion
