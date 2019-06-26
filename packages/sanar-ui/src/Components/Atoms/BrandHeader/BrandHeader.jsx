import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import logo from '../../../assets/images/logo/full-logo.svg'
import whiteLogo from '../../../assets/images/logo/white-logo.svg'

const ESBrandHeader = ({ className, size, darkMode }) => {
    const classes = classNames('es-brand-header', className, {
        'es-brand-header--small': size === 'small',
        'es-brand-header--large': size === 'large',
        'es-brand-header__dark': darkMode
    })
    return (
        <div className={classes}>
            <img
                src={darkMode ? whiteLogo : logo}
                alt='Sanar Logo in brand header.'
            />
        </div>
    )
}

ESBrandHeader.propTypes = {
    className: PropTypes.string,
    darkMode: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
}
ESBrandHeader.defaultProps = {
    size: 'medium'
}

export default ESBrandHeader
