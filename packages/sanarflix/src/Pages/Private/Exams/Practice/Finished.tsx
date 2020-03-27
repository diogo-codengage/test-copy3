import React, { useCallback, useEffect } from 'react'

import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'

import {
    SANPage,
    SANBox,
    SANButton,
    SANPracticeCompleted,
    useSnackbarContext,
    SANStyled
} from '@sanar/components'

import {
    esUtilConvertSecondsToTime,
    esConvertFormattedTimeToSeconds
} from 'sanar-ui/dist/Util/Date'

import { useExamsPracticeContext } from './Context'
import { theme } from 'styled-tools'

const SANPracticeCompletedStyled = SANStyled(SANPracticeCompleted)`
    && {
        &:before {
            background: ${theme('colors.primary-10')};
        }
    }
`

const FLXExamsFinishedPractice = () => {
    const { t } = useTranslation('sanarflix')
    const snackbar = useSnackbarContext()
    const history = useHistory()

    const {
        correctAnswers,
        wrongAnswers,
        skippedAnswers,
        answers,
        stopWatchRef
    } = useExamsPracticeContext()

    const getAverageTime = useCallback(
        time => {
            if (!time) {
                return '00:00:00'
            }

            const seconds = esConvertFormattedTimeToSeconds(time)
            return seconds
                ? esUtilConvertSecondsToTime(
                      (seconds / Number(answers.length)).toFixed(0)
                  )
                : time
        },
        [answers.length]
    )

    useEffect(() => {
        if (!answers.length || !stopWatchRef) {
            history.push('/portal/provas')
            snackbar({
                message: t('exams.practice.finished.noActiveExam'),
                theme: 'error'
            })
        }
    }, [t, answers.length, history, snackbar, stopWatchRef])

    return (
        <SANPage
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: { xs: '8', _: 'md' }
            }}
            HeaderProps={{
                extra: (
                    <SANBox
                        display='flex'
                        alignItems='center'
                        justifyContent={{ sm: 'flex-end', _: 'flex-start' }}
                    >
                        <SANButton
                            uppercase
                            bold
                            size='small'
                            variant='solid'
                            color='primary'
                            onClick={() => history.push('/portal/provas')}
                        >
                            {t('exams.practice.finished.backToExams')}
                        </SANButton>
                    </SANBox>
                ),
                SessionTitleProps: {
                    title: t('exams.practice.finished.title')
                }
            }}
        >
            <SANPracticeCompletedStyled
                values={{
                    correct: correctAnswers,
                    wrong: wrongAnswers,
                    skipped: skippedAnswers,
                    sawQuestions: answers.length,
                    elapsedTime:
                        (stopWatchRef &&
                            stopWatchRef.current &&
                            stopWatchRef.current.time()) ||
                        '00:00:00',
                    averageQuestionTime: getAverageTime(
                        stopWatchRef &&
                            stopWatchRef.current &&
                            stopWatchRef.current.time()
                    )
                }}
            />
        </SANPage>
    )
}

export default FLXExamsFinishedPractice
