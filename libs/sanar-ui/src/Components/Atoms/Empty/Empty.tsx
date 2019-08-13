import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import { Empty } from 'antd'

type IProps = PropTypes.InferProps<typeof propTypes>

const ESEmpty: React.FC<IProps>=({ className, description, ...props }) => {
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

const propTypes = Object.assign({
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
})
ESEmpty.propTypes = propTypes


ESEmpty.defaultProps = {}

export default ESEmpty
