import React, { memo } from 'react'

import { useTranslation } from 'react-i18next'

import { SANTypography, SANBox, SANCircleProgress } from '@sanar/components'

import { useQuestionsContext } from '../Context'

interface IIndicator {
    text: string
    percent: number
    status?: 'normal' | 'error' | 'success' | 'warning'
    vertical?: boolean
}

const Indicator = ({
    text,
    percent,
    status = 'normal',
    vertical = false
}: IIndicator) => (
    <SANBox
        display='flex'
        alignItems='center'
        mr={!vertical && 'xl'}
        flexDirection={vertical ? 'column' : 'row'}
    >
        <SANTypography
            variant='body2'
            mr={!vertical && 'md'}
            mb={vertical && 'sm'}
        >{`${text}:`}</SANTypography>
        <SANCircleProgress
            percent={Math.round(percent)}
            showInfo={true}
            status={status}
            strokeLinecap='square'
            width={44}
            strokeWidth={6}
        />
    </SANBox>
)

export const Performace = ({ vertical = false, ...props }) => {
    const { t } = useTranslation('resmed')
    const { calcPercent } = useQuestionsContext()
    return (
        <SANBox
            display={{ _: 'none', lg: 'flex' }}
            alignItems='center'
            {...props}
        >
            <Indicator
                text={t('practicalArea.question.corrects')}
                percent={calcPercent('correct')}
                status='success'
                vertical={vertical}
            />
            <Indicator
                text={t('practicalArea.question.wrong')}
                percent={calcPercent('wrong')}
                status='error'
                vertical={vertical}
            />
            <Indicator
                text={t('practicalArea.question.skipped')}
                percent={calcPercent('skipped')}
                vertical={vertical}
            />
        </SANBox>
    )
}

const RMSubheader = memo<{
    extra?: React.ReactNode
    children?: React.ReactNode
}>(({ children, extra }) => (
    <SANBox
        display='flex'
        flexDirection={{ _: 'column-reverse', lg: 'row' }}
        alignItems={{ lg: 'center' }}
        justifyContent='space-between'
        mb={{ lg: '7', _: 'md' }}
    >
        {!!extra ? (
            <SANBox mt={{ lg: '0', _: 'md' }}>{extra}</SANBox>
        ) : (
            <Performace />
        )}
        {children}
    </SANBox>
))

export default RMSubheader
