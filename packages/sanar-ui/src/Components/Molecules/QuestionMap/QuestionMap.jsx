import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESModal from '../../Atoms/Modal'

const ESQuestionMap = ({ className, visible }) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-question-map', className)

    return (
        <ESModal
            className={classes}
            visible={visible}
            centered
            title={t('questionMap.title')}
        >
            <strong>ESQuestionMap</strong> works!
        </ESModal>
    )
}

ESQuestionMap.propTypes = {
    className: PropTypes.string
}
ESQuestionMap.defaultProps = {}

export default ESQuestionMap
