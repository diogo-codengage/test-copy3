import React, { useState, useCallback } from 'react'
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
    onSelect
}) => {
    const classes = classNames('es-discipline-dropdown', className)
    const [open, setOpen] = useState(false)

    const totalDisicplines = items.length
    const currentDiscipline =
        items.findIndex(item => item.progress.done < item.progress.total) + 1

    const calcProgress = () => 0
    items.filter(item => item.progress.done === item.progress.total).length ===
    items.length
        ? 100
        : (currentDiscipline * 100) / totalDisicplines

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
            overlay={
                <ESDisciplineList
                    onSelect={onSelectItem}
                    activeId={activeItem.id}
                    items={items}
                />
            }
            className={classes}
            trigger={['click']}
            onVisibleChange={openControl}
            visible={open}
        >
            <div className='es-discipline-dropdown__menu'>
                <div className='d-flex align-items-center'>
                    <ESCircleProgress
                        strokeWidth={8}
                        width={32}
                        format={() =>
                            calcProgress() === 100 ? (
                                <ESEvaIcon
                                    className='es-discipline-dropdown__menu--all-completed'
                                    key={3}
                                    size='large'
                                    name='checkmark-outline'
                                />
                            ) : (
                                `${currentDiscipline}`
                            )
                        }
                        percent={calcProgress()}
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
