import React from 'react'
import { useTranslation } from 'react-i18next'

import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'

import SANCourseHeader from './Header'
import SANCourseTabGeneral from './TabGeneral'
import SANCourseTabContent from './TabContent'

const SANCoursePage = () => {
    const { t } = useTranslation('esanar')

    return (
        <div className='course'>
            <SANCourseHeader />
            <ESTabs center defaultActiveKey='1' tabBarGutter={0}>
                <ESTabPane
                    data-testid='san-portal__tab-content'
                    tab={t('courseDetails.tabContent.title')}
                    key='1'
                >
                    <SANCourseTabContent />
                </ESTabPane>
                <ESTabPane
                    data-testid='san-portal__tab-general'
                    tab={t('courseDetails.tabGeneral')}
                    key='2'
                >
                    <SANCourseTabGeneral />
                </ESTabPane>
                {/*FIXME: <ESTabPane tab={t('courseDetails.tabQuestions.title')} key='3'>
                    <SANCourseTabQuestions />
                </ESTabPane> */}
            </ESTabs>
        </div>
    )
}

export default SANCoursePage
