import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../../Atoms/Typography'
import ESEvaIcon from '../../../Atoms/EvaIcon'

const ESLeftOff = ({
    className,
    title,
    thumbnail,
    classReference,
    moduleReference,
    label,
    onClick
}) => {
    const classes = classNames('es-left-off', className)

    return (
        <div className={classes} onClick={onClick}>
            <ESTypography level={6} className='mb-xs'>
                {title}
            </ESTypography>
            <ESTypography variant='overline' className='overline mb-sm'>
                {label}
            </ESTypography>
            <div className='es-left-off__class'>
                <div className='es-left-off__class--img'>
                    <img src={thumbnail} />
                    <div className='es-left-off__class--img--overlay'>
                        <ESEvaIcon name='play-circle' size='large' />
                    </div>
                </div>
                <div className='es-left-off__class--info pt-xs pb-xs pl-sm pr-sm'>
                    <ESTypography
                        ellipsis
                        variant='subtitle2'
                        strong
                        className='black'
                    >
                        {classReference}
                    </ESTypography>
                    <ESTypography ellipsis variant='caption' type='muted'>
                        {moduleReference}
                    </ESTypography>
                </div>
            </div>
        </div>
    )
}

ESLeftOff.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    classReference: PropTypes.string,
    moduleReference: PropTypes.string,
    label: PropTypes.string
}

ESLeftOff.defaultProps = {
    label: 'Continuar de onde parei'
}

export default ESLeftOff
