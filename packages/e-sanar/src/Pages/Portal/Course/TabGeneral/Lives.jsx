import React from 'react'
import { Divider as ANTDivider } from 'antd'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import ESLiveSection from 'sanar-ui/dist/Components/Molecules/LiveSection'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { useAuthContext } from 'Hooks/auth'

const SANLives = () => {
    const { getEnrollment } = useAuthContext()
    const {
        course: { lives }
    } = getEnrollment()

    const { t } = useTranslation()

    const live = lives[0]

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
                linkedin={live.professors[0].linkedin}
                avatar={live.professors[0].profile_picture}
                name={live.professors[0].name}
                formation={live.professors[0].resume}
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
