import React, { useState, useMemo } from 'react'

import { useApolloClient } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANRow,
    SANCol,
    SANBox,
    SANTypography,
    SANQuestion,
    SANQuestionMap
} from '@sanar/components'

import { ANSWER_MUTATION } from 'Apollo/Classroom/Mutations/answer'

import { useClassroomQuizContext } from './Context'
import { useClassroomContext } from '../Context'

interface IParams {
    questionId: string
}

const RMClassRoomQuizQuestion = ({
    history,
    match: {
        params: { questionId }
    }
}: RouteComponentProps<IParams>) => {
    const client = useApolloClient()
    const { t } = useTranslation('resmed')
    const {
        questions,
        questionsMap,
        setQuestionsMap
    } = useClassroomQuizContext()
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [responses, setResponses] = useState<any[]>([])

    const goToNext = () => {
        questions[index + 1]
            ? history.push(`./${questions[index + 1].id}`)
            : history.push('./finalizado')
    }

    const handleJump = () => goToNext()

    const handleNext = () => goToNext()

    const handleConfirm = async alternativeId => {
        setLoading(true)

        try {
            const {
                data: {
                    questionAnswer: {
                        answer: {
                            question: { comments, alternatives, id }
                        }
                    }
                }
            } = await client.mutate({
                mutation: ANSWER_MUTATION,
                variables: {
                    questionId: questions[index].id,
                    alternativeId
                }
            })

            const correct = alternatives.data.find(
                alternative => alternative.correct
            )
            setResponses(oldResponses => [
                ...oldResponses,
                {
                    comment:
                        comments.data && comments.data.length
                            ? comments.data[0]
                            : null,
                    answer: correct.id,
                    questionId: id
                }
            ])
            setQuestionsMap(oldMap =>
                oldMap.map(e => (e.id === id ? { ...e, status: true } : e))
            )
        } catch (e) {}
        setLoading(false)
    }

    const toggleVisible = () => setVisible(oldVisible => !oldVisible)

    const index = useMemo(
        () => questions.findIndex(question => question.id === questionId),
        [questionId, questions]
    )

    return (
        <>
            <SANRow type='flex' align='middle' justifyContent='space-between'>
                <SANCol xs={24} sm={8}>
                    <SANBox
                        display='flex'
                        alignItems='center'
                        mb={{ sm: '0', _: 'md' }}
                    >
                        <SANTypography color='white.10' level={4} mr='xs'>
                            {t('classroom.quiz.question')} {index + 1}
                        </SANTypography>
                        <SANTypography color='white.5' vairnat='subtitle1'>
                            / {questions.length}
                        </SANTypography>
                    </SANBox>
                </SANCol>
                <SANCol xs={24} sm={8}>
                    <SANQuestionMap
                        items={questionsMap}
                        current={index}
                        mock
                        onCancel={toggleVisible}
                        visible={visible}
                    />
                </SANCol>
            </SANRow>

            <SANBox mt={{ sm: '8', _: 'sm' }}>
                <SANQuestion
                    question={questions[index]}
                    {...responses.find(
                        res => res.questionId === questions[index].id
                    )}
                    loading={loading}
                    onConfirm={handleConfirm}
                    onJump={handleJump}
                    onNext={handleNext}
                />
            </SANBox>
        </>
    )
}

export default withRouter(RMClassRoomQuizQuestion)
