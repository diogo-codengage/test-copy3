import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { ESRow, ESCol } from '../../Atoms/Grid'
import ESBadge from '../../Atoms/Badge'
import ESTypography from '../../Atoms/Typography'
import { Avatar } from 'antd'

const manipuleLimit = (count, limit, suffix) =>
    limit && count > limit ? `${limit}${suffix}+` : `${count}${suffix}`

const ESCardInfo = ({ className, count, limit, suffix, image, text }) => {
    const classes = classNames('es-card-info', className)
    return (
        <div className={classes}>
            <ESRow gutter={8} type='flex' align='middle'>
                <ESCol>
                    <Avatar src={image} size='large' />
                </ESCol>
                <ESCol className='es-card-info__content'>
                    <ESBadge
                        solid
                        count={manipuleLimit(count, limit, suffix)}
                        status='warning'
                    />
                    <ESTypography ellipsis variant='caption'>
                        {text}
                    </ESTypography>
                </ESCol>
            </ESRow>
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
