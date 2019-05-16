import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Avatar } from 'antd'

import ESCard from '../Card'
import ESTypography from '../../Atoms/Typography'

const ESCardAvatar = ({
    className,
    image,
    name,
    formation,
    actions,
    ...props
}) => {
    const classes = classNames('es-card-avatar', className)
    return (
        <ESCard className={classes}>
            <div
                className='es-card-avatar__header'
                style={{ backgroundImage: `url(${image})` }}
            >
                {actions}
            </div>
            {image ? (
                <div
                    className='es-card-avatar--avatar'
                    style={{ backgroundImage: `url(${image})` }}
                />
            ) : (
                <Avatar
                    className='es-card-avatar--avatar'
                    icon='user'
                    size={60}
                />
            )}
            <ESTypography ellipsis strong className='mb-xs'>
                {name}
            </ESTypography>
            <ESTypography ellipsis={{ rows: 2 }} variant='caption'>
                {formation}
            </ESTypography>
        </ESCard>
    )
}

ESCardAvatar.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    formation: PropTypes.string,
    actions: PropTypes.element
}
ESCardAvatar.defaultProps = {}

export default ESCardAvatar
