import React from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import ESNextLives from 'sanar-ui/dist/Components/Molecules/NextLives'
import ESCardNextLive from 'sanar-ui/dist/Components/Atoms/CardNextLive'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

import { SANPortalPagesContainer } from '../Layout'
import { useAuthContext } from 'Hooks/auth'

const SANLives = ({ title, release_date, scheduled }) => {
    const { t } = useTranslation()
    const date = format(new Date(release_date), 'DD/MM/YYYY [às] HH[h]')

    return (
        <ESCardNextLive
            title={title}
            date={date}
            actions={[
                <ESButton
                    block
                    uppercase
                    bold
                    size='xsmall'
                    variant='text'
                    color={scheduled ? 'primary' : 'default'}
                >
                    <ESEvaIcon
                        size='small'
                        name={scheduled ? 'bell' : 'bell-outline'}
                    />{' '}
                    {scheduled
                        ? t('courseDetails.remembered')
                        : t('courseDetails.remember')}
                </ESButton>,
                <ESButton
                    block
                    uppercase
                    bold
                    size='xsmall'
                    variant='text'
                    color='primary'
                >
                    {t('courseDetails.viewLive')}
                </ESButton>
            ]}
        />
    )
}

const SANNextLives = () => {
    const { getEnrollment } = useAuthContext()
    const {
        course: { lives: livesProp }
    } = getEnrollment()

    const { t } = useTranslation()

    const lives = livesProp.map((live, idx) => ({
        ...live,
        release_date: '2019-02-08T14:02:06.093Z',
        scheduled: idx % 2 ? false : true
    }))

    return (
        <SANPortalPagesContainer className='next-lives'>
            <ESTypography strong className='next-lives__title fc-grey-8'>
                {t('courseDetails.nextLivesTitle')}
            </ESTypography>
            <ESNextLives>
                {lives.map((live, i) => (
                    <SANLives key={i} {...live} />
                ))}
                {lives.map((live, i) => (
                    <SANLives key={i} {...live} />
                ))}
                {lives.map((live, i) => (
                    <SANLives key={i} {...live} />
                ))}
            </ESNextLives>
        </SANPortalPagesContainer>
    )
}

export default SANNextLives
