import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import defaultImage from '../../../assets/images/logo/full-logo.svg'

import ESIcon from '../Icon'

const ESSplashLoader = ({ className, image }) => {
    const classes = classNames('es-splash-loader', className)
    return (
        <div className={classes}>
            <img src={image} alt='E-Sanar logo' />
            <ESIcon type='loading' />
        </div>
    )
}

ESSplashLoader.propTypes = {
    className: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}
ESSplashLoader.defaultProps = {
    image: defaultImage
}

export default ESSplashLoader
