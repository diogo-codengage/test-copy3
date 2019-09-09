import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESBadge from '../../Atoms/Badge'
import ESTypography from '../../Atoms/Typography'

const manipuleLimit = (count, limit, suffix) =>
    limit && count > limit ? `${limit}${suffix}+` : `${count}${suffix}`

const ESCardInfo = ({ className, count, limit, suffix, image, text }) => {
    const classes = classNames('es-card-info', className)
    return (
        <div className={classes}>
            <img src={image} alt='' width={52} />
            <div className='es-card-info__content'>
                <ESBadge
                    solid
                    count={manipuleLimit(count, limit, suffix)}
                    status='warning'
                />
                <ESTypography ellipsis variant='caption'>
                    {text}
                </ESTypography>
            </div>
        </div>
    )
}

ESCardInfo.propTypes = {
    className: PropTypes.string,
    count: PropTypes.number,
    limit: PropTypes.number,
    suffix: PropTypes.string,
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}
ESCardInfo.defaultProps = {
    count: 1,
    suffix: ''
}

export default ESCardInfo
