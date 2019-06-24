import React, { useState, forwardRef } from 'react'

import { useTranslation } from 'react-i18next'

import ESQuestionMap from 'sanar-ui/dist/Components/Molecules/QuestionMap'
import ESStopwatch from 'sanar-ui/dist/Components/Atoms/Stopwatch'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'

const SANSubheader = forwardRef(
    ({ total, index, questions, mock, stopwatch }, ref) => {
        const { t } = useTranslation('esanar')
        const [visible, setVisible] = useState(false)

        const toggleVisible = () => setVisible(oldVisible => !oldVisible)

        return (
            <SANPortalPagesContainer className='video-quiz__subheader'>
                <div className='video-quiz__subheader--left'>
                    <ESTypography level={4} className='mr-xs text-white'>
                        {`${t('classroom.question')} ${index + 1}`}
                    </ESTypography>
                    <ESTypography variant='body1' className='text-white-6'>
                        {total > 999 ? `/ 999+` : `/ ${total}`}
                    </ESTypography>
                </div>
                <div className='d-flex align-items-center'>
                    <ESButton
                        size='small'
                        variant='outlined'
                        color='white'
                        onClick={toggleVisible}
                    >
                        <ESEvaIcon name='map-outline' />
                        {t('classroom.questionMap')}
                    </ESButton>
                    {stopwatch && (
                        <ESStopwatch ref={ref} dark className='ml-lg' />
                    )}
                    <ESQuestionMap
                        visible={visible}
                        items={questions}
                        current={index}
                        onCancel={toggleVisible}
                        mock={mock}
                    />
                </div>
                <span className='d-flex align-items-center'>
                    <ESButton
                        size='small'
                        variant='text'
                        color='white'
                        className='mr-sm'
                    >
                        <ESEvaIcon name='heart-outline' />
                        {t('classroom.favoriteQuestion')}
                    </ESButton>
                    <ESButton size='small' variant='text' color='white'>
                        <ESEvaIcon name='more-vertical-outline' />
                    </ESButton>
                </span>
            </SANPortalPagesContainer>
        )
    }
)

export default SANSubheader
