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

import { ANSWER_MUTATION } from 'Apollo/QuestionsDatabase/Mutations/answer'
import { CREATE_BOOKMARK } from 'Apollo/Classroom/Mutations/bookmark'

import { events } from 'Config/Segment'

import FLXSubheader from './Subheader'
import FLXEmpty from './Empty'
import { useQuestionsContext } from '../Context'

const getCorrect = alternative => alternative.correct

const initialResponse = {
    comment: null,
    answer: null,
    questionId: null
}

const FLXPractice = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('sanarflix')
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
                message: t('questionsDatabase.question.failReplyQuestion'),
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

    const handleBookmark = async () => {
        try {
            dispatch({
                type: 'bookmark',
                bookmarked: !state.bookmarked
            })
            await client.mutate({
                mutation: CREATE_BOOKMARK,
                variables: {
                    resourceId: state.questions[state.currentIndex]['id'],
                    resourceType: 'Question'
                }
            })
        } catch {
            dispatch({
                type: 'bookmark',
                bookmarked: state.questions[state.currentIndex]['bookmarked']
            })
            snackbar({
                message: t('questionsDatabase.question.failHandleBookmark'),
                theme: 'error'
            })
        }
    }

    useEffect(() => {
        startStopwatch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    if (!state.questions.length && !state.loading) {
        pauseStopwatch()
        return <FLXEmpty />
    }

    return (
        <>
            <FLXSubheader>
                <SANBox display='flex' alignItems='center'>
                    <SANButton
                        size='small'
                        variant='text'
                        bold
                        onClick={handleBookmark}
                    >
                        {state.bookmarked ? (
                            <SANEvaIcon
                                name='heart'
                                color='primary'
                                fontSize='lg'
                                mr='xs'
                            />
                        ) : (
                            <SANEvaIcon
                                name='heart-outline'
                                fontSize='lg'
                                mr='xs'
                            />
                        )}
                        {t('questionsDatabase.question.saveQuestion')}
                    </SANButton>
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
                        {t('questionsDatabase.question.seeFilters')}
                    </SANButton>
                </SANBox>
            </FLXSubheader>
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
