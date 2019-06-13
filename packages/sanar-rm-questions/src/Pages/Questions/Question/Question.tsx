import React, { useContext, useEffect } from 'react'
import { QuestionTemplate } from './QuestionTemplate'
import { useState } from 'react'
import { ApolloContext } from 'react-apollo'
import { GET_QUESTION } from '../../../Apollo/Questions/get-question'

interface IPros {
    questionsFilter
    isFromCourse: boolean
}

export const Question = ({ questionsFilter, isFromCourse }: IPros) => {

    const [question, setQuestion] = useState()
    const [questions, setQuestions] = useState([])
    // const [loading, setLoading] = useState(false)

    const { client } = useContext(ApolloContext)

    const pushQuestions = (moreQuestions) => {
        questions.push(...moreQuestions)
        if (!question) {
            setQuestion(questions.shift())
        }
        setQuestions(questions)
    }

    const nextQuestion = () => {
        setQuestion(questions.shift())
        if (questions.length === 1) {
            loadMoreQuestions()
        }
    }

    const loadMoreQuestions = () => {
        client.query({ query: GET_QUESTION, fetchPolicy: 'no-cache' })
            .then(({ data }) => {
                pushQuestions(data.questions.data)
                // setLoading(false)
            })
    }

    const skipQuestion = () => {
        nextQuestion()
    }

    if(!question){
        loadMoreQuestions();
    }

    return (
        <QuestionTemplate
            loading={!question}
            question={question}
            onJump={skipQuestion}
            onNext={v => console.log('onNext',{v})}
            onConfirm={v => console.log('onConfirm',{v})}
        />
    )
}
