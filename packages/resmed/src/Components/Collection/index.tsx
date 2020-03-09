import React, { useMemo, useImperativeHandle, forwardRef } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import * as Sentry from '@sentry/browser'

import {
    SANCollection,
    useSnackbarContext,
    ISANCollectionProps,
    ICollection as ICollectionComp
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

const makeCollection = (collection: ICollection) => ({
    ...collection,
    image: collection.content.video.image,
    completed:
        collection.content.video.progress === 100 &&
        collection.content.quiz.progress === 100,
    progress: {
        video: collection.content.video.progress || 0,
        quiz: collection.content.quiz.progress || 0
    }
})

const RMCollection: React.FC<IRMCollectionProps> = (
    { parentId, value, vertical = true, onChange, onCompleted },
    ref
) => {
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
        <SANCollection
            items={collections}
            vertical={vertical}
            onChange={onChange}
            value={value}
            loading={loading}
        />
    )
}

export default forwardRef(RMCollection)
