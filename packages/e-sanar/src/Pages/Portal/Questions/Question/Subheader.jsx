import React from 'react'

import { useTranslation } from 'react-i18next'

import ESCircleProgress from 'sanar-ui/dist/Components/Atoms/CircleProgress'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

import { useQuestionsContext } from '../Context'

const Indicator = ({ text, percent, status }) => (
    <div className='d-flex align-items-center mr-xl'>
        <ESTypography
            variant='body2'
            className='mr-md'
        >{`${text}:`}</ESTypography>
        <ESCircleProgress
            percent={percent}
            showInfo={true}
            status={status}
            strokeLinecap='square'
            width={44}
            strokeWidth={6}
        />
    </div>
)

const SANSubheader = ({ children }) => {
    const { t } = useTranslation('esanar')
    const { calcPercent } = useQuestionsContext()

    return (
        <div className='questions-question__subheader'>
            <div className='questions-question__subheader--indicators'>
                <Indicator
                    text={t('questionBase.question.corrects')}
                    percent={calcPercent('correct')}
                    status='success'
                />
                <Indicator
                    text={t('questionBase.question.wrong')}
                    percent={calcPercent('wrong')}
                    status='error'
                />
                <Indicator
                    text={t('questionBase.question.skipped')}
                    percent={calcPercent('skipped')}
                />
            </div>
            {children}
        </div>
    )
}

export default SANSubheader
