import React, { useMemo, useImperativeHandle, forwardRef } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import * as Sentry from '@sentry/browser'

import {
    SANCollection,
    useSnackbarContext,
    ISANCollectionProps,
    ICollection as ICollectionComp,
    SANErrorBoundary,
    SANGenericError
} from '@sanar/components'

import {
    GET_COLLECTIONS,
    ICollectionsQuery,
    ICollectionsVariables,
    ICollection
} from 'Apollo/Classroom/Queries/collections'

interface IRMCollectionProps
    extends Pick<ISANCollectionProps, 'vertical' | 'value' | 'onChange'> {
    parentId: string
    onCompleted?: (collection: ICollection) => void
}

const makeCollection = (collection: ICollection) => {
    const hasVideo = !!collection.content.video
    const hasQuiz = !!collection.content.quiz
    const videoCompleted = hasVideo && collection.content.video.progress === 100
    const quizCompleted = hasQuiz && collection.content.quiz.progress === 100
    const completed =
        hasQuiz && hasVideo ? videoCompleted && quizCompleted : videoCompleted
    return {
        ...collection,
        image: collection.content.video.image,
        progress: {
            video: hasVideo ? collection.content.video.progress : 0,
            quiz: hasQuiz ? collection.content.quiz.progress : 0
        },
        hasQuiz,
        hasVideo,
        completed
    }
}

const RMCollection = forwardRef<any, IRMCollectionProps>(
    ({ parentId, value, vertical = true, onChange, onCompleted }, ref) => {
        const { loading, data } = useQuery<
            ICollectionsQuery,
            ICollectionsVariables
        >(GET_COLLECTIONS, {
            variables: {
                parentId
            },
            onCompleted: ({ collections }) => {
                if (!!onCompleted) {
                    const collection = collections.find(findCollection)
                    !!collection && onCompleted(collection)
                }
            },
            onError: error => {
                createSnackbar({
                    message: t('classroom.collection.error'),
                    theme: 'error'
                })
                Sentry.captureException(error)
            }
        })
        const { t } = useTranslation('resmed')
        const createSnackbar = useSnackbarContext()

        const findCollection = (collection: ICollectionComp | ICollection) =>
            collection.id === value

        const getIndex = (arr: ICollectionComp[]) =>
            arr.findIndex(collection => collection.id === value)

        const collections = useMemo<ICollectionComp[]>(() => {
            if (!!data && !!data.collections) {
                const changedCollections = data.collections.map(makeCollection)
                return changedCollections
            }
            return []
        }, [data])

        useImperativeHandle(ref, () => ({
            getCurrent: () => collections.find(findCollection),
            getNext: () => {
                const index = getIndex(collections)
                return collections[index + 1]
            },
            getPrevious: () => {
                const index = getIndex(collections)
                return collections[index - 1]
            }
        }))

        return (
            <SANErrorBoundary
                component={
                    <SANGenericError
                        TypographyProps={{
                            color: 'grey.5'
                        }}
                    />
                }
            >
                <SANCollection
                    items={collections}
                    vertical={vertical}
                    onChange={onChange}
                    value={value}
                    loading={loading}
                />
            </SANErrorBoundary>
        )
    }
)

const Wrapper = forwardRef<any, IRMCollectionProps>((props, ref) => (
    <SANErrorBoundary
        component={
            <SANGenericError
                px='sm'
                mt='md'
                width={props.vertical ? '192px' : 'auto'}
                height='100%'
                TypographyProps={{
                    color: 'white.5'
                }}
            />
        }
    >
        <RMCollection {...props} ref={ref} />
    </SANErrorBoundary>
))

export default Wrapper
