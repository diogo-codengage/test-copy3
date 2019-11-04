import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Avatar } from 'antd'

import ESTypography from '../../../Atoms/Typography'
import ESSkeleton from '../../../Atoms/Skeleton'

const ESAvatarMenu = ({ className, title, subtitle, loading, src }) => {
    const classes = classNames('es-avatar-menu', className)

    return (
        <div className={classes}>
            {loading ? (
                <ESSkeleton avatar title active paragraph={{ rows: 1 }} dark />
            ) : (
                <>
                    <Avatar src={src} size='large' className='mr-sm' />
                    <span>
                        <ESTypography
                            className={subtitle ? 'mb-xs' : undefined}
                            level={6}
                        >
                            {title}
                        </ESTypography>
                        {subtitle && (
                            <ESTypography
                                className='text-white-6'
                                variant='caption'
                            >
                                {subtitle}
                            </ESTypography>
                        )}
                    </span>
                </>
            )}
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
