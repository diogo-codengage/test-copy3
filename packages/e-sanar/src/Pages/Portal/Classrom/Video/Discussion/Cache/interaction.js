import { map } from 'ramda'
import { GET_REPLIES_COMMENTS } from 'Apollo/Classroom/queries/replies-comments'
import { GET_COMMENTS } from 'Apollo/Classroom/queries/comments'

export const mapCommentInteraction = ({
    id,
    dislikes_count,
    likes_count,
    interaction
}) => comment => {
    if (comment.id === id) {
        let flag
        if (interaction === 'dislike') {
            flag = {
                disliked_by_user: !comment.disliked_by_user,
                liked_by_user: false
            }
        } else {
            flag = {
                disliked_by_user: false,
                liked_by_user: !comment.liked_by_user
            }
        }
        return {
            ...comment,
            ...flag,
            likes_count,
            dislikes_count
        }
    }

    return comment
}

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
