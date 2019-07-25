import React from 'react'
import PropTypes from 'prop-types'
import ESSplashLoader from 'sanar-ui/dist/Components/Atoms/SplashLoader'

import image from 'assets/images/logo.svg'

const SANSplashLoader = ({ size }) => (
    <ESSplashLoader size={size} image={image} />
)

SANSplashLoader.propTypes = {
    size: PropTypes.oneOf(['flexible', 'fullHeight'])
}

export default SANSplashLoader
