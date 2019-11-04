import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANPage,
    SANProgress,
    SANTypography,
    SANCardSubSpecialty,
    SANRow,
    SANCol
} from '@sanar/components'

const arr = [
    {
        index: 1
    },
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    {
        blocked: true
    }
]

const Progress = ({ percent }) => {
    const { t } = useTranslation('resmed')
    return (
        <SANBox>
            <SANBox
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                mb='sm'
            >
                <SANTypography fontSize='sm' fontWeight='bold' mr='sm'>
                    {t('subspecialties.header.completeness')}
                </SANTypography>
                <SANTypography fontSize='sm' fontWeight='bold'>
                    {percent}%
                </SANTypography>
            </SANBox>
            <SANProgress percent={percent} backdrop='grey.1' />
        </SANBox>
    )
}

const RMSubSpecialties = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')

    return (
        <SANPage
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: { xs: '8', _: 'xl' }
            }}
            HeaderProps={{
                onBack: () => history.push('/inicio/curso'),
                SessionTitleProps: {
                    title: 'Clínica Médica'
                },
                ExtraProps: {
                    md: 7
                },
                extra: <Progress percent={45} />
            }}
        >
            <SANBox
                display='flex'
                alignItems='center'
                mb={{ xs: 'xxl', _: 'md' }}
            >
                <SANTypography fontSize='xl' fontWeight='bold' mr='xs'>
                    10
                </SANTypography>
                <SANTypography fontSize='xl'>
                    {t('subspecialties.subheader.title')}
                </SANTypography>
            </SANBox>
            <SANRow gutter={24}>
                {arr.map((e: any, i) => (
                    <SANCol key={i} xs={24} sm={12} md={8} lg={6} mb='xl'>
                        <SANCardSubSpecialty
                            blocked={!!e && !!e.blocked}
                            title='Cirurgia'
                            progress={{ me: 60, others: 45 }}
                            continue={{
                                title: 'Nome da aula exemplo',
                                index: e.index || 3
                            }}
                            onClickRight={console.log}
                            onClickLeft={console.log}
                        />
                    </SANCol>
                ))}
            </SANRow>
        </SANPage>
    )
}

export default withRouter<RouteComponentProps>(RMSubSpecialties)
