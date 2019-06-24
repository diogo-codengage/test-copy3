import React from 'react'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESCircleProgress from 'sanar-ui/dist/Components/Atoms/CircleProgress'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

const Progress = ({ percent, status, label }) => (
    <ESCircleProgress
        strokeWidth={6}
        showInfo
        format={percent => (
            <>
                <ESTypography
                    className='mb-xxs'
                    regular
                    transform='initial'
                    variant='overline'
                >
                    {label}:
                </ESTypography>
                <ESTypography variant='caption' strong>
                    {percent}%
                </ESTypography>
            </>
        )}
        width={76}
        percent={percent}
        status={status}
    />
)

const SANQuizFinalized = ({ correct, wrong, skipped, total }) => {
    const { t } = useTranslation('esanar')
    return (
        <SANPortalPagesContainer className='video-quiz__finalized'>
            <div className='title'>
                <ESEvaIcon size='xlarge' name='checkmark-circle-outline' />
                <ESTypography level={4} regular>
                    {t('classroom.quizFinalized')}
                </ESTypography>
            </div>
            <div className='d-flex align-items-center pb-lg pt-lg pl-xs pr-xs'>
                <Progress
                    percent={(correct * 100) / total}
                    status='success'
                    label={t('classroom.correct')}
                />
                <Progress
                    percent={(wrong * 100) / total}
                    status='error'
                    label={t('classroom.wrong')}
                />
                <Progress
                    percent={(skipped * 100) / total}
                    label={t('classroom.skipped')}
                />
            </div>
        </SANPortalPagesContainer>
    )
}

SANQuizFinalized.propTypes = {
    correct: PropTypes.number.isRequired,
    wrong: PropTypes.number.isRequired,
    skipped: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
}

export default SANQuizFinalized
