import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ESCard from '../../Molecules/Card'
import ESTypography from '../Typography'

type IProps = PropTypes.InferProps<typeof propTypes>
const ESCardNextLive: React.FC<IProps & any> = ({ className, title, date, actions, ...props }) => {
    const classes = classNames('es-card-next-live', className)

    return (
        <ESCard actions={actions} {...props} className={classes}>
            <>
                <ESTypography
                    className='es-card-next-live__title mb-xs'
                    variant='body2'
                    strong
                    ellipsis={{ rows: 2 }}
                >
                    {title}
                </ESTypography>
                {date && (
                    <ESTypography type='muted' variant='caption'>
                        {date}
                    </ESTypography>
                )}
            </>
        </ESCard>
    )
}

const propTypes = Object.assign(
    { ...ESCard['propTypes'] },
    {
        className: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
        actions: PropTypes.arrayOf(PropTypes.node)
    }
)
ESCardNextLive.propTypes = propTypes

ESCardNextLive.defaultProps = {}

export default ESCardNextLive
