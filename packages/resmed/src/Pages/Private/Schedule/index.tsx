import React, { useState, useCallback, useEffect } from 'react'

import { format } from 'date-fns'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import {
    SANPage,
    SANCardSchedule,
    SANBigCalendar,
    SANButton,
    SANSwitch,
    SANRow,
    SANCol,
    SANTypography,
    SANEvaIcon,
    SANBox,
    SANLayoutContainer,
    SANSessionTitle
} from '@sanar/components'

const Suggestion = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${theme('colors.grey.1')};
    border-radius: ${theme('radii.base')};
    padding: ${theme('space.sm')} ${theme('space.lg')};
`

const RMSchedule = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')

    const boxProps = {
        py: { xs: '8', _: 'xl' },
        display: 'flex',
        flexDirection: 'column'
    }

    return (
        <SANPage
            HeaderProps={{
                onBack: () => history.push('/inicio/curso'),
                SessionTitleProps: {
                    title: t('schedule.header.title'),
                    subtitle: t('schedule.header.subtitle')
                }
            }}
        >
            <SANBox bg='grey-solid.1' {...boxProps}>
                <SANLayoutContainer>
                    <SANBigCalendar events={[]} />

                    <SANBox
                        mt={{ xs: '8', _: 'lg' }}
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                    >
                        <Suggestion>
                            <SANTypography fontWeight='bold' mr='lg'>
                                {t('schedule.suggestion')}
                            </SANTypography>
                            <SANSwitch />
                        </Suggestion>
                        <SANButton size='small' variant='outlined' bold>
                            <SANEvaIcon name='download-outline' mr='xs' />
                            {t('schedule.pdfDownload')}
                        </SANButton>
                    </SANBox>
                </SANLayoutContainer>
            </SANBox>
            <SANBox {...boxProps}>
                <SANLayoutContainer>
                    <SANRow gutter={24}>
                        <SANCol xs={24} sm={24} md={12}>
                            <SANSessionTitle
                                title={t('schedule.today')}
                                subtitle={
                                    <SANTypography transform='uppercase'>
                                        {format(new Date(), 'DD/MM/YYYY')}
                                    </SANTypography>
                                }
                            />
                        </SANCol>
                        <SANCol xs={24} sm={24} md={12}>
                            <SANSessionTitle
                                title={t('schedule.thisWeek.title')}
                                subtitle={t('schedule.thisWeek.subtitle')}
                            />
                        </SANCol>
                    </SANRow>
                </SANLayoutContainer>
            </SANBox>
        </SANPage>
    )
}

export default withRouter<RouteComponentProps>(RMSchedule)
