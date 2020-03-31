import React, { useMemo, useState, useEffect } from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { theme } from 'styled-tools'
import { useLazyQuery } from '@apollo/react-hooks'
import { Tooltip } from 'antd'

import {
    SANButton,
    SANTypography,
    SANModal,
    SANBox,
    SANEvaIcon,
    SANScroll,
    SANGenericError,
    SANSkeleton
} from '@sanar/components'

import { IAppointment } from 'Apollo/Schedule/Queries/appointments'
import {
    GET_COLLECTIONS,
    ICollectionsQuery,
    ICollectionsVariables
} from 'Apollo/Schedule/Queries/collections'
import { useMainContext } from '../Context'

type IStatus = 'viewed' | 'unseen' | 'live' | 'exams'

export interface IOption extends Partial<IAppointment> {
    status: IStatus
    title: string
    subtitle: string
    description: string
}

interface IModalProps {
    onCancel: () => void
    visible: boolean
}

const defaultOption: IOption = {
    status: 'unseen',
    title: '',
    subtitle: '',
    description: ''
}

interface IRMModalSchedule extends IModalProps, RouteComponentProps {
    options: IOption
}

const types = ['viewed', 'unseen', 'live', 'exams']

const Badge = styled.sup`
    &&& {
        position: absolute;
        right: 0;
        top: 0;
        border-radius: 3px;
        width: 6px;
        height: 6px;
        background-color: ${theme('colors.error')};
    }
`

const Header = ({ seeDetails, hasDetails, hasFinished }) => {
    const { t } = useTranslation('resmed')
    return (
        <SANBox display='flex' alginItems='center'>
            <SANBox mr='sm'>{t('schedule.modal.lesson.title')}</SANBox>
            <Tooltip
                title={
                    hasDetails
                        ? t('schedule.modal.lesson.hideContent')
                        : t('schedule.modal.lesson.showContent')
                }
            >
                <SANBox position='relative'>
                    <SANButton
                        circle
                        size='xsmall'
                        onClick={() => seeDetails(old => !old)}
                        hasFinished={hasFinished}
                        variant='outlined'
                    >
                        <SANEvaIcon
                            name={
                                hasDetails ? 'eye-outline' : 'eye-off-outline'
                            }
                        />
                    </SANButton>
                    {!hasFinished && <Badge />}
                </SANBox>
            </Tooltip>
        </SANBox>
    )
}
const iconCompleted = {
    name: 'checkmark-circle-2',
    color: 'success'
}

const videoIcon = {
    name: 'video',
    color: 'warning'
}

const quizIcon = {
    name: 'edit-2',
    color: 'warning'
}

const RowCollection = styled(SANBox)`
    cursor: pointer;
    &:hover {
        background-color: ${theme('colors.grey.0')};
    }
`

const arrSkeleton = new Array(5).fill(1).map((_, i) => i + 1)
const renderSkeleton = i => (
    <SANBox key={i} my='-7px' px='lg'>
        <SANSkeleton paragraph={false} />
    </SANBox>
)

const renderCollection = (collection, accessContent) => (
    <CollectionDetail
        key={collection.id}
        collection={collection}
        accessContent={accessContent}
    />
)

const CollectionDetail = withRouter<any, any>(
    ({ collection, accessContent, history }) => {
        const { t } = useTranslation('resmed')

        const videoCompleted = useMemo(
            () => collection.content.video.progress === 100,
            [collection]
        )

        const quizCompleted = useMemo(
            () =>
                !!collection.content.quiz &&
                collection.content.quiz.progress === 100,
            [collection]
        )

        const videoProps = videoCompleted ? iconCompleted : videoIcon
        const quizProps = quizCompleted ? iconCompleted : quizIcon

        const goToCollection = () => {
            if (!!accessContent) {
                const { specialtyId, subSpecialtyId, lesson } = accessContent

                const final = `${lesson.id}/${collection.id}/video/${collection.content.video.id}`
                if (!!subSpecialtyId) {
                    history.push(
                        `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${final}`
                    )
                } else {
                    history.push(`/inicio/sala-aula/${specialtyId}/${final}`)
                }
            }
        }

        return (
            <RowCollection
                key={collection.id}
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                py='xxs'
                px='lg'
                onClick={goToCollection}
            >
                <SANTypography>{collection.name}</SANTypography>
                <SANBox display='flex' alignItems='center'>
                    <Tooltip
                        title={
                            videoCompleted
                                ? t(
                                      'schedule.modal.lesson.progress.video.completed'
                                  )
                                : t(
                                      'schedule.modal.lesson.progress.video.incomplete'
                                  )
                        }
                        placement='topLeft'
                        mouseEnterDelay={0.3}
                    >
                        <SANEvaIcon {...videoProps} />
                    </Tooltip>
                    {!!collection.content.quiz && (
                        <Tooltip
                            title={
                                quizCompleted
                                    ? t(
                                          'schedule.modal.lesson.progress.video.completed'
                                      )
                                    : t(
                                          'schedule.modal.lesson.progress.video.incomplete'
                                      )
                            }
                            placement='topLeft'
                            mouseEnterDelay={0.3}
                        >
                            <SANEvaIcon ml='xxs' {...quizProps} />
                        </Tooltip>
                    )}
                </SANBox>
            </RowCollection>
        )
    }
)

