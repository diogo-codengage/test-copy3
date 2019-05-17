import React from 'react'
import { useTranslation } from 'react-i18next'

import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'

import SANCourseHeader from './Header'
import SANCourseTabContent from './TabContent'
import SANCourseTabGeneral from './TabGeneral'

const SANCoursePage = () => {
    const { t } = useTranslation()

    return (
        <div className='course'>
            <SANCourseHeader />
            <ESTabs defaultActiveKey='1' tabBarGutter={0}>
                <ESTabPane tab={t('courseDetails.tabGeneral')} key='1'>
                    <SANCourseTabGeneral />
                </ESTabPane>
                <ESTabPane tab={t('courseDetails.tabContent.title')} key='2'>
                    <SANCourseTabContent />
                </ESTabPane>
                <ESTabPane tab={t('courseDetails.tabComments')} key='3'>
                    Comentários
                </ESTabPane>
            </ESTabs>
        </div>
    )
}

export default SANCoursePage
