import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Card, Tooltip, Icon } from 'antd'
import ESEvaIcon from '../../Atoms/EvaIcon/EvaIcon'
import ESTooltip from '../../Atoms/Tooltip/Tooltip'

const ESCard = ({ className, children, doubt, ...props }) => {
    const classes = classNames('es-card', className)

    return (
        <Card className={classes} {...props}>
            {doubt && (
                <ESTooltip
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
                </ESTooltip>
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
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
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
