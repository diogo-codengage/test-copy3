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

    const {
        me: { enrollments }
    } = useAuthContext()

    const enrollment = enrollments[0]
    const { course: courseMock } = enrollment

    const course = {
        ...courseMock,
        cover_pictures:
            'https://freeiconshop.com/wp-content/uploads/edd/bulb-flat.png'
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
                                    href='http://www.globo.com'
                                    target='_blank'
                                    disabled={
                                        enrollment.certificate &&
                                        enrollment.certificate.available
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
