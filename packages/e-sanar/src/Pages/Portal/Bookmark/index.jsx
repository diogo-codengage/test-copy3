import React, { useState, useEffect } from 'react'
import SANBookmarksHeader from './Header'
import { useApolloContext } from 'Hooks/apollo'
import { GET_BOOKMARKS } from 'Apollo/Bookmark/queries/bookmarks'
import { useAuthContext } from 'Hooks/auth'
import SANBookmarkContent from './Content'
import { CHANGE_BOOKMARK } from 'Apollo/Bookmark/mutations/bookmark'

const SANBookmarkPage = ({ history }) => {
    const [filter, setFilter] = useState(null)
    const [visualization, setVisualization] = useState('grid')
    const [loading, setLoading] = useState(false)
    const [bookmarks, setBookmarks] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const { me, getEnrollment } = useAuthContext()
    const client = useApolloContext()

    const { id: enrollmentId } = getEnrollment()

    const fetchBookmarks = async () => {
        setLoading(true)
        const {
            data: {
                bookmarks: { data, count }
            }
        } = await client.query({
            query: GET_BOOKMARKS,
            fetchPolicy: 'network-only',
            variables: {
                enrollmentId,
                resourceType: filter,
                limit: 9,
                skip: page
            }
        })

        if (data && data.length) {
            setBookmarks(data)
            setTotal(count)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchBookmarks()
    }, [filter, page])

    const getColumnAmount = () => {
        if (visualization && visualization === 'list') {
            return { column: 1 }
        } else {
            return {
                gutter: 48,
                sm: 1,
                md: 2,
                lg: 3
            }
        }
    }

    const getClassRoute = resourceType => {
        if (resourceType === 'Video') {
            return 'video'
        } else if (resourceType === 'Document') {
            return 'documento'
        }
        return ''
    }

    const navigateToResource = (resourceType, moduleId, resourceId) => {
        if (resourceType && resourceType !== 'Question') {
            history.push(
                `/aluno/sala-aula/${moduleId}/${getClassRoute(
                    resourceType
                )}/${resourceId}`
            )
        } else {
            history.push(`/aluno/banco-questoes/perguntas/${resourceId}`)
        }
    }

    const onRemove = async (resourceId, resourceType) => {
        try {
            setLoading(true)
            await client.mutate({
                mutation: CHANGE_BOOKMARK,
                variables: {
                    resourceId: resourceId,
                    resourceType: resourceType,
                    userId: me.id
                }
            })

            await fetchBookmarks()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <SANBookmarksHeader />
            <SANBookmarkContent
                bookmarks={bookmarks}
                total={total}
                filter={filter}
                loading={loading}
                page={page}
                visualization={visualization}
                getColumnAmount={getColumnAmount}
                navigateToResource={navigateToResource}
                onRemove={onRemove}
                setFilter={setFilter}
                setPage={setPage}
                setVisualization={setVisualization}
            />
        </>
    )
}

// export default withRouter(SANBookmarkPage)
export default SANBookmarkPage
