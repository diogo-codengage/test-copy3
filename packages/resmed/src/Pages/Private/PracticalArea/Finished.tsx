import React, { memo } from 'react'

import { theme } from 'styled-tools'
import { useTranslation } from 'react-i18next'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import {
    SANPracticeCompleted,
    SANStyled,
    SANPage,
    SANButton,
    SANBox
} from '@sanar/components'
import {
    esUtilConvertSecondsToTime,
    esConvertFormattedTimeToSeconds
} from 'sanar-ui/dist/Util/Date'

import { useQuestionsContext } from './Context'

const SANPracticeCompletedStyled = SANStyled(SANPracticeCompleted)`
    && {
        &:before {
            background: ${theme('colors.primary-1')};
        }
    }
`

const RMClassRoomQuizFinished = memo<RouteComponentProps>(({ history }) => {
    const { t } = useTranslation('resmed')
    const {
        state: {
            stats: { time = '00:00:00' }
        },
        calcPercent,
        totalAnsweredQuestions
    } = useQuestionsContext()

    const getAverageTime = time => {
        const seconds = esConvertFormattedTimeToSeconds(time)
        return seconds
            ? esUtilConvertSecondsToTime(
                  (seconds / Number(totalAnsweredQuestions)).toFixed(0)
              )
            : time
    }

    const summary = {
        correct: calcPercent('correct'),
        wrong: calcPercent('wrong'),
        skipped: calcPercent('skipped'),
        sawQuestions: totalAnsweredQuestions,
        elapsedTime: time,
        averageQuestionTime: getAverageTime(time)
    }

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
                            blockOnlyMobile
                            size='small'
                            variant='solid'
                            color='primary'
                            onClick={() =>
                                history.push('/inicio/area-pratica/filtro')
                            }
                        >
                            {t('practicalArea.finished.button')}
                        </SANButton>
                    </SANBox>
                ),
                SessionTitleProps: {
                    title: t('practicalArea.finished.title'),
                    subtitle: t('practicalArea.finished.subtitle')
                }
            }}
        >
            <SANPracticeCompletedStyled values={summary} />
        </SANPage>
    )
})

export default withRouter(RMClassRoomQuizFinished)
