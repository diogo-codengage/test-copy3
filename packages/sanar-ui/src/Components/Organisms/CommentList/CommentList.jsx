import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'
import ESDropdown from '../../Atoms/Dropdown'
import ESMenu, { ESItem } from '../../Atoms/Menu'
import ESTypography from '../../Atoms/Typography'

import Comment from './Comment'

const ESCommentList = ({
    comments,
    onExclude,
    onReport,
    onComment,
    onOrderBy,
    loadRepliesProps,
    hideRepliesProps,
    loadMoreProps,
    hasMore,
    className
}) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-comment-list', className)

    const handleLoadReplies = id => () =>
        loadRepliesProps.onClick && loadRepliesProps.onClick(id)

    const handleHideReplies = id => () =>
        hideRepliesProps.onClick && hideRepliesProps.onClick(id)

    const renderComment = (comment, index) => {
        let acc = []
        if (comment.answers && comment.answers.length) {
            acc = comment.answers.map(renderComment)
        }

        return [
            <div
                key={index}
                className={classNames('es-comment-list-comment', {
                    'es-comment-list-comment__child': comment.parent_id
                })}
            >
                <Comment
                    onExclude={onExclude}
                    onReport={onReport}
                    onComment={onComment}
                    comment={comment}
                />
                {comment.replies_count &&
                (!comment.answers || !comment.answers.length) ? (
                    <ESButton
                        {...loadRepliesProps}
                        onClick={handleLoadReplies(comment.id)}
                        size='xsmall'
                        variant='text'
                        color='primary'
                        bold
                    >
                        {t('commentList.viewReply', {
                            count: comment.replies_count
                        })}
                        <ESEvaIcon name='chevron-down-outline' key='down' />
                    </ESButton>
                ) : comment.answers && comment.answers.length ? (
                    <ESButton
                        {...hideRepliesProps}
                        onClick={handleHideReplies(comment.id)}
                        size='xsmall'
                        variant='text'
                        color='primary'
                        bold
                    >
                        {t('commentList.hideReplies')}
                        <ESEvaIcon name='chevron-up-outline' key='up' />
                    </ESButton>
                ) : (
                    undefined
                )}
            </div>,
            ...acc
        ]
    }

    const handleOrderBy = ({ key }) => {
        onOrderBy && onOrderBy(key)
    }

    return (
        <div className={classes}>
            <div className='es-comment-list__header'>
                <ESTypography variant='subtitle2'>
                    {t('commentList.answers.keyWithCount', {
                        count: comments.count
                    })}
                </ESTypography>
                <ESDropdown
                    overlay={
                        <ESMenu onClick={handleOrderBy}>
                            <ESItem key='recents'>
                                <ESTypography strong>
                                    {t('commentList.orderByRecents')}
                                </ESTypography>
                            </ESItem>
                            <ESItem key='relevance'>
                                <ESTypography strong>
                                    {t('commentList.orderByRelevance')}
                                </ESTypography>
                            </ESItem>
                        </ESMenu>
                    }
                    trigger={['click']}
                >
                    <ESButton size='xsmall' variant='text' color='white'>
                        {t('commentList.orderBy')}
                        <ESEvaIcon name='chevron-down-outline' />
                    </ESButton>
                </ESDropdown>
            </div>
            <div>{comments.data.map(renderComment)}</div>
            {hasMore && (
                <ESButton
                    size='xsmall'
                    variant='outlined'
                    color='primary'
                    uppercase
                    bold
                    className='mt-md'
                    {...loadMoreProps}
                >
                    {t('commentList.loadMore')}
                </ESButton>
            )}
        </div>
    )
}

ESCommentList.propTypes = {
    className: PropTypes.string,
    comments: PropTypes.object,
    onExclude: PropTypes.func,
    onReport: PropTypes.func,
    onComment: PropTypes.func,
    onOrderBy: PropTypes.func,
    loadMoreProps: PropTypes.object,
    hideRepliesProps: PropTypes.object,
    loadRepliesProps: PropTypes.object,
    hasMore: PropTypes.bool
}
ESCommentList.defaultProps = {}

export default ESCommentList