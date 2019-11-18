import React, { useState } from 'react'
import { useThemeContext } from '@sanar/utils/dist/Hooks'
import { theme } from 'styled-tools'
import { SANDivider } from '../../Atoms/Divider'
import { SANButton, ISANButtonProps } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANRow, SANCol } from '../Grid'
import { useTranslation } from 'react-i18next'
import { SANStyled } from 'Theme'

export interface ISANLessonFeedbackProps {
    ButtonNextProps?: ISANButtonProps
    ButtonSendProps?: ISANButtonProps
    onSend?: (number) => {}
    onNext?: () => {}
    onRating?: () => {}
}

const SANCardBox = SANStyled(SANBox)`
    &&& {
        box-shadow: 0px 1px 2px ${theme('colors.grey.2')};
    }
`
const SANRatingOpacity = SANStyled(SANBox)`
    &&& {
        background-color: ${theme('colors.white.7')};
        position: absolute;
        height: 60px;
        width: 50px;
        cursor:pointer;
        transition: all 1s;
        :hover{
            background-color: transparent;
        }
        
        -webkit-animation: emojiOpacity 0.5s;
        animation: emojiOpacity 0.5s;
      
        @-webkit-keyframes emojiOpacity {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
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
    const [rating, setRating] = useState(null)

    const {
        assets: {
            feedbackEmojis: { awful, bad, regular, good, awesome }
        }
    } = useThemeContext()
    const { t } = useTranslation('components')

    return (
        <SANCardBox
            borderRadius='base'
            border='1px solid'
            borderColor='grey.2'
            textAlign='center'
            bg='white.10'
        >
            <SANBox px={{ _: 'md' }} py={{ _: 6, md: '148px' }}>
                <SANTypography
                    fontSize={4}
                    fontWeight='bold'
                    color='grey-solid.8'
                    mb={{ _: 2, md: 4 }}
                >
                    {t('LessonFeedback.title')}
                </SANTypography>
                <SANTypography
                    fontSize={2}
                    fontWeight='bold'
                    color='grey-solid.5'
                    mb={{ _: 2, md: 6 }}
                >
                    {t('LessonFeedback.subtitle')}
                </SANTypography>
                <SANRow
                    width={[1]}
                    py={{ _: 'md', md: 'lg' }}
                    type='flex'
                    justify='center'
                    align='middle'
                >
                    <SANCol>
                        {rating !== 1 && (
                            <SANRatingOpacity onClick={() => setRating(1)} />
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
                            {t('LessonFeedback.awful')}
                        </SANTypography>
                    </SANCol>
                    <SANCol>
                        {rating !== 2 && (
                            <SANRatingOpacity onClick={() => setRating(2)} />
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
                            {t('LessonFeedback.bad')}
                        </SANTypography>
                    </SANCol>
                    <SANCol>
                        {rating !== 3 && (
                            <SANRatingOpacity onClick={() => setRating(3)} />
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
                            {t('LessonFeedback.regular')}
                        </SANTypography>
                    </SANCol>
                    <SANCol>
                        {rating !== 4 && (
                            <SANRatingOpacity onClick={() => setRating(4)} />
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
                            {t('LessonFeedback.good')}
                        </SANTypography>
                    </SANCol>
                    <SANCol>
                        {rating !== 5 && (
                            <SANRatingOpacity onClick={() => setRating(5)} />
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
                            {t('LessonFeedback.awesome')}
                        </SANTypography>
                    </SANCol>
                </SANRow>
            </SANBox>
            <SANDivider bg='grey.2' />
            <SANBox borderRadius='base' bg='white.10' p={6}>
                <SANRow type='flex' justify='space-between'>
                    <SANButton
                        variant='text'
                        uppercase
                        size='small'
                        onClick={onNext}
                    >
                        <SANTypography fontWeight='bold' color='grey.6'>
                            {t('LessonFeedback.next')}
                        </SANTypography>
                    </SANButton>
                    <SANButton
                        color='primary'
                        variant='solid'
                        uppercase
                        size='small'
                        onClick={() => onSend(rating)}
                        disabled={!rating}
                    >
                        <SANTypography>
                            {t('LessonFeedback.send')}
                        </SANTypography>
                    </SANButton>
                </SANRow>
            </SANBox>
        </SANCardBox>
    )
}

export default SANLessonFeedback
