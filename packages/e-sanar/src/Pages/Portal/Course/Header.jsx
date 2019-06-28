import React from 'react'

import { Query } from 'react-apollo'

import { PageHeader as ANTPageHeader } from 'antd'
import { SANPortalPagesContainer } from '../Layout'

import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESProgressBar from 'sanar-ui/dist/Components/Molecules/ProgressBar'
import ESTooltip from 'sanar-ui/dist/Components/Atoms/Tooltip'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

import { useTranslation } from 'react-i18next'
import { useAuthContext } from 'Hooks/auth'
import { GET_ENROLLMENT_PROGRESS } from 'Apollo/Me/enrollment-progress'

const SANEnrollmentProgress = () => {
    const { t } = useTranslation('esanar')
    const { getEnrollment } = useAuthContext()

    const { id: enrollmentId } = getEnrollment()

    return (
        <Query
            query={GET_ENROLLMENT_PROGRESS}
            fetchPolicy='cache-and-network'
            variables={{ enrollmentId }}
        >
            {({ loading, error, data }) => {
                if (error) return `Error! ${error.message}`

                return (
                    <ESProgressBar
                        loading={loading}
                        title={t('courseDetails.progressbarTitle')}
                        percent={
                            !loading &&
                            Number(
                                data.enrollmentProgress.progress_percentage.toFixed(
                                    0
                                )
                            )
                        }
                    />
                )
            }}
        </Query>
    )
}

const SANCourseHeader = () => {
    const { t } = useTranslation('esanar')

    const { getEnrollment } = useAuthContext()

    const { course, certificate } = getEnrollment()

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
                                <img alt='' src={course.icon} />
                            </ESCol>
                            <ESCol
                                className='header__container__about-course--descriptions'
                                flex={1}
                            >
                                <ESTypography
                                    variant='overline'
                                    className='mb-xs fc-grey-6'
                                >
                                    {course.knowledge_area}
                                </ESTypography>
                                <ESTypography
                                    className='header__container__about-course--descriptions--name'
                                    strong
                                    ellipsis
                                    level={4}
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
                                <SANEnrollmentProgress />
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
                                        href={certificate && certificate.link}
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
