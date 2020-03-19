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
import { useAuthContext } from 'Hooks/auth'
import { IUserMedUniversity } from 'Apollo/User/Queries/me'
import FilteredList from './FilteredList'
import FLXExamFilterProvider from 'Components/Exams/Filter/Context'

const FLXExams = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    const { me } = useAuthContext()
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
    const [initialScreen, setInitialScreen] = useState<boolean>(true)

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    const handleChange = (userMedUniversity) => {
        setUserMedUniversity(userMedUniversity)
        setShowOnBoarding(false)
    }

    const searchExams = () => {
        setInitialScreen(false)
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
                ? (<OnBoarding
                    changePage={(response) => handleChange(response)}
                    userMedUniversity={userMedUniversity}
                />)
                : (
                    <FLXExamFilterProvider>
                        {initialScreen
                            ? (<List
                                medUniversity={userMedUniversity.medUniversity}
                                searchExams={searchExams}
                            />)
                            : <FilteredList />
                        }
                    </FLXExamFilterProvider>
                )
            }
        </SANBox>
    )
}

export default withRouter(FLXExams)
