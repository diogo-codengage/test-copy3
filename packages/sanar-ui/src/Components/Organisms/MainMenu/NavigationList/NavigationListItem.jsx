import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { ESItem } from '../../../Atoms/Menu'
import ESEvaIcon from '../../../Atoms/EvaIcon'

const ESNavigationListItem = ({ className, title, icon, ...props }) => {
    const classes = classNames('es-navigation-list-item', className)

    return (
        <ESItem className={classes} {...props}>
            <span>
                {icon}
                {title}
            </span>
            <ESEvaIcon
                size='xsmall'
                color='default'
                name='arrow-ios-forward-outline'
                className='es-navigation-list-item__arrow'
            />
        </ESItem>
    )
}

ESNavigationListItem.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired
}

ESNavigationListItem.defaultProps = {}

export default ESNavigationListItem
