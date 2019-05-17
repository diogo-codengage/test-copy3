import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { ESItem } from '../../../Atoms/Menu'
import ESEvaIcon from '../../../Atoms/EvaIcon'

const ESNavigationListItem = ({ className, title, icon, arrow, ...props }) => {
    const classes = classNames('es-navigation-list-item', className)

    return (
        <ESItem className={classes} {...props}>
            <span>
                {icon && icon}
                {title}
            </span>
            {arrow && (
                <ESEvaIcon
                    size='xsmall'
                    name='arrow-ios-forward-outline'
                    className='es-navigation-list-item__arrow'
                />
            )}
        </ESItem>
    )
}

ESNavigationListItem.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    arrow: PropTypes.bool
}

ESNavigationListItem.defaultProps = {
    arrow: true
}

export default ESNavigationListItem
