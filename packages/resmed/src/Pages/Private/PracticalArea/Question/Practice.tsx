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

import { ANSWER_MUTATION } from 'Apollo/PracticalArea/Mutations/answer'

import RMSubheader from './Subheader'
import RMEmpty from './Empty'
import { useQuestionsContext } from '../Context'

const getCorrect = alternative => alternative.correct

const initialResponse = {
    comment: null,
    answer: null,
    questionId: null
}

const FLXPractice = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')
    const client = useApolloClient()
    const snackbar = useSnackbarContext()
    const {
        startStopwatch,
        pauseStopwatch,
        state,
        dispatch
    } = useQuestionsContext()
    const [response, setResponse] = useState(initialResponse)

    const handleConfirm = async alternativeId => {
        pauseStopwatch()
        dispatch({ type: 'loading' })
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
                    questionId: state.questions[state.currentIndex]['id'],
                    alternativeId
                }
            })

            const correct = alternatives.data.find(getCorrect)
            if (correct.id === alternativeId) {
                dispatch({
                    type: 'stats',
                    stats: {
                        correct: state.stats.correct + 1
                    }
                })
            } else {
                dispatch({
                    type: 'stats',
                    stats: {
                        wrong: state.stats.wrong + 1
                    }
                })
            }

            setResponse({
                comment:
                    comments.data && comments.data.length
                        ? comments.data[0]
                        : null,
                answer: correct.id,
                questionId
            })
            dispatch({ type: 'loaded' })
        } catch (error) {
            dispatch({
                type: 'error',
                error
            })
            snackbar({
                message: t('practicalArea.question.failReplyQuestion'),
                theme: 'error'
            })
        }
    }

    const handleJump = () => {
        dispatch({
            type: 'stats',
            stats: {
                skipped: state.stats.skipped + 1
            }
        })
        handleNext()
    }

    const handleNext = () => {
        window.scrollTo(0, 0)
        dispatch({
            type: 'next'
        })
        setResponse(initialResponse)
        startStopwatch()
    }

    useEffect(() => {
        startStopwatch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!state.questions.length && !state.loading) {
        pauseStopwatch()
        return <RMEmpty />
    }

    return (
        <>
            <RMSubheader>
                <SANBox display='flex' alignItems='center'>
                    <SANButton
                        size='small'
                        variant='text'
                        bold
                        ml='xl'
                        onClick={() => history.push('./filtro')}
                    >
                        <SANEvaIcon
                            name='options-2-outline'
                            fontSize='lg'
                            mr='xs'
                        />
                        {t('practicalArea.question.filters')}
                    </SANButton>
                </SANBox>
            </RMSubheader>
            <SANQuestion
                question={state.questions[state.currentIndex]}
                onConfirm={handleConfirm}
                onJump={handleJump}
                onNext={handleNext}
                loading={state.loading}
                {...response}
            />
        </>
    )
}

export default withRouter(FLXPractice)
