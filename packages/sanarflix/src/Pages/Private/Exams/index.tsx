import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANHeader,
} from '@sanar/components'

import { events } from 'Config/Segment'
import OnBoarding from './OnBoarding'
import List from './InitialList'
import { useAuthContext } from '../../../Hooks/auth'

const FLXExams = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    const { me } = useAuthContext()
    const { userMedUniversity } = me
    const [showOnBoarding, setShowOnBoarding] = useState<boolean>(!userMedUniversity || Object.keys(userMedUniversity).length === 0)

    const handleChange = () => {
        setShowOnBoarding(false)
    }

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

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
                ? (<OnBoarding changePage={handleChange}/>)
                : (<List medUniversity={userMedUniversity.medUniversity} />)
            }
        </SANBox>
    )
}

export default withRouter(FLXExams)
