import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'react-i18next'

import Tooltip from 'antd/lib/tooltip'
import Avatar from 'antd/lib/avatar'
import Comment from 'antd/lib/comment'
import ESTypography from '../../Atoms/Typography'

const Title = ({ author, monitor }) => {
    const { t } = useTranslation('sanarui')
    return (
        <div className='es-comment__title'>
            <ESTypography variant='caption' strong className='text-grey-7'>
                {author.name}
            </ESTypography>
            {monitor && (
                <div className='es-comment__badge'>{t('global.monitor')}</div>
            )}
        </div>
    )
}

const ESComment = ({ author, content, time, monitor, className }) => {
    const classes = classNames('es-comment', className)
    return (
        <Comment
            className={classes}
            author={<Title author={author} monitor={monitor} />}
            avatar={<Avatar src={author.avatar} alt='Han Solo' />}
            content={<ESTypography variant='body2'>{content}</ESTypography>}
            datetime={time}
        />
    )
}

ESComment.propTypes = {
    author: PropTypes.any,
    content: PropTypes.string,
    time: PropTypes.string,
    monitor: PropTypes.bool
}

export default ESComment
