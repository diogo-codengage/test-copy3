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
        reset,
        time
    } = useQuestionsContext()

    useEffect(() => {
        if (totalAnsweredQuestions === 0) {
            message.warning(
                'Você não iniciou nenhuma prática ou não respondeu nenhuma questão. Por favor, inicie uma nova.'
            )
            history.push('./filtro')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        return () => {
            reset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAverageTime = time =>
        esUtilConvertSecondsToTime(
            (time && totalAnsweredQuestions
                ? esConvertFormattedTimeToSeconds(time) / totalAnsweredQuestions
                : 0
            ).toFixed(0)
        )

    const summary = {
        correct: parseInt(calcPercent('correct')),
        wrong: parseInt(calcPercent('wrong')),
        skipped: parseInt(calcPercent('skipped')),
        sawQuestions: totalAnsweredQuestions,
        elapsedTime: time || '0',
        averageQuestionTime: time ? getAverageTime(time) : '0'
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
