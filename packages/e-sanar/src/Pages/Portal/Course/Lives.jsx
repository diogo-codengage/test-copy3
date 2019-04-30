import React from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import { Typography, Badge } from 'antd'

import ESLiveSection from 'sanar-ui/dist/Components/Molecules/LiveSection'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import Mock from './mock.json'

const SANLives = () => {
    const { t } = useTranslation()
    const {
        enrollment: {
            course: { lives }
        }
    } = Mock

    const date = format(lives[0].release_date, 'DD/MM/YYYY')

    return (
        <div className='lives'>
            <ESSessionTitle
                title={t('courseDetails.recentCommentsTitle')}
                subtitle={t('courseDetails.recentCommentsSubtitle')}
            />
            <ESLiveSection
                videoSrc={lives[0].link}
                description={lives[0].description}
                title={lives[0].title}
                date={date}
                name={lives[0].professor.name}
                courses={lives[0].professor.courses}
                action={
                    <ESButton size='small' block fontSize={12}>
                        {t('courseDetails.seePreviousLives')}
                    </ESButton>
                }
            />
        </div>
    )
}

export default SANLives
