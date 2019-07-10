import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'react-i18next'
import { distanceInWords } from 'date-fns'

import Avatar from 'antd/lib/avatar'
import Comment from 'antd/lib/comment'
import ESTypography from '../../Atoms/Typography'

import i18n from '../../../Config/i18n'

const locale =
    i18n.language === 'en'
        ? require('date-fns/locale/en')
        : require('date-fns/locale/pt')

const Title = ({ name, monitor, labelMonitor }) => {
    const { t } = useTranslation('sanarui')

    return (
        <div className='es-comment__title'>
            <ESTypography variant='caption' strong className='text-grey-7'>
                {name}
            </ESTypography>
            {monitor && (
                <div className='es-comment__badge'>
                    {labelMonitor || t('global.monitor')}
                </div>
            )}
        </div>
    )
}

const ESComment = ({ user, text, time, monitor, labelMonitor, className }) => {
    const classes = classNames('es-comment', className)

    const diff =
        time &&
        distanceInWords(new Date(), new Date(time && time), {
            locale
        })
    return (
        <Comment
            className={classes}
            author={
                <Title
                    name={user && user.name}
                    monitor={monitor}
                    labelMonitor={labelMonitor}
                />
            }
            avatar={
                <Avatar
                    src={user && user.profile_picture}
                    icon='user'
                    alt={user && user.name}
                />
            }
            content={<ESTypography variant='body2'>{text}</ESTypography>}
            datetime={diff && diff}
        />
    )
}

ESComment.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        profile_picture: PropTypes.string
    }),
    text: PropTypes.string,
    time: PropTypes.string,
    monitor: PropTypes.bool,
    labelMonitor: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default ESComment
