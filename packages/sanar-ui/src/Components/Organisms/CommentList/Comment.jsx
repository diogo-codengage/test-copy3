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
    className
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
            onComment({ text, parentId: comment.parent_id || comment.id })
        setReplay(false)
    }

    const actions = [
        <InteractionButton
            onClick={onLike}
            type='like'
            count={comment.likes_count}
        />,
        <InteractionButton
            onClick={onDislike}
            type='dislike'
            count={comment.dislikes_count}
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
        <ESDropdown
            overlay={
                <ESMenu onClick={handleMenuClick}>
                    <ESItem key='exclude'>
                        <ESTypography strong>
                            {t('commentList.exclude')}
                        </ESTypography>
                    </ESItem>
                    <ESItem key='report'>
                        <ESTypography strong>
                            {t('commentList.report')}
                        </ESTypography>
                    </ESItem>
                </ESMenu>
            }
            trigger={['click']}
        >
            <ESButton circle size='xsmall' variant='text' color='white' bold>
                <ESEvaIcon name='more-vertical-outline' />
            </ESButton>
        </ESDropdown>
    ]

    return (
        <>
            <ESComment
                dark
                actions={actions}
                {...comment}
                className={className}
            />
            {reply && (
                <ESTextEditor
                    onSubmit={handleComment}
                    ref={textEditorRef}
                    dark
                    comment
                    reply
                />
            )}
        </>
    )
}

export default Comment
