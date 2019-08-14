import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Card } from 'antd'
import ESEvaIcon from '../../Atoms/EvaIcon/EvaIcon'
import ESTooltip from '../../Atoms/Tooltip/Tooltip'

type IProps = PropTypes.InferProps<typeof propTypes>
const ESCard: React.FC<IProps & any> = (
    { className, children, doubt, ...props },
    ref
) => {
    const classes = classNames('es-card', className)

    return (
        <Card className={classes} {...props} ref={ref}>
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

const propTypes = Object.assign(
    { ...Card.prototype['propTypes'] },
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
ESCard.propTypes = propTypes

export default forwardRef(ESCard)
