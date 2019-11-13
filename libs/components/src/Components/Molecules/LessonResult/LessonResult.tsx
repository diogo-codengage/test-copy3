import React from 'react'

import { theme } from 'styled-tools'

import { useThemeContext } from '@sanar/utils/dist/Hooks'
import { useTranslation } from 'react-i18next'
import { SANStyled } from '../../../Theme'
import { SANButton, ISANButtonProps } from '../../Atoms/Button'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANDivider } from '../../Atoms/Divider'
import { SANRow, SANCol } from '../Grid'

export interface ISANLessonResultProps {
    totalQuestions: number
    correctsQuestions: number
    percentToCorrect: number
    onGoPractice?: () => {}
    questions: Array<{
        number: string,
        title: string,
        percentToCorrect: number,
        correctsQuizzes: number,
        totalQuizzes: number
    }>
}

const SANLessonResult = ({
    totalQuestions,
    correctsQuestions,
    percentToCorrect,
    questions,
    onGoPractice
}: 
ISANLessonResultProps) => {
    const {
        assets: {
            lessonResult: { success: ninjaSuccess, error: ninjaError }
        }
    } = useThemeContext()

    const { t } = useTranslation('components')
    const type = ((correctsQuestions * 100) / totalQuestions) >= (percentToCorrect || 80) ? 'success' : 'error'

    let title: string,
        ninja: string,
        resultTheme: string,
        resultPerformance: string
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

    return (
        <SANBox
            justifyContent={{ sm: 'flex-start', _: 'space-between' }}
            mb={{ md: '0', _: 'md' }}
            width={[1]}
        >
            <SANRow
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
            </SANRow>
            <SANRow
                width={[1]}
                py={{ _: 'xl' }}
                px={{ _: 'md' }}
                pt={{ md: 'xxl'}}
                type='flex'
                justify='center'
                align='middle'
                bg='white.10'
            >
                <SANCol>
                    <SANBox as='img' src={ninja} height='300px' />
                </SANCol>
                <SANCol
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
                                size='medium'
                                uppercase
                                color='primary-4'
                                variant='solid'
                                px={'xxl'}
                            >
                                <SANTypography
                                    fontSize={{ _: 'lg' }}
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
            {/* <SANCol {...grid}>
                <SANBox
                    displayFlex
                    justifyContent={{ sm: 'flex-start', _: 'space-between' }}
                    mb={{ md: '0', _: 'md' }}
                >
                    <SANBox order={{ sm: 1, _: 2 }}>
                        <SANButtonMenu
                            onClick={onOpenMenu}
                            circle
                            variant='text'
                            mr={{ sm: 'xl', _: '0' }}
                        >
                            <SANEvaIcon name='menu-outline' size='large' />
                        </SANButtonMenu>
                    </SANBox>
                    <SANBox order={{ sm: 2, _: 1 }}>
                        <SANTypography
                            fontSize={{ xs: 'xl', _: 'lg' }}
                            fontWeight='bold'
                            color='white.10'
                        >
                            {title}
                        </SANTypography>
                        <SANTypography fontSize='md' color='gold.0'>
                            {subtitle}
                        </SANTypography>
                    </SANBox>
                </SANBox>
            </SANCol>
            {actions && (
                <SANCol xs={24} md={12} xl={8}>
                    <SANRow
                        type='flex'
                        justifyContent={{ xs: 'flex-end', _: 'space-between' }}
                        gutter={24}
                    >
                        <SANCol
                            xs={24}
                            sm={24}
                            md={0}
                            order={3}
                            mt='md'
                            mb='xs'
                        >
                            <SANDivider />
                        </SANCol>
                        {!!ButtonBookmarkProps && (
                            <SANCol
                                xs={24}
                                sm={24}
                                md={8}
                                order={{ _: 3, md: 1 }}
                            >
                                <SANButton {...mergeButtonBookmarkProps} />
                            </SANCol>
                        )}
                        <SANCol xs={12} sm={12} md={8} order={{ _: 1, md: 3 }}>
                            <SANButton {...mergeButtonPreviousProps} />
                        </SANCol>
                        <SANCol xs={12} sm={12} md={8} order={{ _: 1, md: 4 }}>
                            <SANButton {...mergeButtonNextProps} />
                        </SANCol>
                    </SANRow>
                </SANCol>
            )} */}
        </SANBox>
    )
}

export default SANLessonResult
