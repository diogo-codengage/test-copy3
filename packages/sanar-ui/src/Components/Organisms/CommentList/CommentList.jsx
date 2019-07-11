import React, { useState, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESIcon from '../../Atoms/Icon'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'
import ESDropdown from '../../Atoms/Dropdown'
import ESMenu, { ESItem } from '../../Atoms/Menu'
import ESTypography from '../../Atoms/Typography'
import ESComment from '../../Molecules/Comment'
import ESTextEditor from '../../Molecules/TextEditor'

const InteractionButton = ({ type, count, ...props }) => (
    <div className='es-comment-list--interaction'>
        <ESButton
            {...props}
            circle
            size='xsmall'
            variant='text'
            color='white'
            bold
        >
            <ESIcon type={type} theme='filled' />
        </ESButton>
        {count ? (
            <ESTypography variant='caption' strong>
                {count}
            </ESTypography>
        ) : (
            undefined
        )}
    </div>
)

const Comment = ({
    onLike,
    likes_count,
    onDislike,
    dislikes_count,
    ...props
}) => {
    const { t } = useTranslation('sanarui')
    const textEditorRef = useRef()
    const [reply, setReplay] = useState()

    const actions = [
        <InteractionButton onClick={onLike} type='like' count={likes_count} />,
        <InteractionButton
            onClick={onDislike}
            type='dislike'
            count={dislikes_count}
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
                <ESMenu>
                    <ESItem key='1'>
                        <ESTypography strong>
                            {t('commentList.exclude')}
                        </ESTypography>
                    </ESItem>
                    <ESItem key='2'>
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
            <ESComment dark actions={actions} {...props} />
            {reply && <ESTextEditor ref={textEditorRef} dark comment reply />}
        </>
    )
}

const ESCommentList = ({ comments, className }) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-comment-list', className)

    const renderComment = (comment, index) => {
        let acc = []
        if (comment.answers && comment.answers.length) {
            acc = comment.answers.map(renderComment)
        }

        return [
            <div key={index}>
                <Comment
                    className={classNames({
                        'es-comment-list__child': comment.parentId
                    })}
                    {...comment}
                />
                {comment.answersCount ? (
                    <ESButton size='xsmall' variant='text' color='primary' bold>
                        {comment.parentId
                            ? t('commentList.hideReplies')
                            : t('commentList.viewReply', {
                                  count: comment.answersCount
                              })}
                        <ESEvaIcon name='chevron-down-outline' />
                    </ESButton>
                ) : (
                    undefined
                )}
            </div>,
            ...acc
        ]
    }

    return (
        <div className={classes}>
            <div>{comments.map(renderComment)}</div>
            <ESButton
                size='xsmall'
                variant='outlined'
                color='primary'
                uppercase
                bold
                className='mt-md'
            >
                {t('commentList.loadMore')}
            </ESButton>
        </div>
    )
}

ESCommentList.propTypes = {
    className: PropTypes.string
}
ESCommentList.defaultProps = {}

export default ESCommentList
