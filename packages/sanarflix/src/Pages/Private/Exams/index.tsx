import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANDivider,
    SANHeader,
} from '@sanar/components'

import { events } from 'Config/Segment'
import OnBoardingTop from './OnBoarding/Top'
import OnBoardingBottom from './OnBoarding/Bottom'

const FLXExams = ({ history }) => {
    const { t } = useTranslation('sanarflix')

    useEffect(() => {
        window.analytics.page(
            events['Page Viewed'].event,
            events['Page Viewed'].data
        )
    }, [])

    return (
        <SANBox displayFlex flexDirection='column' flex='1' >
            <SANBox backgroundColor='grey-solid.1'>
                <SANHeader
                    onBack={() => history.push('/portal/inicio')}
                    SessionTitleProps={{
                        title: t('exams.title'),
                        subtitle: t('exams.subtitle')
                    }}
                />
                <OnBoardingTop />
            </SANBox>
            <SANDivider style={{width: '100%', margin: 0}} backgroundColor='grey-solid.3' />
            <SANBox>
                <OnBoardingBottom />
            </SANBox>
        </SANBox>
    )
}

export default withRouter(FLXExams)
