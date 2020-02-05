import React from 'react'

import SANCourseHeader from './Header'
import SANCourseTabContent from './TabContent'

const SANCoursePage = () => (
    <div className='course'>
        <SANCourseHeader />
        <SANCourseTabContent />
        {/* 
                Diogo Biz - 05/02/2020
                Removido tab de visão geral e movido seção de professores para tab de conteudo.
                A tab de pergutnas e respostas ja estava oculta desde o inicio, pois a feature nunca foi finalizada.
            */}
        {/* <ESTabs center defaultActiveKey='1' tabBarGutter={0}>
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
                <ESTabPane tab={t('courseDetails.tabQuestions.title')} key='3'>
                    <SANCourseTabQuestions />
                </ESTabPane>
            </ESTabs> */}
    </div>
)

export default SANCoursePage
