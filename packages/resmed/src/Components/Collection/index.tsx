import React, { useState, useImperativeHandle, forwardRef } from 'react'

import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/react-hooks'
import * as Sentry from '@sentry/browser'

import {
    SANCollection,
    useSnackbarContext,
    ISANCollectionProps,
    ICollection
} from '@sanar/components'

import {
    GET_COLLECTIONS,
    ICollectionsQuery,
    ICollectionsVariables
} from 'Apollo/Classroom/Queries/collections'

interface IRMCollectionProps
    extends Pick<ISANCollectionProps, 'vertical' | 'value' | 'onChange'> {
    parentId: string
    onCompleted?: (collection: ICollection) => void
}

const makeCollection = collection => ({
    ...collection,
    image: collection.content.video.image,
    completed:
        collection.content.video.progress === 100 &&
        collection.content.quiz.progress === 100
})

const RMCollection: React.FC<IRMCollectionProps> = (
    { parentId, value, vertical = true, onChange, onCompleted },
    ref
) => {
    const { loading } = useQuery<ICollectionsQuery, ICollectionsVariables>(
        GET_COLLECTIONS,
        {
            variables: {
                parentId
            },
            onCompleted: ({ collections }) => {
                const changedCollections = collections.map(makeCollection)
                setCollections(changedCollections)
                if (!!onCompleted) {
                    const collection = changedCollections.find(findCollection)
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
        }
    )
    const { t } = useTranslation('resmed')
    const createSnackbar = useSnackbarContext()
    const [collections, setCollections] = useState<any>([])

    const findCollection = collection => collection.id === value

    const getIndex = () =>
        collections.findIndex(collection => collection.id === value)

    useImperativeHandle(ref, () => ({
        getCurrent: () =>
            collections.find(collection => collection.id === value),
        getNext: () => {
            const index = getIndex()
            return collections[index + 1]
        },
        getPrevious: () => {
            const index = getIndex()
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
