import React, { useState, useCallback, useEffect } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import { useMainContext } from 'Pages/Private/Context'

import {
    SANBox,
    SANTypography,
    SANCardSubSpecialty,
    SANRow,
    SANCol,
    SANQuery,
    useSnackbarContext,
    SANCardSubSpecialtySkeleton,
    SANSkeleton
} from '@sanar/components'

import {
    GET_SUBSPECIALTIES,
    ISubspecialty,
    ISubspecialtyItems,
    ILastAccessed
} from 'Apollo/Subspecialties/Queries/subspecialties'
import {
    GET_LESSONS,
    ILesson,
    ILessonsQuery,
    GET_LESSONS_COMPLETED
} from 'Apollo/Subspecialties/Queries/lessons'

import RMModalThemes from 'Components/ModalThemes'

interface IRouteProps {
    specialtyId: string
}

interface IRMSubspecialtiesProps extends RouteComponentProps<IRouteProps> {}

const skeletons = new Array(8).fill(1)
const renderSkeleton = (_, index) => (
    <SANCol key={index} xs={24} sm={12} md={8} lg={8} xl={6} mb='xl'>
        <SANCardSubSpecialtySkeleton />
    </SANCol>
)

const RMSubspecialtiesSkeleton = () => (
    <>
        <SANBox display='flex' alignItems='center' mb={{ xs: 'xxl', _: 'md' }}>
            <SANSkeleton paragraph={false} title={{ width: '30%' }} />
        </SANBox>
        <SANRow gutter={24}>{skeletons.map(renderSkeleton)}</SANRow>
    </>
)

const RMSubspecialties: React.FC<IRMSubspecialtiesProps> = ({
    match: { params },
    history
}) => {
    const { handleTrack } = useMainContext()
    const client = useApolloClient()
    const createSnackbar = useSnackbarContext()
    const { t } = useTranslation('resmed')
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
                    name: '',
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

    const onStart = ({
        specialtyId,
        subSpecialtyId,
        lesson,
        collectionId,
        resource
    }: ILastAccessed) => {
        const type = resource.type.toLocaleLowerCase()
        if (type === 'quiz') {
            history.push(
                `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${lesson.id}/${collectionId}/quiz/${resource.id}/0`
            )
        } else {
            history.push(
                `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${lesson.id}/${collectionId}/video/${resource.id}`
            )
        }
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
            } = await client.query<ILessonsQuery>({
                query: GET_LESSONS,
                variables: { parentId: subspecialty.id }
            })

            setLessons(lessons)
            fetchCompletedProperty(subspecialty.id)
        } catch (error) {
            createSnackbar({
                message: t('subspecialties.errorLoadLessons'),
                theme: 'error'
            })
        }
        setLoading(false)
    }

    const fetchCompletedProperty = async (parentId: string) => {
        client
            .query<ILessonsQuery>({
                query: GET_LESSONS_COMPLETED,
                variables: { parentId }
            })
            .then(({ data }) => {
                const { lessons } = data
                setLessons(lessons)
            })
            .catch(() =>
                createSnackbar({
                    message: t('subspecialties.errorLoadLessons'),
                    theme: 'error'
                })
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
                    blocked={
                        subspecialty.status === 'construction' ||
                        !subspecialty.lastAccessed
                    }
                    title={subspecialty.name}
                    progress={{
                        me: subspecialty.progress.me,
                        others: subspecialty.progress.all
                    }}
                    image={subspecialty.image}
                    continue={{
                        title: subspecialty.lastAccessed.lesson.name,
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
                                subspecialty.lastAccessed.subSpecialtyId
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
                    skip: !params.specialtyId
                }}
                errorProps={{ flex: 1 }}
                loaderComp={<RMSubspecialtiesSkeleton />}
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

export default withRouter(RMSubspecialties)
