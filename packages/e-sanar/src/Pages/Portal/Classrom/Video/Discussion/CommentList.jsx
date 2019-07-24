import React, { useState } from 'react'

import { Query } from 'react-apollo'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { append, filter, map, find } from 'ramda'

import ESCommentList from 'sanar-ui/dist/Components/Organisms/CommentList'
import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'
import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

import { useApolloContext } from 'Hooks/apollo'

import { GET_COMMENTS } from 'Apollo/Classroom/queries/comments'
import { CREATE_COMMENT } from 'Apollo/Classroom/mutations/comment'
import { REMOVE_COMMENT } from 'Apollo/Classroom/mutations/remove-comment'
import { CREATE_INTERACTION } from 'Apollo/Classroom/mutations/create-interaction'
import { GET_REPLIES_COMMENTS } from 'Apollo/Classroom/queries/replies-comments'

const SANCommentList = ({ resourceId }) => {
    const client = useApolloContext()
    const { t } = useTranslation('esanar')
    const [comments, setComments] = useState({ data: [], count: 0 })

    const handleRemoveComment = async commentId => {
        try {
            await client.mutate({
                mutation: REMOVE_COMMENT,
                variables: {
                    commentId
                },
                update: store => {
                    try {
                        const query = GET_COMMENTS
                        const data = store.readQuery({
                            query
                        })

                        data.comments.data = filter(
                            comment => comment.id !== commentId,
                            data.comments.data
                        )
                        data.comments.count--

                        store.writeQuery({
                            query,
                            data
                        })
                    } catch (err) {
                        console.log(err.message)
                    }
                }
            })
        } catch {
            message.error(t('classroom.failRemoveComment'))
        }
    }

    const handleSubComment = async ({ text, parentId, user }) => {
        try {
            const {
                data: { createComment }
            } = await client.mutate({
                mutation: CREATE_COMMENT,
                variables: {
                    text: `${user &&
                        `<strong style="float: left">${user}&nbsp;</strong>`} ${text}`,
                    parentId,
                    resourceId,
                    resourceType: 'Video'
                },
                update: (store, { data: { createComment } }) => {
                    try {
                        const query = GET_COMMENTS
                        const data = store.readQuery({
                            query
                        })

                        data.comments.data = append(
                            createComment,
                            data.comments.data
                        )

                        store.writeQuery({
                            query,
                            data
                        })
                    } catch (err) {
                        console.error(err.message)
                    }
                }
            })

            changeSubComments({ answer: createComment, parentId })
        } catch {
            message.error(t('classroom.failCreateComment'))
        }
    }

    const handleInteraction = interaction => async ({
        commentId,
        parentId
    }) => {
        try {
            const {
                data: { createInteraction }
            } = await client.mutate({
                mutation: CREATE_INTERACTION,
                variables: {
                    interaction,
                    resourceId: commentId,
                    resourceType: 'Comment'
                },
                update: (
                    store,
                    {
                        data: {
                            createInteraction: {
                                id,
                                dislikes_count,
                                likes_count
                            }
                        }
                    }
                ) => {
                    try {
                        const query = parentId
                            ? GET_REPLIES_COMMENTS
                            : GET_COMMENTS

                        const field = parentId ? 'repliesComment' : 'comments'

                        const data = store.readQuery({
                            query
                        })

                        data[field].data = map(
                            comment => ({
                                ...comment,
                                ...(comment.id === id && {
                                    likes_count,
                                    dislikes_count,
                                    disliked_by_user:
                                        interaction === 'dislike' &&
                                        !comment.disliked_by_user,
                                    liked_by_user:
                                        interaction === 'like' &&
                                        !comment.liked_by_user
                                })
                            }),
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
            })

            if (parentId) {
                updateReplyInteraction({
                    parentId,
                    interaction,
                    createInteraction
                })
            }
        } catch {
            message.error(t('classroom.failInteractionComment'))
        }
    }

    const updateReplyInteraction = ({
        parentId,
        interaction,
        createInteraction
    }) => {
        const comment = find(comment => comment.id === parentId)(comments.data)
        const answers = map(
            answer => ({
                ...answer,
                ...(answer.id === createInteraction.id && {
                    likes_count: createInteraction.likes_count,
                    dislikes_count: createInteraction.dislikes_count,
                    disliked_by_user:
                        interaction === 'dislike' && !answer.disliked_by_user,
                    liked_by_user:
                        interaction === 'like' && !answer.liked_by_user
                })
            }),
            comment.answers
        )
        comment.answers = answers
        setComments(oldComments => ({
            ...oldComments,
            ...map(
                curr => (curr.id === comment.id ? comment : curr),
                comments.data
            )
        }))
    }

    const changeSubComments = ({ parentId, answers = [], answer }) => {
        const data = map(
            comment => ({
                ...comment,
                ...(comment.id === parentId && {
                    answers: [
                        ...(comment.answers || []),
                        ...answers,
                        ...(answer ? [answer] : [])
                    ]
                })
            }),
            comments.data
        )
        setComments(oldComments => ({
            ...oldComments,
            data
        }))
    }

    const handleHideReplies = parentId => {
        const data = comments.data.map(comment => ({
            ...comment,
            ...(comment.id === parentId && { answers: [] })
        }))
        setComments(oldComments => ({
            ...oldComments,
            data
        }))
    }

    const handleLoadReplies = async parentId => {
        try {
            const {
                data: { repliesComment }
            } = await client.query({
                query: GET_REPLIES_COMMENTS,
                fetchPolicy: 'network-only',
                variables: {
                    resourceId,
                    parentId,
                    limit: 10,
                    skip: 0
                }
            })
            changeSubComments({ answers: repliesComment.data, parentId })
        } catch {
            message.error(t('classroom.failLoadRepliesComment'))
        }
    }

    const handleFetchMore = fetchMore => () =>
        fetchMore({
            variables: {
                skip: comments.data.length
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev
                return Object.assign({}, prev, {
                    comments: {
                        ...prev.comments,
                        data: [
                            ...prev.comments.data,
                            ...fetchMoreResult.comments.data
                        ]
                    }
                })
            }
        })

    const handleCompleted = ({ comments }) => setComments(comments)

    return (
        <Query
            query={GET_COMMENTS}
            onCompleted={handleCompleted}
            fetchPolicy='cache-and-network'
            variables={{
                resourceId,
                limit: 5,
                skip: 0
            }}
        >
            {({ loading, error, fetchMore, data }) => {
                if (loading && !data.comments)
                    return (
                        <ESSpin
                            dark
                            className='d-flex justify-content-center align-items-center'
                            style={{ height: 500 }}
                        />
                    )
                if (error) return <SANErrorPiece dark message={error.message} />

                return (
                    <ESCommentList
                        loading={loading}
                        comments={comments}
                        onExclude={handleRemoveComment}
                        onLike={handleInteraction('like')}
                        onDislike={handleInteraction('dislike')}
                        onComment={handleSubComment}
                        loadRepliesProps={{
                            onClick: handleLoadReplies
                        }}
                        hideRepliesProps={{
                            onClick: handleHideReplies
                        }}
                        loadMoreProps={{
                            onClick: handleFetchMore(fetchMore)
                        }}
                        hasMore={comments.count > comments.data.length}
                    />
                )
            }}
        </Query>
    )
}

export default SANCommentList
