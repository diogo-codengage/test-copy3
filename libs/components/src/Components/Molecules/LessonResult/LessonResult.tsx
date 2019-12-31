import React, { useMemo, useCallback } from 'react'

import styled from 'styled-components'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

import { useTranslation } from 'react-i18next'
import { SANButton } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANSpin } from '../../Atoms/Spin'
import { SANSkeleton } from '../../Atoms/Skeleton'
import { SANRow, SANCol } from '../Grid'

const SANBoxStyled = styled(SANBox)`
    overflow: hidden;
`

const arrLoading = new Array(5).fill(1)

const renderSkeleton = (_, index) => (
    <Skeleton key={index} showBorder={index < arrLoading.length - 1} />
)

const SANSkeletonStyled = styled(SANSkeleton)`
    && {
        display: flex;
        align-items: center;
        & .ant-skeleton-header {
            padding-bottom: 0;
        }
    }
`

const Skeleton = ({ showBorder }) => (
    <SANBox bg='grey.5' pt='lg' px={{ xs: 'xxl', _: 'md' }}>
        <SANBox
            display='flex'
            borderBottom={showBorder && '1px solid'}
            borderColor='white.1'
            pb='lg'
        >
            <SANSkeletonStyled
                paragraph={false}
                dark
                active
                avatar={{ size: 24, shape: 'circle' }}
            />
        </SANBox>
    </SANBox>
)

interface IQuiz {
    id: string
    questions: Array<{ id: string }>
}

interface IQuestion {
    id: string
    title: string
    percentToCorrect?: number
    corrects: number
    total: number
    quiz: IQuiz
}

export interface ISANLessonResultProps {
    percentToCorrect?: number
    onGoPractice: () => void
    questions: IQuestion[]
    loading?: boolean
    onGoQuiz: (resp: IQuestion) => void
}

const sumCorrects = (prev, acc) => prev + acc.corrects
const sumTotal = (prev, acc) => prev + acc.total
const hasSuccessColletion = question =>
    (question.corrects * 100) / question.total >=
    (question.percentToCorrect || 80)

const SANLessonResult = ({
    percentToCorrect = 80,
    questions,
    onGoPractice,
    loading = false,
    onGoQuiz
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
        (question, index) => {
            const props = {
                fontSize: 'lg',
                fontWeight: 'bold',
                color: hasSuccessColletion(question) ? 'white.10' : 'error',
                onClick: () =>
                    !hasSuccessColletion(question) && onGoQuiz(question),
                style: {
                    cursor: hasSuccessColletion(question)
                        ? 'default'
                        : 'pointer'
                },
                children: hasSuccessColletion(question)
                    ? t('lessonResult.itemSuccess')
                    : t('lessonResult.itemError')
            }

            return (
                <SANBox
                    bg={{ lg: 'grey.5', _: 'grey-solid.8' }}
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
                        borderBottom={
                            index < questions.length - 1 && '1px solid'
                        }
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
                                    <SANTypography {...props} />
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
                            <SANTypography {...props} />
                        </SANBox>
                    </SANBox>
                </SANBox>
            )
        },
        [questions]
    )

    return (
        <SANBoxStyled borderRadius={{ lg: 'base', _: '0px' }}>
            <SANSpin spinning={loading} dark flex>
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
            </SANSpin>
            {loading
                ? arrLoading.map(renderSkeleton)
                : !!props.total && questions.map(renderCollection)}
        </SANBoxStyled>
    )
}

export default SANLessonResult
