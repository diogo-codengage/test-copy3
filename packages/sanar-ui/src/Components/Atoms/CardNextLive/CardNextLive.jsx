import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ESCard from '../../Molecules/Card'
import ESTypography from '../Typography'

const ESCardNextLive = ({ className, title, date, actions, ...props }) => {
    const classes = classNames('es-card-next-live', className)

    return (
        <ESCard actions={actions} {...props}>
            <>
                <ESTypography
                    className='es-card-next-live__title mb-xs'
                    variant='body2'
                    strong
                    ellipsis={{ rows: 2 }}
                >
                    {title}
                </ESTypography>
                <ESTypography type='muted' variant='caption'>
                    {date}
                </ESTypography>
            </>
        </ESCard>
    )
}

ESCardNextLive.propTypes = Object.assign(
    { ...ESCard['propTypes'] },
    {
        className: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
        actions: PropTypes.arrayOf(PropTypes.node)
    }
)

ESCardNextLive.defaultProps = {}

export default ESCardNextLive
