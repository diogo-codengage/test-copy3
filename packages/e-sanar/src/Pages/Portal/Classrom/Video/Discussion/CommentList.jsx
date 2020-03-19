import React, { useState } from 'react'

import { Query } from 'react-apollo'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { filter, map, find, append } from 'ramda'

import ESCommentList from 'sanar-ui/dist/Components/Organisms/CommentList'
import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'
import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

import { useApolloContext } from 'Hooks/apollo'
import { useAuthContext } from 'Hooks/auth'

import { GET_COMMENTS } from 'Apollo/Classroom/queries/comments'
import { CREATE_COMMENT } from 'Apollo/Classroom/mutations/comment'
import { REMOVE_COMMENT } from 'Apollo/Classroom/mutations/remove-comment'
import { CREATE_INTERACTION } from 'Apollo/Classroom/mutations/create-interaction'
import { GET_REPLIES_COMMENTS } from 'Apollo/Classroom/queries/replies-comments'

import { removeCommentCache } from './Cache/remove-comment'
import { addCommentCache } from './Cache/add-comment'
import { interactionCache, mapCommentInteraction } from './Cache/interaction'
import { commentsFetchMore } from './Cache/comments-fetch-more'

const getItemById = id => arr => find(item => item.id === id)(arr)

const SANCommentList = ({ resourceId }) => {
    const client = useApolloContext()
    const { t } = useTranslation('esanar')
    const { me } = useAuthContext()
    const [comments, setComments] = useState({ data: [], count: 0 })
    const [allAnswersCount, setAllAnswersCount] = useState(0)
    const [allRepliesCount, setAllRepliesCount] = useState(0)

    const handleRemoveComment = async ({ commentId, parentId }) => {
        try {
            await client.mutate({
                mutation: REMOVE_COMMENT,
                variables: {
                    commentId
                },
                update: removeCommentCache({ commentId, parentId })
            })

            if (!!parentId) {
                removeStateComment({ commentId, parentId })
            } else {
                const data = comments.data.filter(cmm => cmm.id !== commentId)
                setComments(oldComments => ({
                    ...oldComments,
                    data
                }))
            }
        } catch {
            message.error(t('classroom.failRemoveComment'))
        }
    }

    const removeStateComment = ({ commentId, parentId }) => {
        const comment = getItemById(parentId)(comments.data)

        if (comment) {
            comment.answers = filter(
                answer => answer.id !== commentId,
                comment.answers
            )

            comment.replies_count =
                comment.replies_count > 0 ? comment.replies_count - 1 : 0

            setComments(oldComments => ({
                ...oldComments,
                data: map(
                    curr => (curr.id === comment.id ? comment : curr),
                    comments.data
                )
            }))
        }
    }

    const handleSubComment = async ({ text, parentId, user }) => {
        try {
            const {
                data: { createComment }
            } = await client.mutate({
                mutation: CREATE_COMMENT,
                variables: {
                    text: user
                        ? `<span style="float: left; color: #ffebc2">@${user}&nbsp;</span> ${text}`
                        : text,
                    parentId,
                    resourceId,
                    resourceType: 'Video'
                },
                update: addCommentCache({ parentId })
            })

            const data = map(
                comment => ({
                    ...comment,
                    ...(comment.id === parentId && {
                        replies_count: comment.replies_count + 1,
                        answers: append(createComment, comment.answers || [])
                    })
                }),
                comments.data
            )
            setComments(oldComments => ({
                ...oldComments,
                data
            }))
            await handleLoadReplies(parentId, false)
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
                update: interactionCache({ parentId, interaction })
            })

            parentId &&
                updateReplyInteraction({
                    parentId,
                    interaction,
                    createInteraction
                })
        } catch {
            message.error(t('classroom.failInteractionComment'))
        }
    }

    const updateReplyInteraction = ({
        parentId,
        interaction,
        createInteraction
    }) => {
        const comment = getItemById(parentId)(comments.data)
        const answers = map(
            mapCommentInteraction({ ...createInteraction, interaction }),
            comment.answers
        )
        comment.answers = answers
        setComments(oldComments => ({
            ...oldComments,
            data: map(
                curr => (curr.id === comment.id ? comment : curr),
                comments.data
            )
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

    const handleLoadReplies = async (parentId, hasAdd = true) => {
        try {
            let {
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
            if (!repliesComment) {
                repliesComment.data = comments.data.filter(
                    cm => !!cm.parent_id && cm.parent_id === parentId
                )
                repliesComment.count = repliesComment.data.length
            }
            hasAdd &&
                addSubComments({
                    answers: repliesComment.data,
                    parentId,
                    count: repliesComment.count
                })
        } catch {
            message.error(t('classroom.failLoadRepliesComment'))
        }
    }

    const addSubComments = ({ parentId, answers = [], count }) => {
        const data = map(
            comment => ({
                ...comment,
                ...(comment.id === parentId && {
                    answers,
                    replies_count: count
                })
            }),
            comments.data
        )

        setComments(oldComments => ({
            ...oldComments,
            data
        }))
    }

    const handleFetchMore = fetchMore => () =>
        fetchMore({
            variables: {
                skip: comments.data.length + allAnswersCount
            },
            updateQuery: commentsFetchMore
        })

    const handleCompleted = ({ comments }) => {
        const mountComments = comments.data
            .map(cmm => ({
                ...cmm,
                answers: comments.data.filter(
                    cm => !!cm.parent_id && cm.parent_id === cmm.id
                )
            }))
            .filter(cmm => !cmm.parent_id)
        let countAnswers = 0
        let countReplies = 0
        comments.data.forEach(ac => {
            if (!!ac.parent_id) countAnswers += 1
            else countReplies += ac.replies_count
        })
        setAllAnswersCount(countAnswers)
        setAllRepliesCount(countReplies)
        setComments({
            data: mountComments,
            count: comments.count
        })
    }

    return (
        <Query
            query={GET_COMMENTS}
            onCompleted={handleCompleted}
            fetchPolicy='cache-and-network'
            pollInterval={120000}
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
                if (error)
                    return (
                        <SANErrorPiece
                            dark
                            message={t('classroom.failLoadComments')}
                        />
                    )
                return (
                    <ESCommentList
                        avatar={me.profile_picture}
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
                        hasMore={
                            comments.count >
                            comments.data.length + allRepliesCount
                        }
                    />
                )
            }}
        </Query>
    )
}

export default SANCommentList
