import React from 'react'
import { Divider as ANTDivider } from 'antd'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import ESLiveSection from 'sanar-ui/dist/Components/Molecules/LiveSection'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import { SANPortalPagesContainer } from '../Layout'
import { useAuthContext } from 'Hooks/auth'

const SANLives = () => {
    const { getEnrollment } = useAuthContext()
    const {
        course: { lives: livesProp }
    } = getEnrollment()

    const { t } = useTranslation()

    const live = {
        ...livesProp[0],
        link: 'https://www.youtube.com/embed/aG-Go8W-wcE',
        release_date: '2019-02-08T14:02:06.093Z',
        scheduled: false,
        professor: {
            ...livesProp[0].professor,
            courses: 4,
            profile_picture:
                'https://www.domalberto.edu.br/wp-content/uploads/2017/02/joao.png'
        }
    }

    const date = format(live.release_date, 'DD/MM/YYYY')

    return (
        <SANPortalPagesContainer className='lives'>
            <ESSessionTitle
                title={t('courseDetails.livesTitle')}
                subtitle={t('courseDetails.livesSubtitle')}
            />
            <ESLiveSection
                videoSrc={live.link}
                description={live.description}
                title={live.title}
                date={date}
                avatar={live.professor.profile_picture}
                name={live.professor.name}
                courses={live.professor.courses}
                action={
                    <ESButton
                        size='xsmall'
                        block
                        bold
                        uppercase
                        variant='outlined'
                    >
                        {t('courseDetails.seePreviousLives')}
                    </ESButton>
                }
            />
            <ANTDivider />
        </SANPortalPagesContainer>
    )
}

export default SANLives
