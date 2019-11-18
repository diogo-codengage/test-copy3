import React, { useState } from 'react'

import { theme } from 'styled-tools'
import { useTranslation } from 'react-i18next'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

import { SANDivider } from '../../Atoms/Divider'
import { SANButton, ISANButtonProps } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANSpin } from '../../Atoms/Spin'
import { SANRow, SANCol } from '../Grid'
import { SANStyled } from 'Theme'

export interface ISANLessonFeedbackProps {
    ButtonNextProps?: ISANButtonProps
    ButtonSendProps?: ISANButtonProps
    onSend?: (
        rating: number,
        props: { setSubmitting: (submitting: boolean) => void }
    ) => void
    onNext?: () => void
    onRating?: () => void
}

const SANRatingOpacity = SANStyled(SANBox)`
    &&& {
        background-color: ${theme('colors.white.7')};
        position: absolute;
        height: 60px;
        width: 50px;
        cursor: pointer;
        transition: all 1s;
        :hover {
            background-color: transparent;
        }
        
        animation: emojiOpacity 0.5s;
      
        @keyframes emojiOpacity {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        opacity: 1;
    }
`
const SANLessonFeedback = ({ onSend, onNext }: ISANLessonFeedbackProps) => {
    const [rating, setRating] = useState(0)
    const [submitting, setSubmitting] = useState(false)

    const {
        assets: {
            feedbackEmojis: { awful, bad, regular, good, awesome }
        }
    } = useThemeContext()
    const { t } = useTranslation('components')

    const handleSend = () => {
        setSubmitting(true)
        onSend(rating, { setSubmitting })
    }

    return (
        <SANBox
            borderRadius='base'
            border='1px solid'
            borderColor='grey.2'
            textAlign='center'
            bg='white.10'
            boxShadow={1}
        >
            <SANSpin spinning={submitting} flex>
                <SANBox px='md' py={{ _: 6, md: '148px' }}>
                    <SANTypography
                        fontSize={4}
                        fontWeight='bold'
                        color='grey-solid.8'
                        mb={{ _: 2, md: 4 }}
                    >
                        {t('lessonFeedback.title')}
                    </SANTypography>
                    <SANTypography
                        fontSize={2}
                        fontWeight='bold'
                        color='grey-solid.5'
                        mb={{ _: 2, md: 6 }}
                    >
                        {t('lessonFeedback.subtitle')}
                    </SANTypography>
                    <SANRow
                        py={{ _: 'md', md: 'lg' }}
                        type='flex'
                        justify='center'
                        align='middle'
                    >
                        <SANCol>
                            {rating !== 1 && (
                                <SANRatingOpacity
                                    onClick={() => setRating(1)}
                                />
                            )}

                            <SANBox
                                as='img'
                                src={awful}
                                height='32px'
                                px={3}
                                my={2}
                                onClick={() => setRating(0)}
                            />
                            <SANTypography
                                color='grey-solid.5'
                                fontWeight='bold'
                                fontSize={0}
                            >
                                {t('lessonFeedback.awful')}
                            </SANTypography>
                        </SANCol>
                        <SANCol>
                            {rating !== 2 && (
                                <SANRatingOpacity
                                    onClick={() => setRating(2)}
                                />
                            )}{' '}
                            <SANBox
                                as='img'
                                src={bad}
                                height='32px'
                                px={3}
                                my={2}
                                onClick={() => setRating(0)}
                            />
                            <SANTypography
                                color='grey-solid.5'
                                fontWeight='bold'
                                fontSize={0}
                            >
                                {t('lessonFeedback.bad')}
                            </SANTypography>
                        </SANCol>
                        <SANCol>
                            {rating !== 3 && (
                                <SANRatingOpacity
                                    onClick={() => setRating(3)}
                                />
                            )}{' '}
                            <SANBox
                                as='img'
                                src={regular}
                                height='32px'
                                px={3}
                                my={2}
                                onClick={() => setRating(0)}
                            />
                            <SANTypography
                                color='grey-solid.5'
                                fontWeight='bold'
                                fontSize={0}
                            >
                                {t('lessonFeedback.regular')}
                            </SANTypography>
                        </SANCol>
                        <SANCol>
                            {rating !== 4 && (
                                <SANRatingOpacity
                                    onClick={() => setRating(4)}
                                />
                            )}{' '}
                            <SANBox
                                as='img'
                                src={good}
                                height='32px'
                                px={3}
                                my={2}
                                onClick={() => setRating(0)}
                            />
                            <SANTypography
                                color='grey-solid.5'
                                fontWeight='bold'
                                fontSize={0}
                            >
                                {t('lessonFeedback.good')}
                            </SANTypography>
                        </SANCol>
                        <SANCol>
                            {rating !== 5 && (
                                <SANRatingOpacity
                                    onClick={() => setRating(5)}
                                />
                            )}
                            <SANBox
                                as='img'
                                src={awesome}
                                height='32px'
                                px={3}
                                my={2}
                                onClick={() => setRating(0)}
                            />
                            <SANTypography
                                color='grey-solid.5'
                                fontSize={0}
                                fontWeight='bold'
                            >
                                {t('lessonFeedback.awesome')}
                            </SANTypography>
                        </SANCol>
                    </SANRow>
                </SANBox>
                <SANDivider bg='grey.2' m='0' />
                <SANBox borderRadius='base' bg='white.10' p={6}>
                    <SANRow type='flex' justify='space-between'>
                        <SANButton
                            variant='text'
                            uppercase
                            size='small'
                            onClick={onNext}
                            bold
                        >
                            {t('lessonFeedback.next')}
                        </SANButton>
                        <SANButton
                            color='primary'
                            variant='solid'
                            uppercase
                            size='small'
                            onClick={handleSend}
                            disabled={!rating}
                            bold
                        >
                            {t('lessonFeedback.send')}
                        </SANButton>
                    </SANRow>
                </SANBox>
            </SANSpin>
        </SANBox>
    )
}

export default SANLessonFeedback
