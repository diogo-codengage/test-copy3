import React from 'react'

import { theme } from 'styled-tools'

import { SANPracticeCompleted, SANStyled } from '@sanar/components'
import {
    esUtilConvertSecondsToTime,
    esConvertFormattedTimeToSeconds
} from 'sanar-ui/dist/Util/Date'

import { useClassroomQuizContext } from './Context'

const SANPracticeCompletedStyled = SANStyled(SANPracticeCompleted)`
    && {
        &:before {
            background: ${theme('colors.primary-10')};
        }
    }
`

const FLXClassRoomQuizFinished = () => {
    const {
        stats: {
            correct = 0,
            wrong = 0,
            skipped = 0,
            total = 0,
            time = '00:00:00'
        }
    } = useClassroomQuizContext()
    const getAverageTime = time => {
        const seconds = esConvertFormattedTimeToSeconds(time)
        return seconds
            ? esUtilConvertSecondsToTime((seconds / Number(total)).toFixed(0))
            : time
    }

    const summary = {
        correct: Math.round((correct * 100) / total),
        wrong: Math.round((wrong * 100) / total),
        skipped: Math.round((skipped * 100) / total),
        sawQuestions: total,
        elapsedTime: time,
        averageQuestionTime: getAverageTime(time)
    }

    return <SANPracticeCompletedStyled values={summary} />
}

export default FLXClassRoomQuizFinished
