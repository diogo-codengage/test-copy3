import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import logo from '../../../assets/images/logo/full-logo.svg'

const ESBrandHeader = ({ className, size }) => {
    const classes = classNames('es-brand-header', className, {
        'es-brand-header--small': size === 'small',
        'es-brand-header--large': size === 'large'
    })
    return (
        <div className={classes}>
            <img src={logo} alt='Sanar Logo in brand header.' />
        </div>
    )
}

ESBrandHeader.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'medium', 'large'])
}
ESBrandHeader.defaultProps = {
    size: 'medium'
}

export default ESBrandHeader
