import React, { useState, useCallback, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESDropdown from '../../Atoms/Dropdown'
import ESCircleProgress from '../../Atoms/CircleProgress'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESDisciplineList from './DisciplineList'
import ESTypography from '../../Atoms/Typography'
import ESSkeleton from '../../Atoms/Skeleton'

const ESDisciplineDropdown = ({
    className,
    items,
    activeItem,
    loading,
    onSelect,
    progress
}) => {
    const classes = classNames('es-discipline-dropdown', className)
    const [open, setOpen] = useState(false)
    const disciplineDropdownRef = useRef()

    const openControl = useCallback(() => {
        setOpen(!open)
    }, [open])

    const onSelectItem = item => {
        setOpen(false)
        onSelect(item)
    }

    return loading ? (
        <div className='es-discipline-dropdown--loading'>
            <ESSkeleton dark avatar paragraph={{ rows: 0 }} active />
        </div>
    ) : (
        <ESDropdown
            getPopupContainer={() =>
                disciplineDropdownRef && disciplineDropdownRef.current
            }
            overlay={
                <ESDisciplineList
                    onSelect={onSelectItem}
                    activeId={activeItem.id}
                    items={items}
                    width={
                        disciplineDropdownRef.current &&
                        // @ts-ignore
                        disciplineDropdownRef.current.offsetWidth
                    }
                />
            }
            className={classes}
            trigger={['click']}
            onVisibleChange={openControl}
            visible={open}
        >
            <div
                className='es-discipline-dropdown__menu'
                ref={disciplineDropdownRef}
            >
                <div className='d-flex align-items-center'>
                    <ESCircleProgress
                        strokeWidth={8}
                        width={32}
                        format={() =>
                            progress === 100 ? (
                                <ESEvaIcon
                                    className='es-discipline-dropdown__menu--all-completed'
                                    key={3}
                                    size='large'
                                    name='checkmark-outline'
                                />
                            ) : (
                                <ESTypography variant='caption'>
                                    {progress.toFixed(0)}
                                </ESTypography>
                            )
                        }
                        percent={progress}
                        className='mr-xs'
                        status='warning'
                        color='white'
                        trailColor='grey'
                    />
                    <ESTypography variant='body2'>
                        {activeItem.name}
                    </ESTypography>
                </div>

                {open ? (
                    <ESEvaIcon
                        key={1}
                        size='large'
                        name='arrow-ios-upward-outline'
                    />
                ) : (
                    <ESEvaIcon
                        key={2}
                        size='large'
                        name='arrow-ios-downward-outline'
                    />
                )}
            </div>
        </ESDropdown>
    )
}

ESDisciplineDropdown.propTypes = {
    className: PropTypes.string,
    onSelect: PropTypes.func,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            active: PropTypes.bool,
            completed: PropTypes.bool,
            incomplete: PropTypes.bool
        })
    )
}
ESDisciplineDropdown.defaultProps = {}

export default ESDisciplineDropdown
