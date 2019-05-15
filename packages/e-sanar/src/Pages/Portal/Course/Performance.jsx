import React from 'react'
import { useTranslation } from 'react-i18next'

import ESMetricCard from 'sanar-ui/dist/Components/Molecules/MetricCard'
import ESCard from 'sanar-ui/dist/Components/Molecules/Card'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

import consistencia from 'assets/images/consistencia.svg'
import interacao from 'assets/images/interacao.svg'
import praticaRegular from 'assets/images/pratica-regular.svg'
import progresso from 'assets/images/progresso.svg'

import low from 'assets/images/emoticon-low.svg'

import { SANPortalPagesContainer } from '../Layout'
// import { useAuthContext } from 'Hooks/auth'

const CommitmentCard = ({ percent }) => {
    const { t } = useTranslation()

    return (
        <ESCard
            title={t('courseDetails.cardCommitmentTitle')}
            doubt={t('courseDetails.cardCommitmentDoubt')}
            className='performance__card-commitment'
        >
            <ESRow
                type='flex'
                direction='column'
                className='performance__card-commitment__content'
            >
                <ESCol className='performance__card-commitment__content--emoticon'>
                    <img src={low} alt={`${percent}% `} />
                    <div className='performance__card-commitment__content--emoticon--text'>
                        <ESTypography strong>
                            {t('courseDetails.cardCommitmentLow')}
                        </ESTypography>
                        <ESTypography>
                            {t('courseDetails.cardCommitmentMid')}
                        </ESTypography>
                        <ESTypography>
                            {t('courseDetails.cardCommitmentNice')}
                        </ESTypography>
                    </div>
                </ESCol>
                <ESCol>
                    <ESRow type='flex'>
                        <ESTypography
                            className='fc-grey-7'
                            variant='caption'
                            strong
                        >
                            {`${percent}%`}&nbsp;
                        </ESTypography>
                        <ESTypography className='fc-grey-7' variant='caption'>
                            {t('courseDetails.cardCommitmentDescription')}
                        </ESTypography>
                    </ESRow>
                </ESCol>
            </ESRow>
        </ESCard>
    )
}

const SANPerformance = () => {
    const { t } = useTranslation()
    // const { getEnrollment } = useAuthContext()
    // const {
    //     performance_indicators: performance_indicatorsProp
    // } = getEnrollment()

    const performance_indicators = {
        commitment: 38,
        uniformity: 24,
        progress: {
            done: 12,
            total: 93
        },
        tests: {
            done: 12,
            total: 93
        },
        interatction: 123
    }

    return (
        <div className='performance'>
            <SANPortalPagesContainer>
                <ESSessionTitle
                    extra={
                        <ESButton
                            size='xsmall'
                            variant='outlined'
                            bold
                            uppercase
                        >
                            {t('courseDetails.viewMyPerformance')}
                        </ESButton>
                    }
                    title={t('courseDetails.myDevelopment')}
                    subtitle={t('courseDetails.myDevelopmentSubtitle')}
                />
                <ESRow
                    type='flex'
                    gutter={20}
                    justify='space-between'
                    align='top'
                >
                    <ESCol
                        xs={24}
                        sm={24}
                        md={16}
                        lg={8}
                        alignSelf='stretch'
                        className='mb-md'
                    >
                        <CommitmentCard
                            percent={performance_indicators.commitment}
                        />
                    </ESCol>
                    <ESCol
                        xs={0}
                        md={8}
                        lg={4}
                        alignSelf='stretch'
                        className='mb-md'
                    >
                        <ESMetricCard
                            title={t('courseDetails.cardConsistencyTitle')}
                            doubt={t('courseDetails.cardConsistencyDoubt')}
                            img={consistencia}
                            badge={performance_indicators.uniformity}
                            status='success'
                            description={t(
                                'courseDetails.cardConsistencyDescription'
                            )}
                        />
                    </ESCol>
                    <ESCol
                        xs={0}
                        md={8}
                        lg={4}
                        alignSelf='stretch'
                        className='mb-md'
                    >
                        <ESMetricCard
                            title={t('courseDetails.cardProgressTitle')}
                            doubt={t('courseDetails.cardProgressDoubt')}
                            img={progresso}
                            badge={t('global.percentOf', {
                                done: performance_indicators.progress.done,
                                final: performance_indicators.progress.total
                            })}
                            status='success'
                            description={t(
                                'courseDetails.cardProgressDescription'
                            )}
                        />
                    </ESCol>
                    <ESCol
                        xs={0}
                        md={8}
                        lg={4}
                        alignSelf='stretch'
                        className='mb-md'
                    >
                        <ESMetricCard
                            title={t('courseDetails.cardPracticeTitle')}
                            doubt={t('courseDetails.cardPracticeDoubt')}
                            img={praticaRegular}
                            badge={t('global.percentOf', {
                                done: performance_indicators.tests.done,
                                final: performance_indicators.tests.total
                            })}
                            status='warning'
                            description={t(
                                'courseDetails.cardPracticeDescription'
                            )}
                        />
                    </ESCol>
                    <ESCol
                        xs={0}
                        md={8}
                        lg={4}
                        alignSelf='stretch'
                        className='mb-md'
                    >
                        <ESMetricCard
                            title={t('courseDetails.cardInteractionTitle')}
                            doubt={t('courseDetails.cardInteractionDoubt')}
                            img={interacao}
                            badge={performance_indicators.interatction}
                            status='danger'
                            description={t(
                                'courseDetails.cardInteractionDescription'
                            )}
                        />
                    </ESCol>
                </ESRow>
            </SANPortalPagesContainer>
        </div>
    )
}

export default SANPerformance
