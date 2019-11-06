import React, { useState, useCallback } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import {
    SANBox,
    SANPage,
    SANProgress,
    SANTypography,
    SANCardSubSpecialty,
    SANRow,
    SANCol,
    SANQuery,
    useSnackbarContext
} from '@sanar/components'

import {
    GET_SUBSPECIALTIES,
    ISubspecialty
} from 'Apollo/Subspecialties/Queries/subspecialties'
import { GET_LESSONS, ILesson } from 'Apollo/Subspecialties/Queries/lessons'

import RMModalThemes from 'Components/ModalThemes'

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

interface IRMSubspecialtiesProps extends RouteComponentProps<IRouteProps> {
    onSeeLessons: (subspecialtyId: string) => void
}

const RMSubspecialties = withRouter<IRMSubspecialtiesProps>(
    ({ match: { params }, onSeeLessons }: IRMSubspecialtiesProps) => {
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
                        onClickRight={() => onSeeLessons(subspecialty.id)}
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
                    data: { subSpecialties }
                }: {
                    data: { subSpecialties: ISubspecialty[] }
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
                            {subSpecialties.map(renderSubspecialty)}
                        </SANRow>
                    </>
                )}
            </SANQuery>
        )
    }
)

const RMSubSpecialties = ({ history }: RouteComponentProps) => {
    const { t } = useTranslation('resmed')
    const client = useApolloClient()
    const createSnackbar = useSnackbarContext()
    const [open, setOpen] = useState(false)
    const [lessons, setLessons] = useState([])

    const onSeeLessons = async subspecialtyId => {
        try {
            const {
                data: { lessons }
            } = await client.query({
                query: GET_LESSONS,
                variables: { parentId: subspecialtyId }
            })

            setLessons(lessons)
        } catch (error) {
            createSnackbar({
                message: t('subspecialties.errorLoadLessons'),
                theme: 'error'
            })
        }
        setOpen(true)
    }

    return (
        <>
            <RMModalThemes
                visible={open}
                title='Clínica Médica'
                onCancel={() => setOpen(false)}
                onContinue={console.log}
                themes={lessons}
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
                <RMSubspecialties onSeeLessons={onSeeLessons} />
            </SANPage>
        </>
    )
}

export default withRouter<RouteComponentProps>(RMSubSpecialties)
