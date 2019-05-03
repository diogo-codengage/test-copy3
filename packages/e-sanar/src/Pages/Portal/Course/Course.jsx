import React from 'react'
import { useTranslation } from 'react-i18next'

import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'

import SANPerformance from './Performance'
import SANInteractions from './Interactions'
import SANLives from './Lives'
import SANNextLives from './NextLives'

import './style.less'

import SANCourseHeader from './Header'

const SANCoursePage = () => {
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
