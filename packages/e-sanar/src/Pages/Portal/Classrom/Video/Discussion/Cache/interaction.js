import { map } from 'ramda'
import { GET_REPLIES_COMMENTS } from 'Apollo/Classroom/queries/replies-comments'
import { GET_COMMENTS } from 'Apollo/Classroom/queries/comments'

export const mapCommentInteraction = ({
    id,
    dislikes_count,
    likes_count,
    interaction
}) => comment => ({
    ...comment,
    ...(comment.id === id && {
        likes_count,
        dislikes_count,
        disliked_by_user:
            interaction === 'dislike' && !comment.disliked_by_user,
        liked_by_user: interaction === 'like' && !comment.liked_by_user
    })
})

export const interactionCache = ({ parentId, interaction }) => (
    store,
    { data: { createInteraction } }
) => {
    try {
        const query = parentId ? GET_REPLIES_COMMENTS : GET_COMMENTS
        const field = parentId ? 'repliesComment' : 'comments'

        const data = store.readQuery({
            query
        })

        data[field].data = map(
            mapCommentInteraction({ ...createInteraction, interaction }),
            data[field].data
        )

        store.writeQuery({
            query,
            data
        })
    } catch (err) {
        console.error(err.message)
    }
}
