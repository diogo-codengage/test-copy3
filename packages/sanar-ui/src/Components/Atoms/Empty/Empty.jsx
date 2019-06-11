import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import { Empty } from 'antd'

const ESEmpty = ({ className, description, ...props }) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-empty', className)
    return (
        <Empty
            description={description ? description : t('global.empty')}
            className={classes}
            {...props}
        />
    )
}

ESEmpty.propTypes = {
    className: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    imageStyle: PropTypes.object,
    image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
        PropTypes.oneOf([
            'Empty.PRESENTED_IMAGE_SIMPLE',
            'Empty.PRESENTED_IMAGE_DEFAULT'
        ])
    ])
}
ESEmpty.defaultProps = {}

export default ESEmpty
