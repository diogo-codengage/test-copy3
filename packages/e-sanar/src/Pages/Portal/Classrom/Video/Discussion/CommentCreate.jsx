import React from 'react'

import { Mutation } from 'react-apollo'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { append } from 'ramda'

import ESTextEditor from 'sanar-ui/dist/Components/Molecules/TextEditor'

import { useAuthContext } from 'Hooks/auth'

import { GET_COMMENTS } from 'Apollo/Classroom/queries/comments'
import { CREATE_COMMENT } from 'Apollo/Classroom/mutations/comment'

const SANCommentCreate = ({ resourceId }) => {
    const { t } = useTranslation('esanar')
    const { me } = useAuthContext()

    const handleSubmit = mutation => async text => {
        try {
            await mutation({
                variables: {
                    text,
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
                        data.comments.count++

                        store.writeQuery({
                            query: GET_COMMENTS,
                            data
                        })
                    } catch (err) {
                        console.error(err.message)
                    }
                }
            })
        } catch {
            message.error(t('classroom.failCreateComment'))
        }
    }

    return (
        <Mutation mutation={CREATE_COMMENT}>
            {(addTodo, { loading }) => (
                <ESTextEditor
                    dark
                    loading={loading}
                    avatar={me.profile_picture}
                    comment
                    onSubmit={handleSubmit(addTodo)}
                    className='mb-xl'
                />
            )}
        </Mutation>
    )
}

export default SANCommentCreate
