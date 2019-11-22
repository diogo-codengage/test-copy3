import React, {
    useEffect,
    useState,
    useImperativeHandle,
    forwardRef
} from 'react'

import { useApolloClient } from '@apollo/react-hooks'

import { SANCollection, SANBox } from '@sanar/components'

import {
    GET_COLLECTIONS,
    ICollectionsQuery
} from 'Apollo/Classroom/Queries/collections'

const RMCollection = ({ parentId, value, vertical = true, onChange }, ref) => {
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
                setCollections(
                    collections.map(collection => ({
                        ...collection,
                        image: collection.content.video.image,
                        completed: collection.content.video.progress === 100
                    }))
                )
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
        <SANBox height={vertical && '100vh'}>
            <SANCollection
                items={collections}
                vertical={vertical}
                onChange={onChange}
                value={value}
                loading={loading}
            />
        </SANBox>
    )
}

export default forwardRef(RMCollection)
