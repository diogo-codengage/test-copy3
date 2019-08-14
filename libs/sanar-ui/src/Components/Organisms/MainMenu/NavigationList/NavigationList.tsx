import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESMenu from '../../../Atoms/Menu'

const ESNavigationList: React.FC<any> = ({ className, ...props }) => {
    const classes = classNames('es-navigation-list', className)

    return <ESMenu className={classes} {...props} />
}

ESNavigationList.propTypes = Object.assign(
    {
        ...ESMenu['proptypes']
    },
    {
        className: PropTypes.string
    }
)

ESNavigationList.defaultProps = ESMenu['defaultProps']

export default ESNavigationList
