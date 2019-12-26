import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef
} from 'react'

import { useApolloClient } from '@apollo/react-hooks'

import { SANCollection } from '@sanar/components'
import {
    ISANCollectionProps,
    ICollection
} from '@sanar/components/dist/Components/Molecules/Collection'

import {
    GET_COLLECTIONS,
    ICollectionsQuery
} from 'Apollo/Classroom/Queries/collections'

interface IRMCollectionProps
    extends Pick<ISANCollectionProps, 'vertical' | 'value' | 'onChange'> {
    parentId: string
    onCompleted?: (collection: ICollection) => void
}

const RMCollection: React.FC<IRMCollectionProps> = (
    { parentId, value, vertical = true, onChange, onCompleted },
    ref
) => {
    const client = useApolloClient()
    const [loading, setLoading] = useState(false)
    const [collections, setCollections] = useState<any>([])

    useEffect(() => {
        const fetchCollections = async () => {
            setLoading(true)
            try {
                const {
                    data: { collections }
                } = await client.query<ICollectionsQuery>({
                    query: GET_COLLECTIONS,
                    variables: { parentId }
                })
                const makeCollections = collections.map(collection => ({
                    ...collection,
                    image: collection.content.video.image,
                    completed: collection.content.video.progress === 100
                }))
                setCollections(makeCollections)
                if (!!onCompleted) {
                    const collection = makeCollections.find(
                        collection => collection.id === value
                    )
                    !!collection && onCompleted(collection)
                }
            } catch {}
            setLoading(false)
        }
        fetchCollections()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [parentId])

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
