import React from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader as ANTPageHeader, Typography as ANTTypography } from 'antd'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESProgressBar from 'sanar-ui/dist/Components/Molecules/ProgressBar'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'
import ESTooltip from 'sanar-ui/dist/Components/Atoms/Tooltip'

import SANPerformance from './Performance'
import SANInteractions from './Interactions'
import SANLives from './Lives'
import SANNextLives from './NextLives'

import { useAuthContext } from 'Hooks/auth'

import './style.less'

import { SANPortalPagesContainer } from '../Layout'
import SANCourseHeader from './Header'

const SANCoursePage = () => {
    const {
        me: { enrollments }
    } = useAuthContext()

    const enrollment = enrollments[0]
    const { course } = enrollment

    const { t } = useTranslation()

    return (
        <div className='course'>
            <SANCourseHeader />
            <ESTabs defaultActiveKey='1' tabBarGutter={0}>
                <ESTabPane tab={t('courseDetails.tabGeneral')} key='1'>
                    <SANPerformance />
                    <SANInteractions />
                    <SANLives />
                    <SANNextLives />
                </ESTabPane>
                <ESTabPane tab={t('courseDetails.tabContent')} key='2'>
                    Conteúdo
                </ESTabPane>
                <ESTabPane tab={t('courseDetails.tabComments')} key='3'>
                    Comentários
                </ESTabPane>
            </ESTabs>
        </div>
    )
}

export default SANCoursePage
