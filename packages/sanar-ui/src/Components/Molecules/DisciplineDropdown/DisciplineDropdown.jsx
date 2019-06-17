import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESDropdown from '../../Atoms/Dropdown'
import ESCircleProgress from '../../Atoms/CircleProgress'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESDisciplineList from './DisciplineList'
import ESTypography from '../../Atoms/Typography'

const ESDisciplineDropdown = ({ className, items, onSelect }) => {
    const classes = classNames('es-discipline-dropdown', className)

    const totalDisicplines = items.length
    const currentDiscipline = items.findIndex(item => item.active) + 1
    const activeDiscipline = items.find(item => item.active).description

    const calcProgress = () => {
        return (currentDiscipline * 100) / totalDisicplines
    }

    return (
        <ESDropdown
            overlay={<ESDisciplineList onSelect={onSelect} items={items} />}
            className={classes}
        >
            <div className='es-discipline-dropdown__menu'>
                <div className='d-flex align-items-center'>
                    <ESCircleProgress
                        strokeWidth={8}
                        width={32}
                        format={() => `${currentDiscipline}`}
                        percent={calcProgress()}
                        className='mr-xs'
                        status='warning'
                        color='white'
                    />
                    <ESTypography variant='body2'>
                        {activeDiscipline}
                    </ESTypography>
                </div>

                <ESEvaIcon size='large' name='arrow-ios-downward-outline' />
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
