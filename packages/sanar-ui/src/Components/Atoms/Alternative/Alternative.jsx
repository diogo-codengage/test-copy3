import React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { ESCol, ESRow } from '../Grid'
import ESTypography from '../Typography'

import disabledStrike from '../../../assets/images/questions/strike-disabled.svg'
import enabledStrike from '../../../assets/images/questions/strike-enabled.svg'

const createAcronym = (index, percent) => {
    if (percent) {
        return percent
    } else {
        switch (index) {
            case 0:
                return 'A'
            case 1:
                return 'B'
            case 2:
                return 'C'
            case 3:
                return 'D'
            case 4:
                return 'E'
        }
    }
}

const ESAlternative = forwardRef(
    ({ id, index, percent, text, onSelect, status }, ref) => {
        const [striped, setStriped] = useState(false)

        const containerClasses = classNames(
            'es-alternative__container',
            `es-alternative__container--${status}`
        )

        const patternClassNames = classNames('pattern', {
            pattern__success:
                status === 'correct' || status === 'correct-when-miss',
            pattern__danger: status === 'incorrect',
            pattern__grey: status === 'incorrect-when-miss'
        })

        useImperativeHandle(ref, () => ({
            reset: () => setStriped(false)
        }))

        return (
            <div className='es-alternative'>
                <div
                    className={containerClasses}
                    onClick={() => onSelect && onSelect(id)}
                >
                    <div className='badge'>
                        <span className='badge__text'>
                            {createAcronym(index, percent)}
                        </span>
                    </div>
                    <ESTypography
                        variant='subtitle2'
                        className={classNames('answer', { striped: striped })}
                    >
                        {text}
                    </ESTypography>
                    <div className={patternClassNames} />
                </div>
                {(status === 'selected' || status === 'normal') && (
                    <img
                        src={striped ? enabledStrike : disabledStrike}
                        className='stripe-badge'
                        onClick={() => setStriped(!striped)}
                    />
                )}
            </div>
        )
    }
)

ESAlternative.propTypes = {
    index: PropTypes.number.isRequired,
    percent: PropTypes.string,
    text: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    status: PropTypes.oneOf([
        'normal',
        'selected',
        'correct',
        'incorrect',
        'correct-when-miss',
        'incorrect-when-miss'
    ])
}

export default ESAlternative
