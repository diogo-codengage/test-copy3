import React from 'react'
import {
    SANInfiniteScroll,
    SANCol,
    SANCardCourseModule,
    SANRow,
    SANSpin,
    SANEmpty,
    SANBox
} from '@sanar/components'
import { useAddedContext } from './Context'

const updateAddedContents = (prev: any, { fetchMoreResult }) => {
    if (!fetchMoreResult) return prev

    return Object.assign({}, prev, {
        lastAddedContents: {
            ...prev.lastAddedContents,
            data: [
                ...prev.lastAddedContents.data,
                ...fetchMoreResult.lastAddedContents.data
            ]
        }
    })
}

const FLXAddedList = () => {
    const { added, addedCount, loading, fetchMore, error } = useAddedContext()

    if (error) {
        return <div>error</div>
    }

    if (loading) {
        return (
            <SANBox width='100%' py={5} textAlign='center'>
                <SANSpin />
            </SANBox>
        )
    }

    if (!added.length) {
        return <SANEmpty />
    }

    return (
        <SANInfiniteScroll
            threshold={204}
            loadMore={() =>
                fetchMore({
                    variables: {
                        skip: added.length
                    },
                    updateQuery: updateAddedContents
                })
            }
            hasMore={added.length < addedCount}
        >
            <SANRow gutter={24}>
                {added &&
                    added.map((item, index) => (
                        <SANCol key={index} xs={12} lg={8} xl={6}>
                            <SANCardCourseModule
                                key={index}
                                mb='xl'
                                newBadge
                                title={item.title}
                                image={item.thumbnail}
                            />
                        </SANCol>
                    ))}
            </SANRow>
        </SANInfiniteScroll>
    )
}

export default FLXAddedList
