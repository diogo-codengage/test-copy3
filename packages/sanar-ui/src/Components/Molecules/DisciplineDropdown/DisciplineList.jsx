import React, { useCallback } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESTypography from '../../Atoms/Typography'

const ESDisciplineList = ({ className, items, onSelect }) => {
    const classes = classNames(
        'es-discipline-dropdown__menu__content',
        className
    )

    const renderItems = useCallback(
        (item, index) => {
            const classes = classNames(
                'es-discipline-dropdown__menu__content--item',
                {
                    'es-discipline-dropdown__menu__content--item--active':
                        item.active,
                    'es-discipline-dropdown__menu__content--item--has-suffix':
                        item.completed || item.incomplete
                }
            )

            return (
                <div
                    className={classes}
                    key={index}
                    onClick={() => onSelect(item)}
                >
                    {item.completed ? (
                        <ESEvaIcon name='checkmark-outline' />
                    ) : (
                        item.incomplete && <ESEvaIcon name='minus-outline' />
                    )}
                    <ESTypography variant='body2'>
                        {`${index + 1} - `}
                        {item.description}
                    </ESTypography>
                </div>
            )
        },
        [items]
    )

    return <div className={classes}>{items.map(renderItems)}</div>
}

ESDisciplineList.proptypes = {}

export default ESDisciplineList
