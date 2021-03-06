import React, { useState, forwardRef } from 'react'
import classNames from 'classnames'

import { useTranslation } from 'react-i18next'

import ESQuestionMap from 'sanar-ui/dist/Components/Molecules/QuestionMap'
import ESStopwatch from 'sanar-ui/dist/Components/Atoms/Stopwatch'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

const SANSubheader = forwardRef(
    ({ total, index, questions, mock, stopwatch }, ref) => {
        const { t } = useTranslation('esanar')
        const [visible, setVisible] = useState(false)

        const toggleVisible = () => setVisible(oldVisible => !oldVisible)

        return (
            <SANPortalPagesContainer className='video-quiz__subheader'>
                <ESRow type='flex' justify='space-between' className='w-100'>
                    <ESCol
                        xs={24}
                        md={8}
                        className='video-quiz__subheader--left'
                    >
                        <ESTypography level={4} className='mr-xs text-white'>
                            {`${t('classroom.question')} ${index + 1}`}
                        </ESTypography>
                        <ESTypography variant='body1' className='text-white-6'>
                            {total > 999 ? `/ 999+` : `/ ${total}`}
                        </ESTypography>
                    </ESCol>
                    <ESCol
                        xs={24}
                        md={8}
                        className='video-quiz__subheader--center'
                    >
                        <ESButton
                            size='small'
                            variant='outlined'
                            color='white'
                            onClick={toggleVisible}
                        >
                            <ESEvaIcon name='map-outline' />
                            {t('classroom.questionMap')}
                        </ESButton>
                        <ESStopwatch
                            ref={ref}
                            dark
                            className={classNames('ml-lg', {
                                hide: !stopwatch
                            })}
                        />
                        <ESQuestionMap
                            visible={visible}
                            items={questions}
                            current={index}
                            onCancel={toggleVisible}
                            mock={mock}
                        />
                    </ESCol>
                    <ESCol
                        xs={24}
                        md={8}
                        className='video-quiz__subheader--right'
                    >
                        {/*
                            Diogo Biz - 05/02/2020 FD-1024
                            Remover favoritos
                        */}
                        {/* <ESButton
                            size='small'
                            variant='text'
                            color='white'
                            className='mr-sm'
                            onClick={handleBookmark}
                        >
                            {bookmarked ? (
                                <ESEvaIcon
                                    name='heart'
                                    color='secondary'
                                    key='quiz-bookmarked'
                                />
                            ) : (
                                <ESEvaIcon
                                    name='heart-outline'
                                    key='quiz-not-bookmarked'
                                />
                            )}
                            {t('classroom.favoriteQuestion')}
                        </ESButton> */}
                        <ESButton
                            circle
                            size='small'
                            variant='text'
                            color='white'
                        >
                            <ESEvaIcon name='more-vertical-outline' />
                        </ESButton>
                    </ESCol>
                </ESRow>
            </SANPortalPagesContainer>
        )
    }
)

export default SANSubheader
