import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../Atoms/Typography'
import ESEvaIcon from '../../Atoms/EvaIcon'

const icons = {
    Video: 'play-circle-outline',
    Document: 'book-open-outline',
    Quiz: 'edit-outline'
}

const ESPlaylist = ({
    className,
    index,
    type,
    description,
    time,
    finish,
    current
}) => {
    const classes = classNames(
        'es-playlist-list__item',
        {
            'es-playlist-list__item--finish': finish,
            'es-playlist-list__item--current': current
        },
        className
    )
    return (
        <div className={classes}>
            <div className='d-flex align-items-center w-100'>
                <ESTypography variant='overline' className='index'>
                    {index}
                </ESTypography>
                <ESEvaIcon size='large' name={icons[type]} className='icon' />
                <ESTypography
                    ellipsis
                    variant='subtitle2'
                    className='description'
                >
                    {description}
                </ESTypography>
            </div>
            {time && (
                <ESTypography variant='overline' className='time'>
                    {time}
                </ESTypography>
            )}
        </div>
    )
}

ESPlaylist.propTypes = {
    className: PropTypes.string,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(Object.keys(icons)),
    description: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    time: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
}
ESPlaylist.defaultProps = {}

export default ESPlaylist
