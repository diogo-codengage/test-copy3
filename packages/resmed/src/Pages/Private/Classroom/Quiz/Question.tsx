import React, { useState, useMemo, useRef, memo } from 'react'

import styled from 'styled-components'
import { theme } from 'styled-tools'
import { useApolloClient } from '@apollo/react-hooks'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANRow,
    SANCol,
    SANBox,
    SANTypography,
    SANQuestion,
    SANQuestionMap,
    SANButton,
    SANEvaIcon
} from '@sanar/components'
import { useWindowSize } from '@sanar/utils/dist/Hooks'

import RMCollection from 'Components/Collection'
import { ANSWER_MUTATION } from 'Apollo/Classroom/Mutations/answer'
import { useLayoutContext } from 'Pages/Private/Layout/Context'
import { useClassroomQuizContext } from './Context'
import { useClassroomContext } from '../Context'
import { useMainContext } from 'Pages/Private/Context'

const SANColFloat = styled(SANCol)`
    && {
        ${theme('mediaQueries.down.md')} {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: ${theme('space.sm')};
            box-shadow: 0 -1px 2px ${theme('colors.grey.4')};
            z-index: 1;
        }
    }
`

interface IParams {
    questionIndex: string
}

const RMClassroomQuizQuestion = memo<RouteComponentProps<IParams>>(
    ({
        history,
        match: {
            params: { questionIndex }
        }
    }) => {
        const client = useApolloClient()
        const { t } = useTranslation('resmed')
        const { width } = useWindowSize()
        const collectionRef = useRef<any>()
        const {
            questions,
            questionsMap,
            setQuestionsMap
        } = useClassroomQuizContext()
        const { handleProgress } = useClassroomContext()
        const { params: paramsLayout } = useLayoutContext()
        const [visible, setVisible] = useState(false)
        const [loading, setLoading] = useState(false)
        const [skipped, seSkipped] = useState(0)
        const [responses, setResponses] = useState<any[]>([])
        const { handleTrack } = useMainContext()

        const goToNext = () => {
            // if have next question on quiz go to next
            if (questions[Number(questionIndex) + 1]) {
                history.push(`./${Number(questionIndex) + 1}`)
            } else {
                const next = collectionRef.current.getNext()
                // if have next clicker go to next
                if (!!next) {
                    history.push(
                        `../../../${next.id}/video/${next.content.video.id}`
                    )
                } else {
                    // if dont have next clicker go to rating
                    history.push(`../../../avaliacao`)
                }
            }
        }

        const handleJump = () => {
            seSkipped(old => old + 1)
            goToNext()
        }

        const handleNext = () => goToNext()

        const handleConfirm = async alternativeId => {
            setLoading(true)
            const current = Number(questionIndex) + 1 - skipped
            handleProgress({
                resourceId: paramsLayout.contentId,
                resourceType: 'Quiz',
                percentage: parseInt(
                    ((current * 100) / questions.length).toString(),
                    10
                )
            })

            try {
                const {
                    data: {
                        answerQuestion: {
                            question: { comment, alternatives, id },
                            stats
                        }
                    }
                } = await client.mutate({
                    mutation: ANSWER_MUTATION,
                    variables: {
                        questionId: questions[questionIndex].id,
                        alternativeId
                    }
                })

                const correct = alternatives.data.find(
                    alternative => alternative.isCorrect
                )
                setResponses(oldResponses => [
                    ...oldResponses,
                    {
                        stats,
                        comment,
                        answer: correct.id,
                        questionId: id
                    }
                ])
                setQuestionsMap(oldMap =>
                    oldMap.map(e =>
                        e.id === id
                            ? {
                                  ...e,
                                  status:
                                      correct.id === alternativeId
                                          ? 'correct'
                                          : 'wrong'
                              }
                            : e
                    )
                )

                handleTrack('Question answered', {
                    'Specialty ID': paramsLayout.specialtyId,
                    'Subspecialty ID': paramsLayout.subspecialtyId,
                    'Lesson ID': paramsLayout.lessonId,
                    'Clicker ID': paramsLayout.collectionId,
                    'Question ID': questions[questionIndex].id,
                    Correct: correct.id === alternativeId
                })
            } catch (e) {}
            setLoading(false)
        }

        const toggleVisible = () => setVisible(oldVisible => !oldVisible)

        const onChangeCollection = collection =>
            history.push(
                `../../../${collection.id}/video/${collection.content.video.id}`
            )

        const isFull = useMemo(() => width <= 992, [width])

        return (
            <>
                <SANRow
                    type='flex'
                    align='middle'
                    justifyContent='space-between'
                >
                    <SANCol xs={24} sm={8}>
                        <SANBox
                            display='flex'
                            alignItems='center'
                            mb={{ sm: '0', _: 'md' }}
                            px={{ lg: '0', _: 'md' }}
                        >
                            <SANTypography color='white.10' level={4} mr='xs'>
                                {t('classroom.quiz.question')}{' '}
                                {Number(questionIndex) + 1}
                            </SANTypography>
                            <SANTypography color='white.5' vairnat='subtitle1'>
                                / {questions.length}
                            </SANTypography>
                        </SANBox>
                    </SANCol>
                    <SANColFloat md={8} bg='grey-solid.8'>
                        <SANBox
                            display='flex'
                            alignItems='center'
                            justifyContent={{ md: 'flex-end', _: 'center' }}
                        >
                            <SANQuestionMap
                                items={questionsMap}
                                current={questionIndex}
                                onCancel={toggleVisible}
                                visible={visible}
                            />
                            <SANButton
                                size='small'
                                variant='outlined'
                                color='light'
                                onClick={toggleVisible}
                                mr={{ lg: '0', _: 'md' }}
                            >
                                <SANEvaIcon name='map-outline' mr='xs' />
                                {t('classroom.quiz.questionMap')}
                            </SANButton>
                        </SANBox>
                    </SANColFloat>
                </SANRow>

                <SANBox mt={{ sm: '8', _: 'sm' }}>
                    <SANQuestion
                        full={isFull}
                        question={questions[questionIndex]}
                        {...responses.find(
                            res =>
                                res.questionId === questions[questionIndex].id
                        )}
                        loading={loading}
                        onConfirm={handleConfirm}
                        onJump={handleJump}
                        onNext={handleNext}
                        labelMonitor={t('global.expert')}
                    />
                </SANBox>
                <SANBox mt={{ lg: 'xl', _: '0' }} px={width > 884 && 18}>
                    <RMCollection
                        parentId={paramsLayout.lessonId}
                        value={paramsLayout.collectionId}
                        vertical={false}
                        onChange={onChangeCollection}
                        ref={collectionRef}
                    />
                </SANBox>
            </>
        )
    }
)

export default withRouter(RMClassroomQuizQuestion)
