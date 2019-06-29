import React, { useCallback } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESTypography from '../../Atoms/Typography'

const ESDisciplineList = ({ className, items, activeId, onSelect, width }) => {
    const classes = classNames(
        'es-discipline-dropdown__menu__content',
        className
    )

    const renderItems = useCallback(
        (item, index) => {
            //TODO: remove validation when the BFF returns non null object to progress
            if (!item.progress) {
                item.progress = {
                    done: 0,
                    total: 1
                }
            }

            const { total, done } = item.progress
            const classes = classNames(
                'es-discipline-dropdown__menu__content--item',
                {
                    'es-discipline-dropdown__menu__content--item--active':
                        item.id === activeId,
                    'es-discipline-dropdown__menu__content--item--has-suffix':
                        done > 0
                }
            )

            return (
                <div
                    className={classes}
                    key={index}
                    onClick={() => onSelect(item)}
                    style={{ width }}
                >
                    {total == done ? (
                        <ESEvaIcon name='checkmark-outline' />
                    ) : (
                        done > 0 && <ESEvaIcon name='minus-outline' />
                    )}
                    <ESTypography variant='body2'>
                        {`${index + 1} - `}
                        {item.name}
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
