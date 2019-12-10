import React, { useEffect, useState, useMemo } from 'react'

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
import { useWindowSize } from '@sanar/utils/dist/Hooks'

import { ANSWER_MUTATION } from 'Apollo/PracticalArea/Mutations/answer'

import { useMainContext } from 'Pages/Private/Context'
import RMSubheader from './Subheader'
import RMEmpty from './Empty'
import { useQuestionsContext } from '../Context'
import { Performace } from './Subheader'

const getCorrect = alternative => alternative.isCorrect

const initialResponse = {
    comment: null,
    answer: null,
    questionId: null,
    stats: []
}

const FLXPractice = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')
    const client = useApolloClient()
    const { width } = useWindowSize()
    const { handleTrack } = useMainContext()
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
                    answerQuestion: {
                        question: { comment, alternatives, id: questionId },
                        stats
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
            handleTrack('Question answered', {
                'Question ID': state.questions[state.currentIndex].id,
                Correct: correct.id === alternativeId
            })
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
                comment,
                answer: correct.id,
                questionId,
                stats
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

    const isFull = useMemo(() => width <= 992, [width])

    if (!state.questions.length && !state.loading) {
        pauseStopwatch()
        return <RMEmpty />
    }

    return (
        <>
            <RMSubheader>
                <SANBox
                    display='flex'
                    alignItems='center'
                    justifyContent='flex-end'
                    px={{ lg: '0', _: 'md' }}
                >
                    <SANButton
                        size='small'
                        variant='text'
                        bold
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
                full={isFull}
                question={state.questions[state.currentIndex]}
                onConfirm={handleConfirm}
                onJump={handleJump}
                onNext={handleNext}
                loading={state.loading}
                labelMonitor={t('global.expert')}
                {...response}
            />
            <Performace
                display={{ _: 'flex', lg: 'none' }}
                justifyContent='space-around'
                mt='lg'
                vertical
            />
        </>
    )
}

export default withRouter(FLXPractice)
