import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import SANPracticeCompletedHeader from './Header'
import ESPracticeCompleted from 'sanar-ui/dist/Components/Organisms/PracticeCompleted'
import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { useQuestionsContext } from '../Context'
import {
    esUtilConvertSecondsToTime,
    esConvertFormattedTimeToSeconds
} from 'sanar-ui/dist/Util/Date'
import { message } from 'antd'

const SANPracticeCompletedPage = ({ history }) => {
    const {
        calcPercent,
        totalAnsweredQuestions,
        stopwatchRef,
        reset
    } = useQuestionsContext()

    useEffect(() => {
        if (totalAnsweredQuestions === 0) {
            message.warning(
                'Você não iniciou nenhuma prática ou não respondeu nenhuma questão. Por favor, inicie uma nova.'
            )
            history.push('./filtro')
        }
    })

    useEffect(() => {
        return () => {
            reset()
        }
    })

    const getAverageTime = time =>
        esUtilConvertSecondsToTime(
            (
                esConvertFormattedTimeToSeconds(time) / totalAnsweredQuestions
            ).toFixed(0)
        )

    const summary = {
        correct: parseInt(calcPercent('correct')),
        wrong: parseInt(calcPercent('wrong')),
        skipped: parseInt(calcPercent('skipped')),
        sawQuestions: totalAnsweredQuestions,
        elapsedTime:
            stopwatchRef && stopwatchRef.current
                ? stopwatchRef.current.time()
                : '0',
        averageQuestionTime:
            stopwatchRef && stopwatchRef.current
                ? getAverageTime(stopwatchRef.current.time())
                : '0'
    }

    return (
        <div className='san-practice-completed'>
            <SANPracticeCompletedHeader />

            <div className='san-practice-completed__content'>
                <SANPortalPagesContainer>
                    <ESPracticeCompleted values={summary} />
                </SANPortalPagesContainer>
            </div>
        </div>
    )
}

export default withRouter(SANPracticeCompletedPage)
