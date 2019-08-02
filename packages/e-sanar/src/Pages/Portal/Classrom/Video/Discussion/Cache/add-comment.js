import { append, map } from 'ramda'
import { GET_REPLIES_COMMENTS } from 'Apollo/Classroom/queries/replies-comments'
import { GET_COMMENTS } from 'Apollo/Classroom/queries/comments'

export const sumCountReply = id => comment => ({
    ...comment,
    ...(comment.id === id && {
        replies_count: comment.replies_count + 1
    })
})

export const addCommentCache = ({ parentId }) => (
    store,
    { data: { createComment } }
) => {
    try {
        const query = GET_REPLIES_COMMENTS
        const data = store.readQuery({
            query
        })

        data.repliesComment.data = append(
            createComment,
            data.repliesComment.data
        )

        store.writeQuery({
            query,
            data
        })

        const dataComments = store.readQuery({
            query: GET_COMMENTS
        })

        dataComments.comments.data = map(
            sumCountReply(parentId),
            dataComments.comments.data
        )

        store.writeQuery({
            query: GET_COMMENTS,
            data: dataComments
        })
    } catch (err) {
        console.error(err.message)
    }
}
