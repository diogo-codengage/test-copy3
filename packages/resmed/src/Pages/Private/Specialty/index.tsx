import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import { useLayoutContext } from 'Pages/Private/Context'

import {
    SANBox,
    SANPage,
    SANProgress,
    SANTypography,
    SANIcon
} from '@sanar/components'

import { GET_SPECIALTY } from 'Apollo/Subspecialties/Queries/specialty'

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

const RMSpecialty = ({
    history,
    match: { params }
}: RouteComponentProps<IRouteProps>) => {
    const { handleTrack } = useLayoutContext()

    const {
        data: { specialty },
        loading: loadingSpecialty
    } = useQuery<any, any>(GET_SPECIALTY, {
        variables: {
            id: params.specialtyId
        }
    })
    return (
        <>
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
                        title: !loadingSpecialty ? (
                            specialty.name
                        ) : (
                            <SANIcon type='loading' />
                        )
                    },
                    ExtraProps: {
                        md: 7
                    },
                    extra: (
                        <Progress
                            loading={loadingSpecialty}
                            percent={!loadingSpecialty && specialty.progress.me}
                        />
                    )
                }}
            >
                <RMSubspecialties />
            </SANPage>
        </>
    )
}

export default withRouter<RouteComponentProps<IRouteProps>>(RMSpecialty)
