import React from 'react'

import ESPracticeCompleted from 'sanar-ui/dist/Components/Organisms/PracticeCompleted'
import {
    esUtilConvertSecondsToTime,
    esConvertFormattedTimeToSeconds
} from 'sanar-ui/dist/Util/Date'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

const SANQuizFinalized = ({ correct, wrong, skipped, total, time }) => {
    const getAverageTime = time =>
        esUtilConvertSecondsToTime(
            (esConvertFormattedTimeToSeconds(time) / total).toFixed(0)
        )

    const summary = {
        correct: parseInt((correct * 100) / total),
        wrong: parseInt((wrong * 100) / total),
        skipped: parseInt((skipped * 100) / total),
        sawQuestions: total,
        elapsedTime: time || '00:00',
        averageQuestionTime: getAverageTime(time || '00:00')
    }

    return (
        <SANPortalPagesContainer className='video-quiz__finalized'>
            <ESPracticeCompleted values={summary} className='mb-xl mt-sm' />
        </SANPortalPagesContainer>
    )
}

export default SANQuizFinalized
