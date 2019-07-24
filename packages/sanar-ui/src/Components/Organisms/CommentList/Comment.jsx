import React, { useState, useRef } from 'react'

import { useTranslation } from 'react-i18next'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'
import ESDropdown from '../../Atoms/Dropdown'
import ESMenu, { ESItem } from '../../Atoms/Menu'
import ESTypography from '../../Atoms/Typography'
import ESComment from '../../Molecules/Comment'
import ESTextEditor from '../../Molecules/TextEditor'

import InteractionButton from './InteractionButton'

const Comment = ({
    onLike,
    onDislike,
    onExclude,
    onReport,
    onComment,
    comment,
    className,
    avatar
}) => {
    const { t } = useTranslation('sanarui')
    const textEditorRef = useRef()
    const [reply, setReplay] = useState()

    const handleMenuClick = ({ key }) => {
        if (key === 'exclude') {
            onExclude && onExclude(comment.id)
        } else {
            onReport && onReport(comment.id)
        }
    }

    const handleComment = text => {
        onComment &&
            onComment({
                text,
                parentId: comment.parent_id || comment.id,
                user: comment.user.name
            })
        setReplay(false)
    }

    const handleLike = () =>
        onLike({ commentId: comment.id, parentId: comment.parent_id })

    const handleDislike = () =>
        onDislike({ commentId: comment.id, parentId: comment.parent_id })

    const actions = [
        <InteractionButton
            onClick={handleLike}
            type='like'
            count={comment.likes_count}
            byUser={comment.liked_by_user}
        />,
        <InteractionButton
            onClick={handleDislike}
            type='dislike'
            count={comment.dislikes_count}
            byUser={comment.disliked_by_user}
        />,
        <ESButton
            size='xsmall'
            variant='text'
            color='white'
            uppercase
            bold
            onClick={() => setReplay(oldReply => !oldReply)}
        >
            {t('commentList.reply')}
        </ESButton>,
        <>
            {onReport ||
                (comment.commented_by_user && (
                    <ESDropdown
                        overlay={
                            <ESMenu onClick={handleMenuClick}>
                                {comment.commented_by_user && (
                                    <ESItem key='exclude'>
                                        <ESTypography strong>
                                            {t('commentList.exclude')}
                                        </ESTypography>
                                    </ESItem>
                                )}
                                {onReport && (
                                    <ESItem key='report'>
                                        <ESTypography strong>
                                            {t('commentList.report')}
                                        </ESTypography>
                                    </ESItem>
                                )}
                            </ESMenu>
                        }
                        trigger={['click']}
                    >
                        <ESButton
                            circle
                            size='xsmall'
                            variant='text'
                            color='white'
                            bold
                        >
                            <ESEvaIcon name='more-vertical-outline' />
                        </ESButton>
                    </ESDropdown>
                ))}
        </>
    ]

    return (
        <>
            <ESComment
                dark
                actions={actions}
                {...comment}
                monitor={comment.labels === 'expert'}
                className={className}
            />
            {reply && (
                <ESTextEditor
                    avatar={avatar}
                    onSubmit={handleComment}
                    ref={textEditorRef}
                    dark
                    comment
                />
            )}
        </>
    )
}

export default Comment
