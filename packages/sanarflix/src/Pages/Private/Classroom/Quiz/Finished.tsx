import React, { useState } from 'react'

import { theme } from 'styled-tools'
import { useTranslation } from 'react-i18next'

import {
    SANPracticeCompleted,
    SANStyled,
    SANBox,
    SANQuestionMap,
    SANButton,
    SANEvaIcon
} from '@sanar/components'
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
    const { t } = useTranslation('sanarflix')
    const {
        stats: {
            correct = 0,
            wrong = 0,
            skipped = 0,
            total = 0,
            time = '00:00:00'
        },
        questionsMap
    } = useClassroomQuizContext()
    const [visible, setVisible] = useState(false)

    const getAverageTime = time => {
        const seconds = esConvertFormattedTimeToSeconds(time)
        return seconds
            ? esUtilConvertSecondsToTime((seconds / Number(total)).toFixed(0))
            : time
    }

    const toggleVisible = () => setVisible(oldVisible => !oldVisible)

    const summary = {
        correct: Math.round((correct * 100) / total),
        wrong: Math.round((wrong * 100) / total),
        skipped: Math.round((skipped * 100) / total),
        sawQuestions: total,
        elapsedTime: time,
        averageQuestionTime: getAverageTime(time)
    }

    return (
        <SANBox>
            <SANBox
                display='flex'
                alignItems='center'
                justifyContent='center'
                mb='8'
            >
                <SANQuestionMap
                    items={questionsMap}
                    mock
                    onCancel={toggleVisible}
                    visible={visible}
                />
                <SANButton
                    size='small'
                    variant='outlined'
                    color='light'
                    onClick={toggleVisible}
                >
                    <SANEvaIcon name='map-outline' mr='xs' />
                    {t('classroom.quiz.questionMap')}
                </SANButton>
            </SANBox>
            <SANPracticeCompletedStyled values={summary} />
        </SANBox>
    )
}

export default FLXClassRoomQuizFinished