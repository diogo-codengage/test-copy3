import React from 'react'

import { PageHeader as ANTPageHeader } from 'antd'
import { SANPortalPagesContainer } from '../Layout'

import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESProgressBar from 'sanar-ui/dist/Components/Molecules/ProgressBar'
import ESTooltip from 'sanar-ui/dist/Components/Atoms/Tooltip'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

import { useTranslation } from 'react-i18next'
import { useAuthContext } from 'Hooks/auth'

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
        <ANTPageHeader className='header'>
            <SANPortalPagesContainer>
                <ESRow
                    className='header__container'
                    type='flex'
                    align='middle'
                    gutter={20}
                >
                    <ESCol
                        xs={24}
                        md={10}
                        lg={12}
                        className='header__container__about-course'
                    >
                        <ESRow type='flex' align='middle' gutter={16}>
                            <ESCol>
                                <img alt='' src={course.cover_pictures} />
                            </ESCol>
                            <ESCol
                                className='header__container__about-course--descriptions'
                                flex={1}
                            >
                                <ESTypography
                                    variant='overline'
                                    className='mt-md'
                                >
                                    {course.knowledge_area}
                                </ESTypography>
                                <ESTypography
                                    className='header__container__about-course--descriptions--name'
                                    strong
                                    ellipsis
                                    level={3}
                                >
                                    {course.name}
                                </ESTypography>{' '}
                            </ESCol>
                        </ESRow>
                    </ESCol>
                    <ESCol
                        xs={24}
                        md={14}
                        lg={12}
                        className='header__container__progress'
                    >
                        <ESRow gutter={20} type='flex' justify='center'>
                            <ESCol xs={24} sm={16} md={14} lg={15}>
                                <ESProgressBar
                                    title={t('courseDetails.progressbarTitle')}
                                    percent={Number(
                                        progress_percentage.toFixed(0)
                                    )}
                                />
                            </ESCol>

                            <ESTooltip
                                title={t('courseDetails.downloadTooltip', {
                                    percent: '80%'
                                })}
                                placement='bottom'
                            >
                                <span className='header__container__progress__container-certify-button'>
                                    <ESButton
                                        variant='outlined'
                                        icon='download'
                                        size='small'
                                        href={certificate.link}
                                        target='_blank'
                                        disabled={
                                            certificate && certificate.available
                                                ? false
                                                : true
                                        }
                                    >
                                        {t('courseDetails.certified')}
                                    </ESButton>
                                </span>
                            </ESTooltip>
                        </ESRow>
                    </ESCol>
                </ESRow>
            </SANPortalPagesContainer>
        </ANTPageHeader>
    )
}

export default SANCourseHeader
