import React, { useState, useCallback, useEffect } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { useLayoutContext } from 'Pages/Private/Context'

import {
    SANBox,
    SANPage,
    SANProgress,
    SANTypography,
    SANCardSubSpecialty,
    SANRow,
    SANCol,
    SANQuery,
    useSnackbarContext,
    SANIcon
} from '@sanar/components'

import {
    GET_SUBSPECIALTIES,
    ISubspecialty,
    ISubspecialtyItems,
    ILastAccessed
} from 'Apollo/Subspecialties/Queries/subspecialties'
import { GET_LESSONS, ILesson } from 'Apollo/Subspecialties/Queries/lessons'
import { GET_SPECIALTY } from 'Apollo/Subspecialties/Queries/specialty'

import RMModalThemes from 'Components/ModalThemes'

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

interface IRMSubspecialtiesProps extends RouteComponentProps<IRouteProps> {
    onSeeLessons: (subspecialtyId: any) => void
}

const RMSubspecialties = withRouter<IRMSubspecialtiesProps>(
    ({ match: { params }, history, onSeeLessons }: IRMSubspecialtiesProps) => {
        const { handleTrack } = useLayoutContext()
        const { t } = useTranslation('resmed')
        const [subSpecialties, setSubSpecialties] = useState([])

        useEffect(() => {
            handleTrack('Specialty viewed', {
                'Specialty ID': params.specialtyId
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [params.specialtyId])

        useEffect(() => {
            subSpecialties.forEach((subspecialty: ISubspecialtyItems) => {
                handleTrack('Subspecialty viewed', {
                    'Specialty ID': params.specialtyId,
                    'Subspecialty ID': subspecialty.id
                })
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [subSpecialties, params.specialtyId])

        const onCompleted = ({ subSpecialties }) =>
            setSubSpecialties(subSpecialties.items)

        const onStart = ({
            specialtyId,
            subSpecialtyId,
            lesson,
            collectionId,
            resource
        }: ILastAccessed) => {
            history.push(
                `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${
                    lesson.id
                }/${collectionId}/${resource.type.toLocaleLowerCase()}/${
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
                        blocked={subspecialty.status === 'construction'}
                        title={subspecialty.name}
                        progress={{
                            me: subspecialty.progress.me,
                            others: subspecialty.progress.all
                        }}
                        image={subspecialty.image}
                        continue={{
                            title: subspecialty.lastAccessed.resource.title,
                            index: subspecialty.lastAccessed.lesson.index,
                            onClick: () => {
                                onStart(subspecialty.lastAccessed)
                                handleTrack('Continuar button clicked', {
                                    'Specialty ID':
                                        subspecialty.lastAccessed.specialtyId,
                                    'Subspecialty ID':
                                        subspecialty.lastAccessed
                                            .subSpecialtyId,
                                    'Lesson ID':
                                        subspecialty.lastAccessed.lesson.id,
                                    'Clicker ID':
                                        subspecialty.lastAccessed.collectionId
                                })
                            }
                        }}
                        onClick={() => {
                            onSeeLessons(subspecialty)
                            handleTrack('Ver aulas button clicked', {
                                'Specialty ID':
                                    subspecialty.lastAccessed.specialtyId,
                                'Subspecialty ID':
                                    subspecialty.lastAccessed.subSpecialtyId,
                                'Lesson ID':
                                    subspecialty.lastAccessed.lesson.id,
                                'Clicker ID':
                                    subspecialty.lastAccessed.collectionId
                            })
                        }}
                    />
                </SANCol>
            ),
            // eslint-disable-next-line react-hooks/exhaustive-deps
            []
        )

        return (
            <SANQuery
                query={GET_SUBSPECIALTIES}
                options={{
                    variables: { parentId: params.specialtyId },
                    skip: !params.specialtyId,
                    onCompleted: onCompleted
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

const RMSpecialty = ({
    history,
    match: { params }
}: RouteComponentProps<IRouteProps>) => {
    const { handleTrack } = useLayoutContext()
    const { t } = useTranslation('resmed')
    const client = useApolloClient()
    const createSnackbar = useSnackbarContext()
    const [current, setCurrent] = useState({
        open: false,
        subspecialty: {
            name: '',
            lastAccessed: {
                specialtyId: '',
                subSpecialtyId: '',
                lesson: {
                    id: ''
                },
                collectionId: '',
                resource: {
                    id: '',
                    type: 'Video',
                    index: '',
                    title: ''
                }
            }
        }
    })
    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<ILesson[]>([])

    const {
        data: { specialty },
        loading: loadingSpecialty
    } = useQuery<any, any>(GET_SPECIALTY, {
        variables: {
            id: params.specialtyId
        }
    })

    const onCancel = () => {
        setCurrent(old => ({ ...old, open: false }))
        setLessons([])
    }

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

    const onStart = ({
        specialtyId,
        subSpecialtyId,
        lesson,
        collectionId,
        resource
    }) => {
        history.push(
            `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${
                lesson.id
            }/${collectionId}/${resource.type.toLocaleLowerCase()}/${
                resource.id
            }`
        )
    }

    return (
        <>
            <RMModalThemes
                visible={current.open}
                title={current.subspecialty.name}
                onCancel={onCancel}
                onContinue={() => {
                    onStart(current.subspecialty.lastAccessed)
                    handleTrack('Continuar de onde parei button clicked', {
                        'Specialty ID':
                            current.subspecialty.lastAccessed.specialtyId,
                        'Subspecialty ID':
                            current.subspecialty.lastAccessed.subSpecialtyId,
                        'Lesson ID':
                            current.subspecialty.lastAccessed.lesson.id,
                        'Clicker ID':
                            current.subspecialty.lastAccessed.collectionId
                    })
                }}
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
                <RMSubspecialties onSeeLessons={onSeeLessons} />
            </SANPage>
        </>
    )
}

export default withRouter<RouteComponentProps<IRouteProps>>(RMSpecialty)
