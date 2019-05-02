import React from 'react'

import { PageHeader as ANTPageHeader, Typography as ANTTypography } from 'antd'
import { SANPortalPagesContainer } from '../Layout'

import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESProgressBar from 'sanar-ui/dist/Components/Molecules/ProgressBar'
import ESTooltip from 'sanar-ui/dist/Components/Atoms/Tooltip'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import { useTranslation } from 'react-i18next'
import { useAuthContext } from '../../../Hooks/auth'

const SANCourseHeader = () => {
    const { t } = useTranslation()

    const { getEnrollment } = useAuthContext()

    const {
        course: courseMock,
        certificate: certificateMock,
        progress_percentage
    } = getEnrollment()

    const course = {
        ...courseMock,
        cover_pictures:
            'https://freeiconshop.com/wp-content/uploads/edd/bulb-flat.png'
    }

    const certificate = {
        ...certificateMock,
        link: 'http://globo.com'
    }

    return (
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
                                <img alt='' src={course.cover_pictures} />
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
                                    title={t('courseDetails.progressbarTitle')}
                                    percent={progress_percentage.toFixed(0)}
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
                                    href={certificate.link}
                                    target='_blank'
                                    disabled={
                                        certificate && certificate.available
                                            ? false
                                            : false
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
    )
}

export default SANCourseHeader
