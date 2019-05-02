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

const SANCoursePage = () => {
    const {
        me: { enrollments }
    } = useAuthContext()

    const enrollment = enrollments[0]
    const { course } = enrollment

    const { t } = useTranslation()

    return (
        <div className='course'>
            <ANTPageHeader className='course__header'>
                <SANPortalPagesContainer>
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
                                    <ANTTypography.Text className='course__header__container__about-course--category'>
                                        {course.knowledge_area}
                                    </ANTTypography.Text>
                                    <br />
                                    <ANTTypography.Text
                                        className='course__header__container__about-course--name'
                                        strong
                                        ellipsis
                                    >
                                        {course.name}
                                    </ANTTypography.Text>
                                </ESCol>
                            </ESRow>
                        </ESCol>
                        <ESCol
                            xs={24}
                            md={14}
                            lg={12}
                            className='course__header__container__progress'
                        >
                            <ESRow gutter={20} type='flex' align='middle'>
                                <ESCol xs={24} sm={16} md={14} lg={15}>
                                    <ESProgressBar
                                        title={t(
                                            'courseDetails.progressbarTitle'
                                        )}
                                        percent={enrollment.progress_percentage.toFixed(
                                            2
                                        )}
                                    />
                                </ESCol>

                                <ESTooltip
                                    title={t('courseDetails.downloadTooltip', {
                                        percent: '80%'
                                    })}
                                    placement='bottom'
                                >
                                    <ESButton
                                        ghost
                                        type='primary'
                                        icon='download'
                                        disabled={
                                            enrollment.certificate &&
                                            enrollment.certificate.available
                                                ? false
                                                : true
                                        }
                                    >
                                        {t('courseDetails.certified')}
                                    </ESButton>
                                </ESTooltip>
                            </ESRow>
                        </ESCol>
                    </ESRow>
                </SANPortalPagesContainer>
            </ANTPageHeader>
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
