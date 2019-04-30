import React from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader, Typography, Divider } from 'antd'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESProgressBar from 'sanar-ui/dist/Components/Molecules/ProgressBar'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'

import SANPerformance from './Performance'
import SANInteractions from './Interactions'
import SANLives from './Lives'

import './style.less'

import Mock from './mock.json'

export const CoursePage = () => {
    const { t } = useTranslation()
    const { enrollment } = Mock

    const { course } = enrollment

    return (
        <div className='course'>
            <PageHeader className='course__header'>
                <ESRow
                    className='course__header__container'
                    type='flex'
                    align='middle'
                    gutter={20}
                >
                    <ESCol
                        xs={24}
                        md={10}
                        lg={12}
                        className='course__header__container__about-course'
                    >
                        <ESRow type='flex' align='middle' gutter={16}>
                            <ESCol>
                                <img
                                    alt=''
                                    src='https://freeiconshop.com/wp-content/uploads/edd/bulb-flat.png'
                                />
                            </ESCol>
                            <ESCol flex={1}>
                                <Typography.Text className='course__header__container__about-course--category'>
                                    {course.knowledge_area}
                                </Typography.Text>
                                <br />
                                <Typography.Text
                                    className='course__header__container__about-course--name'
                                    strong
                                    ellipsis
                                >
                                    {course.name}
                                </Typography.Text>
                            </ESCol>
                        </ESRow>
                    </ESCol>
                    <ESCol
                        xs={24}
                        md={14}
                        lg={12}
                        className='course__header__container__progress'
                    >
                        <ESRow gutter={20}>
                            <ESCol xs={24} sm={16} md={14} lg={16}>
                                <ESProgressBar
                                    title={t('courseDetails.progressbarTitle')}
                                    percent={enrollment.progress_percentage}
                                />
                            </ESCol>
                            <ESButton
                                ghost
                                type='primary'
                                icon='download'
                                disabled={!enrollment.certificate.available}
                            >
                                {t('courseDetails.certified')}
                            </ESButton>
                        </ESRow>
                    </ESCol>
                </ESRow>
            </PageHeader>
            <ESTabs defaultActiveKey='1' tabBarGutter={0}>
                <ESTabPane tab={t('courseDetails.tabGeneral')} key='1'>
                    <SANPerformance />
                    <SANInteractions />
                    <SANLives />
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
