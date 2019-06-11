import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'antd/lib/tooltip'
import Avatar from 'antd/lib/avatar'
import Comment from 'antd/lib/comment'
import ESTypography from '../../Atoms/Typography'

const Title = ({ author, badge }) => (
    <div className='title'>
        <ESTypography variant='subtitle2' strong>
            {author.name}
        </ESTypography>
        {badge && (
            <div className='badge'>
                <ESTypography variant='subtitle2' className='badge-text'>
                    {badge}
                </ESTypography>
            </div>
        )}
    </div>
)

const ESComment = ({ author, content, time }) => (
    <Comment
        author={<Title author={author} badge='Monitor' />}
        avatar={<Avatar src={author.avatar} alt='Han Solo' />}
        content={<ESTypography variant='body2'>{content}</ESTypography>}
        datetime={
            <Tooltip title={time}>
                <span> • {time}</span>
            </Tooltip>
        }
    />
)

ESComment.propTypes = {
    author: PropTypes.any,
    content: PropTypes.string,
    time: PropTypes.string
}

export default ESComment
