import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Mutation } from 'react-apollo'
import { useTranslation } from 'react-i18next'

import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

import { ANSWER_MUTATION } from 'Apollo/Questions/mutations/answer'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

import SANEmptyQuestions from './Empty'
import SANSubheader from './Subheader'
import { useQuestionsContext } from '../Context'
import { useAuthContext } from 'Hooks/auth'
import { useLayoutContext } from '../../Layout/Context'

const initialState = {
    answer: null,
    stats: null,
    comment: null
}

const SANQuestionPage = ({ history }) => {
    const {
        setSkippedQuestions,
        setWrongQuestions,
        setCorrectQuestions,
        stopwatchRef,
        setCurrentIndex,
        firstLoad,
        setQuestions,
        questions,
        error
    } = useQuestionsContext()

    const { setPageContext } = useLayoutContext()

    const { t } = useTranslation('esanar')
    const { width } = useWindowSize()
    const [isFull, setIsFull] = useState(width <= 992)
    const [response, setResponse] = useState(initialState)
    const [selected, setSelect] = useState()

    const { me } = useAuthContext()

    useEffect(() => {
        setPageContext('questionPractice')

        return () => {
            setPageContext(null)
        }
    })

    const handleConfirm = mutation => alternative => {
        pauseStopwatch()
        setSelect(alternative)
        mutation({
            variables: {
                userId: me.id,
                alternativeIds: [alternative],
                questionId: questions[0].id
            }
        })
    }

    const handleJump = () => {
        setSkippedQuestions(oldSkipped => ++oldSkipped)
        handleNext(null, true)
    }

    const handleNext = (isCorrect, isJump) => {
        window.scrollTo(0, 0)
        const newQuestions = questions.slice(1)

        setQuestions(newQuestions)
        setCurrentIndex(oldIndex => ++oldIndex)

        setResponse(initialState)
        startStopwatch()
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

        correct.id === selected
            ? setCorrectQuestions(oldCorrect => ++oldCorrect)
            : setWrongQuestions(oldWrong => ++oldWrong)

        setResponse({
            stats: stats.alternatives,
            comment:
                comments.data && comments.data.length ? comments.data[0] : null,
            answer: correct.id
        })
    }

    const pauseStopwatch = () => {
        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.pause()
        }
    }

    const startStopwatch = () => {
        if (stopwatchRef && stopwatchRef.current) {
            stopwatchRef.current.start()
        }
    }

    const seeFilter = () => {
        history.push('/aluno/banco-questoes/perguntas/filtro')
        pauseStopwatch()
    }

    useEffect(() => {
        if (
            !firstLoad &&
            questions &&
            questions.length &&
            stopwatchRef &&
            stopwatchRef.current
        ) {
            stopwatchRef.current.start()
        }
    }, [stopwatchRef, questions, firstLoad])

    useEffect(() => {
        setIsFull(width <= 992)
    }, [width])

    if (!error && !firstLoad && (!questions || !questions.length)) {
        return <SANEmptyQuestions />
    }

    if (error) {
        return <SANErrorPiece message={t('questionBase.question.error')} />
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
                        <SANPortalPagesContainer className='without-padding'>
                            <SANSubheader>
                                <div className='questions-question__subheader--actions'>
                                    {/*
                                        Diogo Biz - 05/02/2020 FD-1024
                                        Remover favoritos
                                    */}
                                    {/* <ESButton
                                        size='small'
                                        variant='text'
                                        bold
                                        onClick={handleBookmark}
                                    >
                                        {bookmarked ? (
                                            <ESEvaIcon
                                                name='heart'
                                                color='primary'
                                                key='quiz-bookmarked'
                                            />
                                        ) : (
                                            <ESEvaIcon
                                                name='heart-outline'
                                                key='quiz-not-bookmarked'
                                            />
                                        )}
                                        {t(
                                            'questionBase.question.saveQuestion'
                                        )}
                                    </ESButton> */}
                                    <ESButton
                                        size='small'
                                        variant='text'
                                        bold
                                        onClick={seeFilter}
                                        className='pl-sm pr-sm'
                                    >
                                        <ESEvaIcon name='options-2-outline' />
                                        {t('questionBase.question.seeFilters')}
                                    </ESButton>
                                    <ESButton
                                        size='small'
                                        variant='text'
                                        circle
                                    >
                                        <ESEvaIcon name='more-vertical-outline' />
                                    </ESButton>
                                </div>
                            </SANSubheader>
                        </SANPortalPagesContainer>
                        <SANPortalPagesContainer className='without-padding'>
                            <ESQuestion
                                full={isFull}
                                question={questions && questions[0]}
                                onConfirm={handleConfirm(answerQuestion)}
                                onJump={handleJump}
                                onNext={handleNext}
                                loading={firstLoad || loadingMutation}
                                {...response}
                            />
                        </SANPortalPagesContainer>
                    </>
                )
            }}
        </Mutation>
    )
}

SANQuestionPage.propTypes = {
    question: PropTypes.any
}

export default SANQuestionPage
