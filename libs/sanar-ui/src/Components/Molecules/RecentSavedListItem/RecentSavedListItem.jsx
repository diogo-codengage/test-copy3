import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESAvatarListItem from '../AvatarListItem'
import ESTypography from '../../Atoms/Typography'

const ESRecentSavedListItem = ({ className, title, description, avatar }) => {
    const classes = classNames('es-recent-saved-list-item', className)
    return (
        <ESAvatarListItem avatar={avatar} className={classes}>
            <ESTypography
                className='es-recent-saved-list-item--title'
                variant='subtitle2'
                ellipsis
                strong
            >
                {title}
            </ESTypography>
            {description && (
                <ESTypography
                    className='mt-xs es-recent-saved-list-item--description'
                    variant='caption'
                >
                    {description}
                </ESTypography>
            )}
        </ESAvatarListItem>
    )
}

ESRecentSavedListItem.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string || PropTypes.element
}
ESRecentSavedListItem.defaultProps = {}

export default ESRecentSavedListItem
