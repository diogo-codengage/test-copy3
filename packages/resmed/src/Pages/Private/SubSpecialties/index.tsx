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
    ISubspecialty,
    ISubspecialtyItems,
    ILastAccessed
} from 'Apollo/Subspecialties/Queries/subspecialties'
import { GET_LESSONS } from 'Apollo/Subspecialties/Queries/lessons'

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
    onSeeLessons: (subspecialtyId: any) => void
}

const RMSubspecialties = withRouter<IRMSubspecialtiesProps>(
    ({ match: { params }, history, onSeeLessons }: IRMSubspecialtiesProps) => {
        const { t } = useTranslation('resmed')

        const onStart = ({
            specialtyId,
            subSpecialtyId,
            lessonId,
            collectionId,
            resource
        }: ILastAccessed) => {
            // TODO: When implements classroom route, use this:
            // history.push(
            //     `/sala-aula/${specialtyId}/${subSpecialtyId}/${lessonId}/${collectionId}/${resource.type.toLocaleLowerCase()}/${
            //         resource.id
            //     }`
            // )
            console.log(
                `/sala-aula/${specialtyId}/${subSpecialtyId}/${lessonId}/${collectionId}/${resource.type.toLocaleLowerCase()}/${
                    resource.id
                }`
            )
        }

        const renderSubspecialty = useCallback(
            (subspecialty: ISubspecialtyItems) => (
                <SANCol
                    key={subspecialty.id}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={8}
                    xl={6}
                    mb='xl'
                >
                    <SANCardSubSpecialty
                        blocked={false}
                        title={subspecialty.name}
                        progress={{
                            me: subspecialty.progress.me,
                            others: subspecialty.progress.all
                        }}
                        continue={{
                            title: subspecialty.lastAccessed.resource.title,
                            index: subspecialty.lastAccessed.resource.index
                        }}
                        onClickRight={() => onSeeLessons(subspecialty)}
                        onClickLeft={() => onStart(subspecialty.lastAccessed)}
                    />
                </SANCol>
            ),
            [onSeeLessons]
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
                    data: {
                        subSpecialties: { items, totalCount }
                    }
                }: {
                    data: { subSpecialties: ISubspecialty }
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
                                {totalCount}
                            </SANTypography>
                            <SANTypography fontSize='xl'>
                                {t('subspecialties.subheader.title')}
                            </SANTypography>
                        </SANBox>
                        <SANRow gutter={24}>
                            {items.map(renderSubspecialty)}
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
    const [current, setCurrent] = useState({
        open: false,
        subspecialty: {
            name: ''
        }
    })
    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState([])

    const onSeeLessons = async subspecialty => {
        setLoading(true)
        setCurrent({
            open: true,
            subspecialty
        })
        try {
            const {
                data: { lessons }
            } = await client.query({
                query: GET_LESSONS,
                variables: { parentId: subspecialty.id }
            })

            setLessons(lessons)
        } catch (error) {
            createSnackbar({
                message: t('subspecialties.errorLoadLessons'),
                theme: 'error'
            })
        }
        setLoading(false)
    }

    return (
        <>
            <RMModalThemes
                visible={current.open}
                title={current.subspecialty.name}
                onCancel={() => setCurrent(old => ({ ...old, open: false }))}
                onContinue={console.log}
                themes={lessons}
                loading={loading}
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
