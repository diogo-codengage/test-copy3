import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESModal from '../../Atoms/Modal'
import ESTypography from '../../Atoms/Typography'

const Circle = ({ index, status, current, mock }) => {
    const classes = classNames('es-question-map__circle', {
        [`es-question-map__circle--${status}`]: !mock,
        'es-question-map__circle--current': current,
        'es-question-map__circle--mock--answered':
            mock && (status === 'correct' || status === 'wrong')
    })
    return (
        <div className={classes}>
            <ESTypography level={6}>{index}</ESTypography>
        </div>
    )
}

const ESQuestionMap = ({ className, visible, items, mock }) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-question-map', className)

    const renderCircle = (item, i) => (
        <Circle key={i} {...item} index={i + 1} mock={mock} />
    )

    return (
        <ESModal
            className={classes}
            visible={visible}
            centered
            width={400}
            title={t('questionMap.title')}
        >
            <div className='es-question-map__list'>
                {items.map(renderCircle)}
            </div>
        </ESModal>
    )
}

ESQuestionMap.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            status: PropTypes.oneOf(['correct', 'wrong']),
            correct: PropTypes.bool
        })
    ).isRequired,
    mock: PropTypes.bool
}
ESQuestionMap.defaultProps = {}

export default ESQuestionMap
