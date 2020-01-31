import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import { useMainContext } from 'Pages/Private/Context'

import {
    SANBox,
    SANPage,
    SANProgress,
    SANTypography,
    SANIcon,
    SANErrorBoundary,
    SANGenericError
} from '@sanar/components'

import {
    GET_SPECIALTY,
    ISpecialtyQuery,
    ISpecialtyVariables
} from 'Apollo/Subspecialties/Queries/specialty'

import RMSubspecialties from './Subspecialty'

const Progress = ({
    percent,
    loading
}: {
    percent: number
    loading?: boolean
}) => {
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
                    {loading ? <SANIcon type='loading' /> : <>{percent}%</>}
                </SANTypography>
            </SANBox>
            <SANProgress percent={percent} backdrop='grey.1' />
        </SANBox>
    )
}

interface IRouteProps {
    specialtyId: string
}

const RMSpecialty: React.FC<RouteComponentProps<IRouteProps>> = ({
    history,
    match: { params }
}: RouteComponentProps<IRouteProps>) => {
    const { handleTrack } = useMainContext()

    const { data, loading } = useQuery<ISpecialtyQuery, ISpecialtyVariables>(
        GET_SPECIALTY,
        {
            variables: {
                id: params.specialtyId
            }
        }
    )

    return (
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
                onBack: () => {
                    history.push('/inicio/curso')
                    handleTrack('Voltar button clicked')
                },
                SessionTitleProps: {
                    title:
                        !loading && data ? (
                            data.specialty.name
                        ) : (
                            <SANIcon type='loading' />
                        )
                },
                ExtraProps: {
                    md: 7
                },
                extra: (
                    <Progress
                        loading={loading}
                        percent={
                            !loading && !!data ? data.specialty.progress.me : 0
                        }
                    />
                )
            }}
        >
            <SANErrorBoundary
                component={
                    <SANGenericError
                        TypographyProps={{
                            color: 'grey.5'
                        }}
                    />
                }
            >
                <RMSubspecialties />
            </SANErrorBoundary>
        </SANPage>
    )
}

export default withRouter(RMSpecialty)
