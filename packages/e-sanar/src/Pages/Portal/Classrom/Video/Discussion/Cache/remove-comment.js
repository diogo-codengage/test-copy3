import { filter, map } from 'ramda'
import { GET_REPLIES_COMMENTS } from 'Apollo/Classroom/queries/replies-comments'
import { GET_COMMENTS } from 'Apollo/Classroom/queries/comments'

const subCountReply = id => comment => ({
    ...comment,
    ...(comment.id === id && {
        replies_count: comment.replies_count - 1
    })
})

export const removeCommentCache = ({ commentId, parentId }) => store => {
    try {
        const query = parentId ? GET_REPLIES_COMMENTS : GET_COMMENTS
        const field = parentId ? 'repliesComment' : 'comments'

        const data = store.readQuery({
            query
        })

        data[field].data = filter(
            comment => comment.id !== commentId,
            data[field].data
        )
        data[field].count--

        store.writeQuery({
            query,
            data
        })

        if (!!parentId) {
            const dataComments = store.readQuery({
                query: GET_COMMENTS
            })

            dataComments.comments.data = map(
                subCountReply(parentId),
                dataComments.comments.data
            )

            store.writeQuery({
                query: GET_COMMENTS,
                data: dataComments
            })
        }
    } catch (err) {
        console.error(err.message)
    }
}
