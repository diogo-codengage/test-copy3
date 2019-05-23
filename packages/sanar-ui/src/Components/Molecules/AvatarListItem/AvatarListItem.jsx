import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ListViewItem } from '../../Atoms/ListView'
import { ESRow, ESCol } from '../../Atoms/Grid'
import { Avatar } from 'antd'

const ESAvatarListItem = ({ avatar, avatarSize, children, loading }) => {
    return (
        <ListViewItem avatar loading={loading}>
            <ESRow type='flex' className='es-avatar-list-item' gutter={16}>
                <ESCol>
                    <Avatar
                        className='es-avatar-list-item--avatar'
                        size={avatarSize}
                        src={avatar}
                    />
                </ESCol>
                <ESCol flex={1} className='es-avatar-list-item__content'>
                    {children}
                </ESCol>
            </ESRow>
        </ListViewItem>
    )
}

ESAvatarListItem.propTypes = {
    className: PropTypes.string,
    avatar: PropTypes.string,
    avatarSize: PropTypes.string,
    loading: PropTypes.bool
}
ESAvatarListItem.defaultProps = {
    avatarSize: 'medium'
}

export default ESAvatarListItem
