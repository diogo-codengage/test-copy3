import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESDivider from '../../../Atoms/Divider'

const ESListSearch = ({ className, children, ...props }) => {
    const classes = classNames('es-list-search', className)

    return (
        <div className={classes} {...props}>
            <div className='pl-md pr-md mb-xs'>
                <ESDivider />
            </div>
            {children}
        </div>
    )
}

ESListSearch.propTypes = {
    className: PropTypes.string
}

ESListSearch.defaultProps = {}

export default ESListSearch
