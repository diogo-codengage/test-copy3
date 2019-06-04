import React from 'react'
import { ESCol, ESRow } from '../Grid'
import ESTypography from '../Typography'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import disabledStrike from '../../../assets/images/questions/strike-disabled.svg'
import enabledStrike from '../../../assets/images/questions/strike-enabled.svg'

const ESAlternative = ({
    situation,
    answer,
    value,
    striped,
    onStripeClicked
}) => {
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
        pattern__danger: situation === 'wrong'
    })

    return (
        <div className='es-alternative__alternative-row'>
            <ESRow className={rowClasses}>
                <div className={containerClasses}>
                    <ESCol span={1}>
                        <div className={badgeClasses}>
                            <ESTypography
                                variant='subtitle2'
                                className={badgeTextClasses}
                            >
                                {answer}
                            </ESTypography>
                        </div>
                    </ESCol>
                    <ESCol span={22} className='gutter-box'>
                        <ESTypography
                            ellipsis
                            variant='subtitle2'
                            className={answerTextClasses}
                        >
                            {value}
                        </ESTypography>
                    </ESCol>
                    <ESCol span={1} push={1}>
                        <div className={patternClassNames} />
                    </ESCol>
                </div>
            </ESRow>
            <img
                src={striped ? enabledStrike : disabledStrike}
                className='stripe-badge'
                onClick={onStripeClicked}
            />
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
