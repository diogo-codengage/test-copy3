import React from 'react'
import PropTypes from 'prop-types'

import ESCarousel from 'sanar-ui/dist/Components/Atoms/Carousel'

type IProps = PropTypes.InferProps<typeof propTypes>

const SANCarousel: React.FC<IProps> = props => {
    return <ESCarousel {...props} />
}

const propTypes = ESCarousel['propTypes']

SANCarousel.defaultProps = {}

export default SANCarousel
