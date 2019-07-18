import React, { useState } from 'react'

import { Query } from 'react-apollo'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { append, filter, map } from 'ramda'

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
    const [comments, setComments] = useState({})
    const [skip] = useState(0)

    const handleRemoveComment = async commentId => {
        try {
            await client.mutate({
                mutation: REMOVE_COMMENT,
                variables: {
                    commentId
                },
                update: store => {
                    try {
                        const data = store.readQuery({
                            query: GET_COMMENTS
                        })

                        data.comments.data = filter(
                            comment => comment.id !== commentId,
                            data.comments.data
                        )
                        data.comments.count--

                        store.writeQuery({
                            query: GET_COMMENTS,
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
                        const data = store.readQuery({
                            query: GET_COMMENTS
                        })

                        data.comments.data = append(
                            createComment,
                            data.comments.data
                        )

                        store.writeQuery({
                            query: GET_COMMENTS,
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

    const handleInteraction = interaction => async commentId => {
        try {
            await client.mutate({
                mutation: CREATE_INTERACTION,
                variables: {
                    interaction,
                    resourceId: commentId,
                    resourceType: 'Comment'
                }
            })
        } catch {
            message.error(t('classroom.failInteractionComment'))
        }
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

    const handleCompleted = ({ comments }) => setComments(comments)

    return (
        <Query
            query={GET_COMMENTS}
            onCompleted={handleCompleted}
            fetchPolicy='cache-and-network'
            variables={{
                resourceId,
                limit: 5,
                skip
            }}
        >
            {({ loading, error, fetchMore }) => {
                if (loading)
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
                        comments={comments}
                        onExclude={handleRemoveComment}
                        onLike={handleInteraction('like')}
                        onDislike={handleInteraction('dislike')}
                        onOrderBy={order => console.log('onOrderBy', order)}
                        onComment={handleSubComment}
                        loadRepliesProps={{
                            onClick: handleLoadReplies
                        }}
                        hideRepliesProps={{
                            onClick: handleHideReplies
                        }}
                        loadMoreProps={{
                            onClick: () => {
                                fetchMore({
                                    variables: {
                                        skip: comments.data.length
                                    },
                                    updateQuery: (
                                        prev,
                                        { fetchMoreResult }
                                    ) => {
                                        if (!fetchMoreResult) return prev
                                        return Object.assign({}, prev, {
                                            comments: {
                                                ...prev.comments,
                                                data: [
                                                    ...prev.comments.data,
                                                    ...fetchMoreResult.comments
                                                        .data
                                                ]
                                            }
                                        })
                                    }
                                })
                            }
                        }}
                        hasMore={comments.count > comments.data.length}
                    />
                )
            }}
        </Query>
    )
}

export default SANCommentList
