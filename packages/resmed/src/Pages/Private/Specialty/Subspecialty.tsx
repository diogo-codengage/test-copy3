import React, { useState, useCallback, useEffect } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import { useLayoutContext } from 'Pages/Private/Context'

import {
    SANBox,
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
import { GET_LESSONS, ILesson } from 'Apollo/Subspecialties/Queries/lessons'

import RMModalThemes from 'Components/ModalThemes'

interface IRouteProps {
    specialtyId: string
}

interface IRMSubspecialtiesProps extends RouteComponentProps<IRouteProps> {}

const RMSubspecialties = ({
    match: { params },
    history
}: IRMSubspecialtiesProps) => {
    const { handleTrack } = useLayoutContext()
    const client = useApolloClient()
    const createSnackbar = useSnackbarContext()
    const { t } = useTranslation('resmed')
    const [subSpecialties, setSubSpecialties] = useState([])
    const [loading, setLoading] = useState(false)
    const [lessons, setLessons] = useState<ILesson[]>([])
    const [current, setCurrent] = useState<{
        open: boolean
        subspecialty: Pick<ISubspecialtyItems, 'name' | 'lastAccessed'>
    }>({
        open: false,
        subspecialty: {
            name: '',
            lastAccessed: {
                specialtyId: '',
                subSpecialtyId: '',
                lesson: {
                    id: '',
                    index: 0
                },
                collectionId: '',
                resource: {
                    id: '',
                    type: 'Video',
                    title: ''
                }
            }
        }
    })

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
                                    subspecialty.lastAccessed.subSpecialtyId,
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
                            'Lesson ID': subspecialty.lastAccessed.lesson.id,
                            'Clicker ID': subspecialty.lastAccessed.collectionId
                        })
                    }}
                />
            </SANCol>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

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
        </>
    )
}

export default withRouter<IRMSubspecialtiesProps>(RMSubspecialties)
