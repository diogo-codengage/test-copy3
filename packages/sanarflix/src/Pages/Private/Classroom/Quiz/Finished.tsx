import React from 'react'

import { SANPracticeCompleted } from '@sanar/components'
import {
    esUtilConvertSecondsToTime,
    esConvertFormattedTimeToSeconds
} from 'sanar-ui/dist/Util/Date'

import { useClassroomQuizContext } from './Context'

const FLXClassRoomQuizFinished = () => {
    const {
        stats: { correct = 0, wrong = 0, skipped = 0, total = 0, time = 0 }
    } = useClassroomQuizContext()
    const getAverageTime = time =>
        esUtilConvertSecondsToTime(
            (esConvertFormattedTimeToSeconds(time) / Number(total)).toFixed(0)
        )

    const summary = {
        correct: Math.round((correct * 100) / total),
        wrong: Math.round((wrong * 100) / total),
        skipped: Math.round((skipped * 100) / total),
        sawQuestions: total,
        elapsedTime: time || '00:00',
        averageQuestionTime: getAverageTime(time || '00:00')
    }

    return <SANPracticeCompleted values={summary} />
}

export default FLXClassRoomQuizFinished