export const RMModalSchedule = withRouter(
    ({
        options = defaultOption,
        history,
        onCancel,
        ...props
    }: IRMModalSchedule) => {
        const { t } = useTranslation('resmed')
        const [
            getCollections,
            { data: dataCollections, loading: loadingCollections }
        ] = useLazyQuery<ICollectionsQuery, ICollectionsVariables>(
            GET_COLLECTIONS
        )
        const { handleTrack } = useMainContext()
        const [hasDetails, seeDetails] = useState(false)

        const handleClick = () => {
            handleTrack('Cronograma Used', {
                'Resource type':
                    options.resourceType === 'Level'
                        ? 'Lesson'
                        : options.resourceType,
                'Resource ID': options.resourceId
            })
            if (!!options) {
                if (!!options.accessContent) {
                    const {
                        specialtyId,
                        subSpecialtyId,
                        lesson,
                        collectionId,
                        resource
                    } = options.accessContent

                    if (options.resourceType === 'Level') {
                        const final = `${
                            lesson.id
                        }/${collectionId}/${resource.type.toLocaleLowerCase()}/${
                            resource.id
                        }`
                        if (!!subSpecialtyId) {
                            history.push(
                                `/inicio/sala-aula/${specialtyId}/${subSpecialtyId}/${final}`
                            )
                        } else {
                            history.push(
                                `/inicio/sala-aula/${specialtyId}/${final}`
                            )
                        }
                    }
                } else if (!!options.accessLive) {
                    if (options.resourceType === 'Live') {
                        const { startDate, endDate, id } = options.accessLive
                        const currentDate = new Date().getTime()
                        const startLive = new Date(startDate).getTime()
                        const endLive = new Date(endDate).getTime()

                        if (
                            currentDate >= startLive &&
                            currentDate <= endLive
                        ) {
                            history.push('/inicio/lives/atual')
                        } else if (currentDate > endLive) {
                            history.push(`/inicio/lives/anterior/${id}`)
                        }
                    }
                }
            }
        }

        const handleCancel = () => {
            seeDetails(false)
            onCancel()
        }

        useEffect(() => {
            if (!!hasDetails && !!options.accessContent) {
                const { lesson } = options.accessContent
                getCollections({
                    variables: {
                        parentId: lesson.id
                    }
                })
            }
        }, [hasDetails, options, getCollections])

        const title = useMemo(() => {
            switch (options.status) {
                case 'viewed' || 'unseen':
                    return (
                        <Header
                            hasDetails={hasDetails}
                            seeDetails={seeDetails}
                            hasFinished={options.seen}
                        />
                    )
                case 'live':
                    return t('schedule.modal.live.title')
                case 'exams':
                    return t('schedule.modal.exams.title')
                default:
                    return (
                        <Header
                            hasDetails={hasDetails}
                            seeDetails={seeDetails}
                            hasFinished={options.seen}
                        />
                    )
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [options, hasDetails])

        const button = useMemo(() => {
            const disable = false
            switch (options.status) {
                case 'viewed':
                    return {
                        disable,
                        label: t('schedule.modal.lesson.watched')
                    }
                case 'unseen':
                    return { disable, label: t('schedule.modal.lesson.watch') }
                case 'live':
                    const currentDate = new Date().getTime()
                    const startDate = new Date(options.start!).getTime()
                    return startDate > currentDate
                        ? {
                              disable: true,
                              label: t('schedule.modal.live.comingSoon')
                          }
                        : { disable, label: t('schedule.modal.live.button') }
                default:
                    return { disable, label: t('schedule.modal.lesson.watch') }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [options])

        if (!types.includes(options.status)) return null

        return (
            <SANModal
                width={360}
                title={title}
                centered
                onCancel={handleCancel}
                {...props}
            >
                <SANBox mx={hasDetails ? '-24px' : '0'}>
                    {!hasDetails ? (
                        <>
                            <SANTypography
                                fontSize='lg'
                                color='grey.7'
                                ellipsis={{ rows: 2 }}
                                height={48}
                            >
                                {options.title}
                            </SANTypography>
                            <SANTypography
                                fontSize='xs'
                                color='grey.5'
                                mt='xxs'
                                mb='md'
                            >
                                {options.subtitle}
                            </SANTypography>
                            <SANBox height={80}>
                                <SANScroll>
                                    <SANTypography
                                        fontSize='md'
                                        color='grey.6'
                                        pr='sm'
                                    >
                                        {options.description}
                                    </SANTypography>
                                </SANScroll>
                            </SANBox>
                        </>
                    ) : (
                        <SANBox height={163}>
                            <SANScroll>
                                {!!options.accessContent ? (
                                    !!dataCollections && !loadingCollections ? (
                                        (
                                            dataCollections.collections || []
                                        ).map(collection =>
                                            renderCollection(
                                                collection,
                                                options.accessContent
                                            )
                                        )
                                    ) : (
                                        arrSkeleton.map(renderSkeleton)
                                    )
                                ) : (
                                    <SANGenericError
                                        ImageProps={{
                                            height: 75,
                                            mb: 'md'
                                        }}
                                        TypographyProps={{
                                            width: '80%',
                                            margin: '0 auto',
                                            fontSize: ''
                                        }}
                                    />
                                )}
                            </SANScroll>
                        </SANBox>
                    )}
                </SANBox>
                {options.status !== 'exams' && (
                    <SANBox
                        borderTop='1px solid'
                        borderColor='grey.1'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        p='md'
                        mt='xl'
                        mb='-24px'
                        mx='-24px'
                    >
                        <SANButton
                            onClick={handleClick}
                            size='xsmall'
                            variant='text'
                            color='primary'
                            uppercase
                            bold
                            disabled={button.disable}
                        >
                            {options.status === 'viewed' && (
                                <SANEvaIcon
                                    name='checkmark-circle-2'
                                    mr='xs'
                                    size='large'
                                />
                            )}
                            {button.label}
                        </SANButton>
                    </SANBox>
                )}
            </SANModal>
        )
    }
)
