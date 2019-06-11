import React, { useState } from 'react'
import { ESCol, ESRow } from '../Grid'
import ESTypography from '../Typography'
import classNames from 'classnames'
import PropTypes from 'prop-types'
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

const createSituation = (id, selected, correctAnswer) => {
    if (!selected && !correctAnswer) {
        return 'none'
    } else if (selected && selected === id && !correctAnswer) {
        return 'selected'
    } else if (selected && selected !== id && !correctAnswer) {
        return 'none'
    } else if (selected && correctAnswer) {
        if (selected === id && selected === correctAnswer) {
            return 'correct'
        } else if (selected === id && selected !== correctAnswer) {
            return 'wrong'
        } else if (
            (selected !== id &&
                selected !== correctAnswer &&
                correctAnswer !== id) ||
            (selected !== id &&
                selected === correctAnswer &&
                correctAnswer !== id)
        ) {
            return 'wrong-missed'
        } else if (
            selected !== id &&
            selected !== correctAnswer &&
            correctAnswer === id
        ) {
            return 'missed'
        }
    }
}

const ESAlternative = ({
    correctAnswer,
    id,
    index,
    percent,
    selected,
    text,
    onSelectAlternative
}) => {
    const [striped, setStriped] = useState(false)

    const situation = createSituation(id, selected, correctAnswer)

    const containerClasses = classNames(
        'es-alternative',
        'es-alternative__container',
        `es-alternative__container--${situation}`
    )

    const rowClasses = classNames(
        'es-alternative',
        'es-alternative__alternative-row'
    )

    const badgeClasses = classNames(
        'es-alternative',
        'es-alternative__badge',
        `es-alternative__badge--${situation}`
    )

    const badgeTextClasses = classNames(
        'es-alternative',
        'es-alternative__text',
        `es-alternative__text--${situation}`
    )

    const answerTextClasses = classNames(
        'es-alternative',
        'es-alternative__answer',
        { 'es-alternative__answer--striped': striped }
    )

    const patternClassNames = classNames('pattern', {
        pattern__success: situation === 'correct' || situation === 'missed',
        pattern__danger: situation === 'wrong',
        pattern__grey: situation === 'wrong-missed'
    })

    return (
        <div className='es-alternative__alternative-row' key={id}>
            <ESRow className={rowClasses}>
                <div
                    className={containerClasses}
                    onClick={() => onSelectAlternative(id)}
                >
                    <ESCol span={1}>
                        <div className={badgeClasses}>
                            <ESTypography
                                variant='subtitle2'
                                className={badgeTextClasses}
                            >
                                {createAcronym(index, percent)}
                            </ESTypography>
                        </div>
                    </ESCol>
                    <ESCol span={22} className='gutter-box'>
                        <ESTypography
                            ellipsis
                            variant='subtitle2'
                            className={answerTextClasses}
                        >
                            {text}
                        </ESTypography>
                    </ESCol>
                    <ESCol span={1} push={1}>
                        <div className={patternClassNames} />
                    </ESCol>
                </div>
            </ESRow>
            {!correctAnswer && (
                <img
                    src={striped ? enabledStrike : disabledStrike}
                    className='stripe-badge'
                    onClick={() => setStriped(!striped)}
                />
            )}
        </div>
    )
}

ESAlternative.propTypes = {
    situation: PropTypes.string,
    value: PropTypes.string,
    answer: PropTypes.string,
    striped: PropTypes.bool,
    onStripeClicked: PropTypes.func
}

export default ESAlternative
