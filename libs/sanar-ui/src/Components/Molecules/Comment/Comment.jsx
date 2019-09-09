import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'react-i18next'
import { distanceInWordsToNow } from 'date-fns'

import Avatar from 'antd/lib/avatar'
import Comment from 'antd/lib/comment'
import ESTypography from '../../Atoms/Typography'

import i18n from '../../../Config/i18n'

const locale =
    i18n.language === 'en'
        ? require('date-fns/locale/en')
        : require('date-fns/locale/pt')

const Title = ({ name, monitor, labelMonitor, commentedByUser }) => {
    const { t } = useTranslation('sanarui')

    const badge = commentedByUser ? (
        <div className='es-comment__badge es-comment__badge'>
            {t('global.you')}
        </div>
    ) : monitor ? (
        <div className='es-comment__badge es-comment__badge'>
            {labelMonitor || t('global.monitor')}
        </div>
    ) : (
        undefined
    )

    return (
        <div className='es-comment__title'>
            <ESTypography variant='caption' strong className='text-grey-7'>
                {name}
            </ESTypography>
            {badge}
        </div>
    )
}

const ESComment = ({
    user,
    text,
    time,
    monitor,
    actions,
    labelMonitor,
    dark,
    owner,
    commented_by_user,
    className
}) => {
    const classes = classNames(
        'es-comment',
        {
            'es-comment__dark': dark,
            'es-comment__no-user': !user
        },
        className
    )

    const diff =
        time &&
        distanceInWordsToNow(new Date(time), {
            locale
        })

    return (
        <Comment
            className={classes}
            actions={actions}
            author={
                user && (
                    <Title
                        name={user && user.name}
                        monitor={monitor}
                        labelMonitor={labelMonitor}
                        commentedByUser={commented_by_user}
                    />
                )
            }
            avatar={
                user && (
                    <Avatar
                        src={user && user.profile_picture}
                        icon='user'
                        alt={user && user.name}
                    />
                )
            }
            content={
                <ESTypography variant='body2'>
                    {owner && (
                        <ESTypography component='span' variant='body2' strong>
                            {`${owner} `}
                        </ESTypography>
                    )}
                    <span dangerouslySetInnerHTML={{ __html: text }} />
                </ESTypography>
            }
            datetime={
                diff &&
                (i18n.language == 'pt'
                    ? diff.replace('aproximadamente', 'Há')
                    : diff)
            }
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
    commented_by_user: PropTypes.bool,
    monitor: PropTypes.bool,
    actions: PropTypes.arrayOf(PropTypes.node),
    labelMonitor: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    dark: PropTypes.bool
}

export default ESComment
