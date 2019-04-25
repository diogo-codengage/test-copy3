import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Card, Tooltip, Icon } from 'antd'
import ESEvaIcon from '../../Atoms/EvaIcon/EvaIcon'

const ESCard = ({ className, children, doubt, ...props }) => {
    const classes = classNames('es-card', className)

    return (
        <Card className={classes} {...props}>
            {doubt && (
                <Tooltip
                    className='es-card__doubt'
                    placement='left'
                    title={doubt}
                >
                    <span>
                        <ESEvaIcon
                            name='question-mark-circle-outline'
                            size='small'
                        />
                    </span>
                </Tooltip>
            )}
            {children}
        </Card>
    )
}

ESCard.propTypes = Object.assign(
    { ...Card['propTypes'] },
    {
        title: PropTypes.string,
        extra: PropTypes.element,
        bordered: PropTypes.bool,
        loading: PropTypes.bool,
        hoverable: PropTypes.bool,
        children: PropTypes.element,
        className: PropTypes.string,
        size: PropTypes.string,
        type: PropTypes.string,
        actions: PropTypes.array,
        doubt: PropTypes.string
    }
)

ESCard.defaultProps = Object.assign(
    { ...Card['defaultProps'] },
    {
        size: 'small'
    }
)

export default ESCard
