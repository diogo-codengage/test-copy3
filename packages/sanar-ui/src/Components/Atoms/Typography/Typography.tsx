import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { Typography as ANTTypography } from 'antd'
import ANTTypographyBase from 'antd/lib/typography/Base'

const levels = [1, 2, 3, 4, 5, 6]

const propTypes = Object.assign(
    { ...ANTTypography.propTypes},  {
        className: PropTypes.string,
        level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
        variant: PropTypes.oneOf([
            'subtitle1',
            'subtitle2',
            'body1',
            'body2',
            'caption',
            'overline'
        ]),
        transform: PropTypes.oneOf(['initial', 'uppercase']),
        regular: PropTypes.bool,
        code: PropTypes.bool,
        copyable: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({ text: PropTypes.string, onCopy: PropTypes.func })
        ]),
        delete: PropTypes.bool,
        disabled: PropTypes.bool,
        editable: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                editing: PropTypes.bool,
                onStart: PropTypes.func,
                onChange: PropTypes.func
            })
        ]),
        ellipsis: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.shape({
                rows: PropTypes.number,
                expandable: PropTypes.bool,
                onExpand: PropTypes.func
            })
        ]),
        strong: PropTypes.bool,
        mark: PropTypes.bool,
        underline: PropTypes.bool,
        onChange: PropTypes.func,
        type: PropTypes.oneOf([
            'info',
            'warning',
            'danger',
            'success',
            'muted',
            'default',
            'light',
            'secondary'
        ])
    })

type IPros = PropTypes.InferProps<typeof propTypes>

const ESTypography: React.FC<IPros> = ({
                          className,
                          type,
                          level,
                          variant,
                          regular,
                          transform,
                          ...props
                      }) => {
    const classes = classNames('es-typography', className, {
        [`es-typography--${type}`]: type,
        [`es-typography--${variant}`]: variant,
        'es-typography--regular': regular,
        [`es-typography--transform-${transform}`]: transform
    })

    const component = levels.includes(level) ? `h${level}` : 'div'
    return (
        <ANTTypographyBase
            className={classes}
            component={component}
            {...props}
        />
    )
}

ESTypography.propTypes = propTypes;

ESTypography.defaultProps = ANTTypography['defaultProps']

export default ESTypography
