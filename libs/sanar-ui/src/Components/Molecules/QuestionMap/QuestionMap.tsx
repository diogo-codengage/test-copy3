import React, { useCallback } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESModal from '../../Atoms/Modal'
import ESTypography from '../../Atoms/Typography'

const Circle: React.FC<any>  = ({ index, status, current, mock }) => {
    const classes = classNames('es-question-map__circle', {
        [`es-question-map__circle--${status}`]: !mock,
        'es-question-map__circle--current': current,
        'es-question-map__circle--mock--answered':
            mock && (status === 'correct' || status === 'wrong')
    })
    return (
        <div className={classes}>
            <ESTypography level={6}>{index + 1}</ESTypography>
        </div>
    )
}

const Subtitle = ({ status, label }) => (
    <div className='item'>
        <div className={status} />
        <ESTypography variant='overline'>{label}</ESTypography>
    </div>
)

const ESQuestionMap = ({
    className,
    visible,
    items,
    current,
    mock,
    onCancel
}) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-question-map', className)

    const renderCircle = useCallback(
        (item, i) => (
            <Circle
                key={item.id}
                {...item}
                index={i}
                mock={mock}
                current={current === i}
            />
        ),
        [mock, items, current]
    )

    const columns = items.length < 4 ? items.length : 5

    return (
        <ESModal
            onCancel={onCancel}
            className={classes}
            visible={visible}
            centered
            width={400}
            title={t('questionMap.title')}
        >
            <div
                className='es-question-map__list'
                style={{ gridTemplateColumns: `repeat(${columns}, 40px)` }}
            >
                {items.map(renderCircle)}
            </div>
            <div className='es-question-map__subtitle'>
                {!mock && (
                    <>
                        <Subtitle
                            status='correct'
                            label={t('questionMap.correct')}
                        />
                        <Subtitle
                            status='wrong'
                            label={t('questionMap.wrong')}
                        />
                    </>
                )}
                <Subtitle status='current' label={t('questionMap.whereIs')} />
                {mock && (
                    <Subtitle
                        status='answered'
                        label={t('questionMap.answered')}
                    />
                )}
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
    mock: PropTypes.bool,
    current: PropTypes.number,
    onCancel: PropTypes.func,
    visible: PropTypes.bool
}
ESQuestionMap.defaultProps = {}

export default ESQuestionMap
