import React from 'react'
import { useTranslation } from 'react-i18next'
import { format, isBefore } from 'date-fns'

import ESNextLives from 'sanar-ui/dist/Components/Molecules/NextLives'
import ESCardNextLive from 'sanar-ui/dist/Components/Atoms/CardNextLive'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEmpty from 'sanar-ui/dist/Components/Atoms/Empty'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { useAuthContext } from 'Hooks/auth'

const SANLives = ({ title, release_date, link }) => {
    const { t } = useTranslation('esanar')
    const date =
        release_date && format(new Date(release_date), 'DD/MM/YYYY [às] HH[h]')

    const canWatch = isBefore(new Date(release_date), new Date())

    const actions = [
        //FIXME: <ESButton
        //     block
        //     uppercase
        //     bold
        //     size='xsmall'
        //     variant='text'
        //     color={scheduled ? 'primary' : 'default'}
        // >
        //     <ESEvaIcon
        //         size='small'
        //         name={scheduled ? 'bell' : 'bell-outline'}
        //     />{' '}
        //     {scheduled
        //         ? t('courseDetails.remembered')
        //         : t('courseDetails.remember')}
        // </ESButton>,
        <ESButton
            block
            uppercase
            bold
            size='xsmall'
            variant='text'
            color='primary'
            target='_blank'
            href={link}
            rel='noopener noreferrer'
        >
            {t('courseDetails.viewLive')}
        </ESButton>
    ]

    return (
        <ESCardNextLive
            title={title}
            date={date}
            actions={canWatch && actions}
        />
    )
}

const SANNextLives = () => {
    const { getEnrollment } = useAuthContext()
    const {
        course: { lives: livesProp }
    } = getEnrollment()

    const { t } = useTranslation('esanar')

    const lives = livesProp.slice(1)

    const renderLive = (live, i) => <SANLives key={i} {...live} />

    return (
        <SANPortalPagesContainer className='next-lives'>
            <ESTypography strong className='next-lives__title fc-grey-8'>
                {t('courseDetails.othersLivesTitle')}
            </ESTypography>
            {lives.length ? (
                <ESNextLives>{lives.map(renderLive)}</ESNextLives>
            ) : (
                <ESEmpty />
            )}
        </SANPortalPagesContainer>
    )
}

export default SANNextLives
