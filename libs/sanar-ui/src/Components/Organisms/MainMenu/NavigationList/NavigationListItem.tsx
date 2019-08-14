import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { ESItem } from '../../../Atoms/Menu'
import ESEvaIcon from '../../../Atoms/EvaIcon'

const ESNavigationListItem: React.FC<any> = ({
    className,
    title,
    icon,
    to,
    arrow,
    ...props
}) => {
    const classes = classNames('es-navigation-list-item', className)

    return (
        <ESItem
            activeClassName='es-navigation-list-item--active'
            className={classes}
            to={to ? to : null}
            {...props}
        >
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
