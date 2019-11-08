import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANTypography, SANBox, SANCircleProgress } from '@sanar/components'

import { useQuestionsContext } from '../Context'

interface IIndicator {
    text: string
    percent: number
    status?: 'normal' | 'error' | 'success' | 'warning'
}

const Indicator = ({ text, percent, status = 'normal' }: IIndicator) => (
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

const RMSubheader: React.FC = ({ children }) => {
    const { t } = useTranslation('resmed')
    const { calcPercent } = useQuestionsContext()

    return (
        <SANBox
            display='flex'
            flexDirection={{ _: 'column-reverse', lg: 'row' }}
            alignItems={{ lg: 'center' }}
            justifyContent='space-between'
            mb='7'
        >
            <SANBox display={{ _: 'none', lg: 'flex' }} alignItems='center'>
                <Indicator
                    text={t('practicalArea.question.corrects')}
                    percent={calcPercent('correct')}
                    status='success'
                />
                <Indicator
                    text={t('practicalArea.question.wrong')}
                    percent={calcPercent('wrong')}
                    status='error'
                />
                <Indicator
                    text={t('practicalArea.question.skipped')}
                    percent={calcPercent('skipped')}
                />
            </SANBox>
            {children}
        </SANBox>
    )
}

export default RMSubheader
