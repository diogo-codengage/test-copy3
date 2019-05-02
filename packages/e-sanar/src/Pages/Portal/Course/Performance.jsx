import React from 'react'
import { useTranslation } from 'react-i18next'

import { Typography } from 'antd'

import ESMetricCard from 'sanar-ui/dist/Components/Molecules/MetricCard'
import ESCard from 'sanar-ui/dist/Components/Molecules/Card'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'

import consistencia from '../../../assets/images/consistencia.svg'
import interacao from '../../../assets/images/interacao.svg'
import praticaRegular from '../../../assets/images/pratica-regular.svg'
import progresso from '../../../assets/images/progresso.svg'

import low from '../../../assets/images/emoticon-low.svg'

import Mock from './mock.json'
import { SANPortalPagesContainer } from '../Layout'

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
                        <Typography.Text strong>
                            {t('courseDetails.cardCommitmentLow')}
                        </Typography.Text>
                        <Typography.Text>
                            {t('courseDetails.cardCommitmentMid')}
                        </Typography.Text>
                        <Typography.Text>
                            {t('courseDetails.cardCommitmentNice')}
                        </Typography.Text>
                    </div>
                </ESCol>
                <ESCol>
                    <Typography.Text strong>{`${percent}% `}</Typography.Text>
                    {t('courseDetails.cardCommitmentDescription')}
                </ESCol>
            </ESRow>
        </ESCard>
    )
}

const SANPerformance = () => {
    const { t } = useTranslation()
    const {
        enrollment: { performance_indicators }
    } = Mock

    return (
        <div className='performance'>
            <SANPortalPagesContainer>
                <ESSessionTitle
                    extra={
                        <ESButton size='small' fontSize={12}>
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
                        xs={24}
                        sm={12}
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
                        xs={24}
                        sm={12}
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
                        xs={24}
                        sm={12}
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
                        xs={24}
                        sm={12}
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
