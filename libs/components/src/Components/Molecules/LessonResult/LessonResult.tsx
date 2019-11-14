import React from 'react'

import { theme } from 'styled-tools'

import { useThemeContext } from '@sanar/utils/dist/Hooks'
import { useTranslation } from 'react-i18next'
import { SANStyled } from '../../../Theme'
import { SANButton } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANRow, SANCol } from '../Grid'

export interface ISANLessonResultProps {
    percentToCorrect?: number
    onGoPractice?: () => {}
    questions: Array<{
        number: string
        title: string
        percentToCorrect?: number
        correctsQuizzes: number
        totalQuizzes: number
    }>
}

const SANQuizTitleRow = SANStyled(SANRow)`
    &&& {
        max-width: calc(100% - 40px);
        flex: 1;
        display: flex;

    }
    & > div: {
        max-width: calc(100% - 40px);
    }
`
const SANResultTitle = SANStyled(SANRow)`
    &&& {
        border-top-left-radius: ${theme('radii.base')};
        border-top-right-radius: ${theme('radii.base')};

    }
`
const SANResultQuizzes = SANStyled(SANRow)`
    &&& {
        border-bottom-left-radius: ${theme('radii.base')};
        border-bottom-right-radius: ${theme('radii.base')};

    }
`

const SANLessonResult = ({
    percentToCorrect,
    questions,
    onGoPractice
}: ISANLessonResultProps) => {
    let title: string,
        ninja: string,
        resultTheme: string,
        resultPerformance: string

    const { t } = useTranslation('components')

    const {
        assets: {
            lessonResult: { success: ninjaSuccess, error: ninjaError }
        }
    } = useThemeContext()

    const totalQuestions = questions.length
    let correctsQuestions = 0
    questions.forEach(({ correctsQuizzes, totalQuizzes, percentToCorrect }) => {
        if (
            (correctsQuizzes * 100) / totalQuizzes >=
            (percentToCorrect || 80)
        ) {
            correctsQuestions += 1
        }
    })
    const type =
        (correctsQuestions * 100) / totalQuestions >= (percentToCorrect || 80)
            ? 'success'
            : 'error'

    if (type === 'success') {
        resultTheme = 'success'
        title = t('lessonResult.titleSuccess')
        ninja = ninjaSuccess
        resultPerformance = t('lessonResult.performance.resultSuccess')
    } else {
        resultTheme = 'error'
        title = t('lessonResult.titleError')
        ninja = ninjaError
        resultPerformance = t('lessonResult.performance.resultError')
    }

    const getResultOfQuiz = (
        pctToCorrect: number,
        total: number,
        corrects: number
    ) => {
        if ((corrects * 100) / total >= (pctToCorrect || 80)) {
            return {
                color: 'success',
                resultTextColor: 'white.10',
                resultText: t('lessonResult.questions.resultSuccess')
            }
        }
        return {
            color: 'error',
            resultTextColor: 'error',
            resultText: t('lessonResult.questions.resultError')
        }
    }

    return (
        <SANBox
            justifyContent={{ sm: 'flex-start', _: 'space-between' }}
            mb={{ md: '0', _: 'md' }}
            width={[1]}
            borderRadius='base'
        >
            <SANResultTitle
                width={[1]}
                p={{ _: 'lg' }}
                type='flex'
                justify='center'
                align='middle'
                bg={resultTheme}
            >
                <SANTypography
                    fontSize={{ _: 'xxl' }}
                    fontWeight='bold'
                    color='white.10'
                >
                    {title}
                </SANTypography>
            </SANResultTitle>
            <SANRow
                width={[1]}
                py={{ _: 'xl' }}
                px={{ _: 'md', md: 'xl' }}
                type='flex'
                justify='center'
                align='middle'
                bg='white.10'
            >
                <SANCol
                    width={{ _: 1, xs: '292.90px' }}
                    height={{ xs: '300px' }}
                >
                    <SANBox as='img' src={ninja} width={[1]} height='auto' />
                </SANCol>
                <SANCol
                    maxWidth='100%'
                    ml={{ _: 8 }}
                    mr={{ md: '0', _: 8 }}
                    justify='center'
                    align='middle'
                >
                    <SANBox displayFlex mb={{ _: 'sm' }}>
                        <SANBox
                            as='span'
                            fontSize={{ _: 'md' }}
                            color='grey.9'
                            width={[1]}
                        >
                            {t('lessonResult.performance.youRight')}
                            <SANBox
                                as='span'
                                fontSize={{ _: 'md' }}
                                color={resultTheme}
                                fontWeight='bold'
                            >
                                &nbsp;
                                {`${correctsQuestions} ${t(
                                    'lessonResult.performance.of'
                                )} ${totalQuestions}`}
                            </SANBox>
                            &nbsp;
                            {t('lessonResult.performance.questions')}
                        </SANBox>
                    </SANBox>
                    <SANBox displayFlex mb={{ _: 'md' }}>
                        <SANBox as='span' fontSize={{ _: 'md' }} color='grey.6'>
                            {resultPerformance}
                            <SANBox
                                as='span'
                                fontSize={{ _: 'md' }}
                                color='grey.6'
                                fontWeight='bold'
                            >
                                &nbsp;
                                {t('lessonResult.performance.pratice')}
                            </SANBox>
                        </SANBox>
                    </SANBox>
                    <SANRow>
                        <SANCol>
                            <SANButton
                                onClick={onGoPractice}
                                size='medium'
                                uppercase
                                color='primary-4'
                                variant='solid'
                            >
                                <SANTypography
                                    fontSize={{ _: 'md', md: 'lg' }}
                                    fontWeight='bold'
                                    color='white.10'
                                >
                                    {t('lessonResult.goToPratice')}
                                </SANTypography>
                            </SANButton>
                        </SANCol>
                    </SANRow>
                </SANCol>
            </SANRow>
            <SANResultQuizzes
                width={[1]}
                py={{ _: 'xs' }}
                px={{ _: 'md', md: 'xxl' }}
                type='flex'
                align='middle'
                bg='grey-solid.8'
            >
                {questions.map((question, index) => (
                    <SANRow
                        width={[1]}
                        type='flex'
                        py='xl'
                        justify='space-between'
                        align='middle'
                        borderBottom={
                            index === questions.length - 1 ? '0' : '1px solid'
                        }
                        borderColor='white.2'
                    >
                        <SANCol
                            width={{
                                _: 'calc(100% - 122px)',
                                md: 'calc(100% - 130px)'
                            }}
                        >
                            <SANRow type='flex' alignItems='center'>
                                <SANBox
                                    textAlign='center'
                                    width='24px'
                                    height='24px'
                                    mr={{ _: 'xs', md: 'md' }}
                                    bg={
                                        getResultOfQuiz(
                                            question.percentToCorrect,
                                            question.totalQuizzes,
                                            question.correctsQuizzes
                                        ).color
                                    }
                                    borderRadius='50%'
                                >
                                    <SANBox
                                        as='span'
                                        fontSize={{ _: 'sm' }}
                                        my={{ _: 'auto' }}
                                        fontWeight='bold'
                                        color='white.10'
                                    >
                                        {question.number}
                                    </SANBox>
                                </SANBox>
                                <SANQuizTitleRow>
                                    <SANTypography
                                        fontSize={{ _: 'lg' }}
                                        fontWeight='bold'
                                        color='white.5'
                                        textAlign='left'
                                        ellipsis='1'
                                    >
                                        {/* teste */}
                                        {question.title}
                                    </SANTypography>
                                    <SANBox
                                        as='span'
                                        fontSize={{ _: 'lg' }}
                                        fontWeight='bold'
                                        color='white.5'
                                        textAlign='left'
                                    >
                                        &nbsp;
                                        {`(${question.correctsQuizzes}/${question.totalQuizzes})`}
                                    </SANBox>
                                </SANQuizTitleRow>
                            </SANRow>
                        </SANCol>
                        <SANCol>
                            <SANTypography
                                flex='initial'
                                fontSize={{ _: 'lg' }}
                                ml={{ _: 'xs', md: 'md' }}
                                fontWeight='bold'
                                textAlign='right'
                                color={
                                    getResultOfQuiz(
                                        question.percentToCorrect,
                                        question.totalQuizzes,
                                        question.correctsQuizzes
                                    ).resultTextColor
                                }
                            >
                                {
                                    getResultOfQuiz(
                                        question.percentToCorrect,
                                        question.totalQuizzes,
                                        question.correctsQuizzes
                                    ).resultText
                                }
                            </SANTypography>
                        </SANCol>
                    </SANRow>
                ))}
            </SANResultQuizzes>
        </SANBox>
    )
}

export default SANLessonResult
