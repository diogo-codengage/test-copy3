import React from 'react'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

import ESNextLives from 'sanar-ui/dist/Components/Molecules/NextLives'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESCardNextLive from 'sanar-ui/dist/Components/Atoms/CardNextLive'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import Mock from './mock.json'
import { SANPortalPagesContainer } from '../Layout'

const SANLives = ({ title, release_date, scheduled }) => {
    const { t } = useTranslation()
    const date = format(new Date(release_date), 'DD/MM/YYYY [às] HH[h]')

    return (
        <ESCardNextLive
            title={title}
            date={date}
            actions={[
                <ESButton
                    fontSize={12}
                    clear
                    ghost={scheduled}
                    type={scheduled ? 'primary' : 'default'}
                    className={
                        !scheduled && 'next-lives__card__action--remember'
                    }
                >
                    <ESEvaIcon
                        size='small'
                        name={scheduled ? 'bell' : 'bell-outline'}
                        color='primary'
                    />{' '}
                    {scheduled
                        ? t('courseDetails.remembered')
                        : t('courseDetails.remember')}
                </ESButton>,
                <ESButton fontSize={12} clear ghost type='primary'>
                    {t('courseDetails.viewLive')}
                    <ESEvaIcon
                        size='small'
                        name='diagonal-arrow-right-up'
                        color='primary'
                    />
                </ESButton>
            ]}
        />
    )
}

const SANNextLives = () => {
    const { t } = useTranslation()
    const {
        enrollment: {
            course: { lives }
        }
    } = Mock

    return (
        <SANPortalPagesContainer>
            <ESSessionTitle title={t('courseDetails.nextLivesTitle')} />
            <ESNextLives>
                {lives.map((live, i) => (
                    <SANLives key={i} {...live} />
                ))}
            </ESNextLives>
        </SANPortalPagesContainer>
    )
}

export default SANNextLives
