import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'
import ESDropdown from '../../Atoms/Dropdown'
import ESMenu, { ESItem } from '../../Atoms/Menu'
import ESTypography from '../../Atoms/Typography'
import ESEmpty from '../../Atoms/Empty'
import ESDivider from '../../Atoms/Divider'

import Comment from './Comment'

const ESCommentList = ({
    comments,
    onExclude,
    onReport,
    onComment,
    onLike,
    onDislike,
    onOrderBy,
    loadRepliesProps,
    hideRepliesProps,
    loadMoreProps,
    hasMore,
    className,
    loading,
    avatar
}) => {
    const { t } = useTranslation('sanarui')
    const [loadingReplies, setLoadingReplies] = useState({})
    const classes = classNames('es-comment-list', className)

    const handleLoadReplies = id => async () => {
        setLoadingReplies({ [id]: true })
        loadRepliesProps.onClick && (await loadRepliesProps.onClick(id))
        setLoadingReplies(false)
    }

    const handleHideReplies = id => () =>
        hideRepliesProps.onClick && hideRepliesProps.onClick(id)

    const renderComment = comment => {
        let acc = []
        if (comment && comment.answers && comment.answers.length) {
            acc = comment.answers.map(renderComment)
        }

        return [
            <div
                key={comment.id}
                className={classNames('es-comment-list-comment', {
                    'es-comment-list-comment__child': comment.parent_id
                })}
            >
                <Comment
                    onExclude={onExclude}
                    onReport={onReport}
                    onComment={onComment}
                    onLike={onLike}
                    onDislike={onDislike}
                    comment={comment}
                    avatar={avatar}
                />
                {(comment.replies_count &&
                    (!comment.answers || !comment.answers.length)) ||
                (comment.answers &&
                    comment.replies_count > comment.answers.length) ? (
                    <ESButton
                        {...loadRepliesProps}
                        onClick={handleLoadReplies(comment.id)}
                        size='xsmall'
                        variant='text'
                        color='primary'
                        bold
                        className='secondary'
                        loading={loadingReplies[comment.id]}
                    >
                        {t('commentList.viewReply', {
                            count:
                                comment.replies_count -
                                (comment.answers || []).length
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
                        className='secondary'
                    >
                        {t('commentList.hideReplies')}
                        <ESEvaIcon name='chevron-up-outline' key='up' />
                    </ESButton>
                ) : (
                    undefined
                )}
            </div>,
            ...acc,
            !comment.parent_id && <ESDivider color='grey' />
        ]
    }

    const handleOrderBy = ({ key }) => onOrderBy && onOrderBy(key)

    return (
        <div className={classes}>
            <div className='es-comment-list__header'>
                <ESTypography variant='subtitle2'>
                    {t('commentList.answers.keyWithCount', {
                        count: comments.count || 0
                    })}
                </ESTypography>
                {onOrderBy && (
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
                )}
            </div>
            {comments.count > 0 ? (
                <>
                    <div style={{ width: '100%' }}>
                        {comments.data.map(renderComment)}
                    </div>
                    {hasMore && (
                        <ESButton
                            size='xsmall'
                            variant='outlined'
                            color='primary'
                            uppercase
                            bold
                            className='mt-md secondary'
                            loading={loading}
                            {...loadMoreProps}
                        >
                            {t('commentList.loadMore')}
                        </ESButton>
                    )}
                </>
            ) : (
                <div className='es-comment-list__empty'>
                    <ESEmpty
                        description={
                            <ESTypography
                                varinat='subtitle2'
                                className='text-white-7'
                            >
                                {t('commentList.empty')}
                            </ESTypography>
                        }
                        dark
                    />
                </div>
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
    onLike: PropTypes.func,
    onDislike: PropTypes.func,
    onOrderBy: PropTypes.func,
    loadMoreProps: PropTypes.object,
    hideRepliesProps: PropTypes.object,
    loadRepliesProps: PropTypes.object,
    hasMore: PropTypes.bool,
    loading: PropTypes.bool,
    avatar: PropTypes.string
}
ESCommentList.defaultProps = {}

export default ESCommentList
