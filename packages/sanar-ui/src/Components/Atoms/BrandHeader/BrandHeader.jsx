import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import logoDefault from '../../../assets/images/logo/full-logo.svg'
import whiteLogoDefault from '../../../assets/images/logo/white-logo.svg'

const ESBrandHeader = ({ className, size, darkMode, logo, whiteLogo }) => {
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
    logo: PropTypes.string,
    whiteLogo: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
}
ESBrandHeader.defaultProps = {
    size: 'medium',
    logo: logoDefault,
    whiteLogo: whiteLogoDefault
}

export default ESBrandHeader
