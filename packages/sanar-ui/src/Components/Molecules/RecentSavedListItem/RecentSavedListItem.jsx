import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESAvatarListItem from '../AvatarListItem'
import ESTypography from '../../Atoms/Typography'
import { ESRow, ESCol } from '../../Atoms/Grid'

const ESRecentSavedListItem = ({ className, title, description }) => {
    const classes = classNames('es-recent-saved-list-item', className)
    return (
        <ESAvatarListItem className={classes}>
            <ESTypography
                className='mb-xs es-recent-saved-list-item--title'
                variant='subtitle2'
                ellipsis
                strong
            >
                {title}
            </ESTypography>
            <ESTypography
                className='es-recent-saved-list-item--description'
                variant='caption'
            >
                {description}
            </ESTypography>
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
