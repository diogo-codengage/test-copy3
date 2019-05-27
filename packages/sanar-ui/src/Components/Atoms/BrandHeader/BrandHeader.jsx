import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import logo from '../../../assets/images/logo/full-logo.svg'

const ESBrandHeader = ({ className }) => {
    const classes = classNames('es-brand-header', className)
    return (
        <div className={classes}>
            <img src={logo} alt='Sanar Logo in brand header.' />
        </div>
    )
}

ESBrandHeader.propTypes = {
    className: PropTypes.string
}
ESBrandHeader.defaultProps = {}

export default ESBrandHeader
