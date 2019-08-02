import React, { useCallback, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESTypography from '../../Atoms/Typography'

const ESDisciplineList = ({ className, items, activeId, onSelect, width }) => {
    const classes = classNames(
        'es-discipline-dropdown__menu__content',
        className
    )

    useEffect(() => {
        let element = document.getElementById(activeId)
        let parentElement = document.getElementById(
            'es-discipline-dropdown__scrollable'
        ).childNodes[0]

        if (element && parentElement) {
            parentElement.scrollTo({
                top: element.offsetTop,
                left: 0
            })
        }
    })

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
                    id={item.id}
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

    return (
        <div className={classes} id='es-discipline-dropdown__menu__content'>
            <Scrollbars
                id='es-discipline-dropdown__scrollable'
                renderTrackHorizontal={() => <div />}
            >
                {items.map(renderItems)}
            </Scrollbars>
        </div>
    )
}

ESDisciplineList.proptypes = {}

export default ESDisciplineList
