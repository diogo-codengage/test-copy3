import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Avatar } from 'antd'

import ESTypography from '../../../Atoms/Typography'

const ESAvatarMenu = ({ className, title, subtitle, src }) => {
    const classes = classNames('es-avatar-menu', className)

    return (
        <div className={classes}>
            <Avatar src={src} size='large' className='mr-sm' />
            <span>
                <ESTypography className='mb-xs' level={6}>
                    {title}
                </ESTypography>
                {subtitle && (
                    <ESTypography className='text-white-6' variant='caption'>
                        {subtitle}
                    </ESTypography>
                )}
            </span>
        </div>
    )
}

ESAvatarMenu.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    src: PropTypes.string
}

ESAvatarMenu.defaultProps = {}

export default ESAvatarMenu
