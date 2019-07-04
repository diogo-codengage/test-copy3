import React from 'react'
import { useTranslation } from 'react-i18next'

import ESMetricCard from 'sanar-ui/dist/Components/Molecules/MetricCard'
import ESCard from 'sanar-ui/dist/Components/Molecules/Card'
import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'
import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'

import consistencia from 'assets/images/consistencia.svg'
import praticaRegular from 'assets/images/pratica-regular.svg'
import progresso from 'assets/images/progresso.svg'

import lowSvg from 'assets/images/emoticon-low.svg'
import midSvg from 'assets/images/emoticon-mid.svg'
import niceSvg from 'assets/images/emoticon-nice.svg'

import { SANPortalPagesContainer } from 'Pages/Portal/Layout'
import { useAuthContext } from 'Hooks/auth'

const statusColor = {
    high: 'success',
    medium: 'warning',
    low: 'danger'
}

const statusCommitment = {
    high: niceSvg,
    medium: midSvg,
    low: lowSvg
}

const CommitmentCard = ({ value, status }) => {
    const { t } = useTranslation('esanar')

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
                    <img src={statusCommitment[status]} alt={`${value}% `} />
                    <div className='performance__card-commitment__content--emoticon--text'>
                        <ESTypography strong={status === 'low'}>
                            {t('courseDetails.cardCommitmentLow')}
                        </ESTypography>
                        <ESTypography strong={status === 'avarage'}>
                            {t('courseDetails.cardCommitmentMid')}
                        </ESTypography>
                        <ESTypography strong={status === 'high'}>
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
                            {`${value}%`}&nbsp;
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
    const { t } = useTranslation('esanar')
    const { getEnrollment } = useAuthContext()
    const { performance } = getEnrollment()

    return (
        <div className='performance'>
            <SANPortalPagesContainer>
                <ESSessionTitle
                    //FIXME: extra={
                    //     <ESButton
                    //         size='xsmall'
                    //         variant='outlined'
                    //         bold
                    //         uppercase
                    //         blockOnlyMobile
                    //     >
                    //         {t('courseDetails.viewMyPerformance')}
                    //     </ESButton>
                    // }
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
                        sm={12}
                        lg={9}
                        alignSelf='stretch'
                        className='mb-md'
                    >
                        <CommitmentCard {...performance.commitment} />
                    </ESCol>
                    <ESCol
                        xs={0}
                        sm={12}
                        lg={5}
                        alignSelf='stretch'
                        className='mb-md'
                    >
                        <ESMetricCard
                            title={t('courseDetails.cardConsistencyTitle')}
                            doubt={t('courseDetails.cardConsistencyDoubt')}
                            img={consistencia}
                            badge={performance.uniformity.value}
                            status={statusColor[performance.uniformity.status]}
                            description={t(
                                'courseDetails.cardConsistencyDescription'
                            )}
                        />
                    </ESCol>
                    <ESCol
                        xs={0}
                        sm={12}
                        lg={5}
                        alignSelf='stretch'
                        className='mb-md'
                    >
                        <ESMetricCard
                            title={t('courseDetails.cardProgressTitle')}
                            doubt={t('courseDetails.cardProgressDoubt')}
                            img={progresso}
                            badge={t('global.percentOf', {
                                done: performance.progress.done,
                                final: performance.progress.total
                            })}
                            status={statusColor[performance.progress.status]}
                            description={t(
                                'courseDetails.cardProgressDescription'
                            )}
                        />
                    </ESCol>
                    <ESCol
                        xs={0}
                        sm={12}
                        lg={5}
                        alignSelf='stretch'
                        className='mb-md'
                    >
                        <ESMetricCard
                            title={t('courseDetails.cardPracticeTitle')}
                            doubt={t('courseDetails.cardPracticeDoubt')}
                            img={praticaRegular}
                            badge={t('global.percentOf', {
                                done: performance.tests.done,
                                final: performance.tests.total
                            })}
                            status={statusColor[performance.tests.status]}
                            description={t(
                                'courseDetails.cardPracticeDescription'
                            )}
                        />
                    </ESCol>
                    {/*FIXME: <ESCol
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
                            badge={performance.interaction.value}
                            status={statusColor[performance.interaction.status]}
                            description={t(
                                'courseDetails.cardInteractionDescription'
                            )}
                        />
                    </ESCol> */}
                </ESRow>
            </SANPortalPagesContainer>
        </div>
    )
}

export default SANPerformance
