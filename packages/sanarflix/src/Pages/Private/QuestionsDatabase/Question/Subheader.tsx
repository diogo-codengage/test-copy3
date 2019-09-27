import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANTypography, SANBox, SANCircleProgress } from '@sanar/components'
import { ISANCircleProgressProps } from '@sanar/components/dist/Components/Molecules/CircleProgress'

import { useQuestionsContext } from '../Context'

interface IIndicator extends ISANCircleProgressProps {
    text: string
    percent: number
}

const Indicator = ({ text, percent, status }: IIndicator) => (
    <SANBox display='flex' alignItems='center' mr='xl'>
        <SANTypography variant='body2' mr='md'>{`${text}:`}</SANTypography>
        <SANCircleProgress
            percent={percent}
            showInfo={true}
            status={status}
            strokeLinecap='square'
            width={44}
            strokeWidth={6}
        />
    </SANBox>
)

const FLXSubheader: React.FC = ({ children }) => {
    const { t } = useTranslation('sanarflix')
    const { calcPercent } = useQuestionsContext()

    return (
        <SANBox
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            mb='7'
        >
            <SANBox display='flex' alignItems='center'>
                <Indicator
                    text={t('questionsDatabase.question.corrects')}
                    percent={calcPercent('correct')}
                    status='success'
                />
                <Indicator
                    text={t('questionsDatabase.question.wrong')}
                    percent={calcPercent('wrong')}
                    status='error'
                />
                <Indicator
                    text={t('questionsDatabase.question.skipped')}
                    percent={calcPercent('skipped')}
                />
            </SANBox>
            {children}
        </SANBox>
    )
}

export default FLXSubheader
