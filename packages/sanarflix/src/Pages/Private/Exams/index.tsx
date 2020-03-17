import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANBox,
    SANHeader,
} from '@sanar/components'

import { events } from 'Config/Segment'
import OnBoarding from './OnBoarding'
import List from './InitialList'
import { useAuthContext } from '../../../Hooks/auth'
import { GET_ME, IUserMedUniversity } from 'Apollo/User/Queries/me'

const FLXExams = ({ history }) => {
    const client = useApolloClient()
    const { t } = useTranslation('sanarflix')
    const { me, setMe } = useAuthContext()
    const [userMedUniversity, setUserMedUniversity] = useState<IUserMedUniversity>(me.userMedUniversity)

    const isMeUniversityEmpty = (): boolean => {
        if (!userMedUniversity) return true
        let show = false
        for (let prop in userMedUniversity) {
            if (!userMedUniversity.hasOwnProperty(prop) || !userMedUniversity[prop]) show = true
        }
        return show
    }
    const [showOnBoarding, setShowOnBoarding] = useState<boolean>(isMeUniversityEmpty)

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    useEffect(() => {
        setUserMedUniversity(me.userMedUniversity)
    }, [me])

    const handleChange = async () => {
        try {
            const {
                data: { me },
                errors
            } = await client.query({ query: GET_ME })
            if (!!errors) {
                message.error(t('global.error'))
            } else {
                setMe(me)
                setShowOnBoarding(false)
            }
        } catch {
            message.error(t('global.error'))
        }
    }

    return (
        <SANBox displayFlex flexDirection='column' flex='1'>
            <SANHeader
                onBack={() => history.push('/portal/inicio')}
                SessionTitleProps={{
                    title: t('exams.title'),
                    subtitle: t('exams.subtitle')
                }}
            />
            {showOnBoarding
                ? (<OnBoarding changePage={handleChange} userMedUniversity={userMedUniversity}/>)
                : (<List medUniversity={userMedUniversity.medUniversity} />)
            }
        </SANBox>
    )
}

export default withRouter(FLXExams)
