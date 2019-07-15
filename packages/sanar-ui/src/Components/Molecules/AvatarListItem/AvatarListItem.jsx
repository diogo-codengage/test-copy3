import React from 'react'
import PropTypes from 'prop-types'

import { Avatar } from 'antd'

import { ESListViewItem } from '../../Atoms/ListView'
import { ESRow, ESCol } from '../../Atoms/Grid'

const ESAvatarListItem = ({
    avatar,
    avatarSize,
    children,
    loading,
    className
}) => (
    <ESListViewItem avatar loading={loading} className={className}>
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
    </ESListViewItem>
)

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
