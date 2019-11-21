import React, { useMemo, useCallback } from 'react'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

import { useTranslation } from 'react-i18next'
import { SANButton } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANRow, SANCol } from '../Grid'

interface IQuestion {
    title: string
    percentToCorrect?: number
    corrects: number
    total: number
}

export interface ISANLessonResultProps {
    percentToCorrect?: number
    onGoPractice: () => void
    questions: IQuestion[]
}

const sumCorrects = (prev, acc) => prev + acc.corrects
const sumTotal = (prev, acc) => prev + acc.total
const hasSuccessColletion = question =>
    (question.corrects * 100) / question.total >=
    (question.percentToCorrect || 80)

const SANLessonResult = ({
    percentToCorrect = 80,
    questions,
    onGoPractice
}: ISANLessonResultProps) => {
    const { t } = useTranslation('components')
    const {
        assets: {
            lessonResult: { success: ninjaSuccess, error: ninjaError }
        }
    } = useThemeContext()

    const props = useMemo(() => {
        const corrects = questions.reduce(sumCorrects, 0)
        const total = questions.reduce(sumTotal, 0)
        const status = (corrects * 100) / total >= percentToCorrect
        if (status) {
            return {
                theme: 'success',
                title: t('lessonResult.titleSuccess'),
                image: ninjaSuccess,
                resultPerformance: t('lessonResult.performance.resultSuccess'),
                total,
                corrects
            }
        } else {
            return {
                theme: 'error',
                title: t('lessonResult.titleError'),
                image: ninjaError,
                resultPerformance: t('lessonResult.performance.resultError'),
                total,
                corrects
            }
        }
    }, [questions, percentToCorrect])

    const renderCollection = useCallback(
        (question, index) => (
            <SANBox
                bg='grey.5'
                key={index}
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                pt='xl'
                px={{ xs: 'xxl', _: 'md' }}
            >
                <SANBox
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    borderBottom={index < questions.length - 1 && '1px solid'}
                    borderColor='white.1'
                    pb='xl'
                >
                    <SANBox display='flex' alignItems='center'>
                        <SANBox
                            color='white.10'
                            minWidth='24px'
                            width='24px'
                            height='24px'
                            minHeight='24px'
                            borderRadius='12px'
                            bg={
                                hasSuccessColletion(question)
                                    ? 'success'
                                    : 'error'
                            }
                            mr='md'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <SANTypography fontSize='sm' fontWeight='bold'>
                                {index + 1}
                            </SANTypography>
                        </SANBox>
                        <SANBox display='flex' flexDirection='column'>
                            <SANBox display={{ md: 'none', _: 'block' }}>
                                <SANTypography
                                    fontSize='lg'
                                    fontWeight='bold'
                                    color={
                                        hasSuccessColletion(question)
                                            ? 'white.10'
                                            : 'error'
                                    }
                                >
                                    {hasSuccessColletion(question)
                                        ? t('lessonResult.itemSuccess')
                                        : t('lessonResult.itemError')}
                                </SANTypography>
                            </SANBox>
                            <SANTypography
                                fontSize='lg'
                                fontWeight='bold'
                                color='white.5'
                            >
                                {`${question.title} (${question.corrects}/${question.total})`}
                            </SANTypography>
                        </SANBox>
                    </SANBox>
                    <SANBox display={{ md: 'block', _: 'none' }}>
                        <SANTypography
                            fontSize='lg'
                            fontWeight='bold'
                            color={
                                hasSuccessColletion(question)
                                    ? 'white.10'
                                    : 'error'
                            }
                        >
                            {hasSuccessColletion(question)
                                ? t('lessonResult.itemSuccess')
                                : t('lessonResult.itemError')}
                        </SANTypography>
                    </SANBox>
                </SANBox>
            </SANBox>
        ),
        [questions]
    )

    return (
        <SANBox borderRadius='base'>
            <SANBox
                p='xl'
                display='flex'
                justifyContent='center'
                alignItems='center'
                bg={props.theme}
            >
                <SANTypography
                    fontSize='xxl'
                    fontWeight='bold'
                    color='white.10'
                >
                    {props.title}
                </SANTypography>
            </SANBox>
            <SANBox px='xl'>
                <SANRow
                    py='xxl'
                    px='md'
                    type='flex'
                    justify='center'
                    align='middle'
                    bg='white.10'
                    gutter={48}
                >
                    <SANCol>
                        <SANBox as='img' src={props.image} height='300px' />
                    </SANCol>
                    <SANCol>
                        <SANBox
                            display='flex'
                            flexDirection='column'
                            mb={{ xs: 'md', _: 'sm' }}
                        >
                            <SANTypography
                                as='span'
                                fontSize={{ xs: 'xl', _: 'md' }}
                                color='grey.9'
                                textAlign='center'
                            >
                                {t('lessonResult.performance.youRight')}
                                <SANBox
                                    as='span'
                                    color={props.theme}
                                    fontWeight='bold'
                                >
                                    {` ${props.corrects} ${t(
                                        'lessonResult.performance.of'
                                    )} ${props.total} `}
                                </SANBox>
                                {t('lessonResult.performance.questions')}
                            </SANTypography>
                        </SANBox>
                        <SANBox display='flex' mb={{ xs: 'xl', _: 'md' }}>
                            <SANTypography
                                as='span'
                                fontSize='md'
                                color='grey.6'
                                textAlign='center'
                            >
                                {props.resultPerformance}{' '}
                                <SANTypography as='span' fontWeight='bold'>
                                    {t('lessonResult.performance.pratice')}
                                </SANTypography>
                            </SANTypography>
                        </SANBox>
                        <SANButton
                            size='medium'
                            uppercase
                            block
                            bold
                            variant='solid'
                            onClick={onGoPractice}
                        >
                            {t('lessonResult.goToPratice')}
                        </SANButton>
                    </SANCol>
                </SANRow>
            </SANBox>
            {questions.map(renderCollection)}
        </SANBox>
    )
}

export default SANLessonResult
