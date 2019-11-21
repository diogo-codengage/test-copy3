import React, { useEffect, useState } from 'react'

import { useApolloClient } from '@apollo/react-hooks'

import { SANCollection } from '@sanar/components'
import { ISANCollectionProps } from '@sanar/components/dist/Components/Molecules/Collection'

import {
    GET_COLLECTIONS,
    ICollectionsQuery
} from 'Apollo/Classroom/Queries/collections'

const items = [
    {
        name: 'Nome da aula exemplo ellipsis',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: true,
        id: '1'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '2'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '3'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '4'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '5'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '6'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '7'
    },
    {
        name: 'Nome da aula exemplo',
        image:
            'https://programaorienta.com.br/wp-content/uploads/2019/09/medicina-curso.jpg',
        completed: false,
        id: '8'
    }
]

const RMCollection = ({ parentId, value, vertical = true, onChange }) => {
    const client = useApolloClient()
    const [collections, setCollections] = useState<any>([])

    useEffect(() => {
        const fetchCollections = async () => {
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
        }
        fetchCollections()
    }, [parentId])

    return (
        <SANCollection
            items={collections}
            vertical={vertical}
            onChange={onChange}
            value={value}
        />
    )
}

export default RMCollection
