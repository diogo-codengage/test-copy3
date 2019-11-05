import React, { useState, useCallback } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
    SANBox,
    SANPage,
    SANProgress,
    SANTypography,
    SANCardSubSpecialty,
    SANRow,
    SANCol,
    SANQuery
} from '@sanar/components'

import {
    GET_SUBSPECIALTIES,
    ISubspecialties
} from 'Apollo/User/Queries/subspecialties'
import RMModalThemes from 'Components/ModalThemes'

const themes = [
    {
        name: 'Nome da aula',
        completed: true,
        blocked: false
    },
    {
        name: 'Nome da aula',
        completed: true,
        blocked: false
    },
    {
        name: 'Nome da aula',
        completed: true,
        blocked: false
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: false
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: false
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
        blocked: true
    },
    {
        name: 'Nome da aula',
        completed: false,
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

interface IRouteProps {
    specialtyId: string
}

const RMSubspecialties = withRouter<RouteComponentProps<IRouteProps>>(
    ({ match: { params } }: RouteComponentProps<IRouteProps>) => {
        const { t } = useTranslation('resmed')

        const renderSubspecialty = useCallback(
            subspecialty => (
                <SANCol
                    key={subspecialty.id}
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    mb='xl'
                >
                    <SANCardSubSpecialty
                        blocked={false}
                        title={subspecialty.name}
                        progress={{ me: 60, others: 45 }}
                        continue={{
                            title: 'Nome da aula exemplo',
                            index: 3
                        }}
                        onClickRight={console.log}
                        onClickLeft={console.log}
                    />
                </SANCol>
            ),
            []
        )

        return (
            <SANQuery
                query={GET_SUBSPECIALTIES}
                options={{
                    variables: { parentId: params.specialtyId },
                    skip: !params.specialtyId
                }}
                loaderProps={{ minHeight: '250px', flex: true }}
                errorProps={{ flex: 1 }}
            >
                {({
                    data: { subspecialties }
                }: {
                    data: { subspecialties: ISubspecialties[] }
                }) => (
                    <>
                        <SANBox
                            display='flex'
                            alignItems='center'
                            mb={{ xs: 'xxl', _: 'md' }}
                        >
                            <SANTypography
                                fontSize='xl'
                                fontWeight='bold'
                                mr='xs'
                            >
                                10
                            </SANTypography>
                            <SANTypography fontSize='xl'>
                                {t('subspecialties.subheader.title')}
                            </SANTypography>
                        </SANBox>
                        <SANRow gutter={24}>
                            {subspecialties.map(renderSubspecialty)}
                        </SANRow>
                    </>
                )}
            </SANQuery>
        )
    }
)

const RMSubSpecialties = ({ history }: RouteComponentProps) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <RMModalThemes
                visible={open}
                title='Clínica Médica'
                onCancel={() => setOpen(false)}
                onContinue={console.log}
                themes={themes}
            />
            <SANPage
                hasContainer
                ContainerProps={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}
                BoxProps={{
                    bg: 'grey-solid.1',
                    py: { xs: '8', _: 'xl' },
                    display: 'flex',
                    flexDirection: 'column'
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
                <RMSubspecialties />
            </SANPage>
        </>
    )
}

export default withRouter<RouteComponentProps>(RMSubSpecialties)
