import React from 'react'
import PropTypes from 'prop-types'
import Button from 'antd/lib/button'
import classNames from 'classnames'

import ESIcon from '../Icon'

const ESButton: React.FC<IProps & any> = ({
    className,
    clear,
    size,
    variant,
    color,
    block,
    blockOnlyMobile,
    children,
    bold,
    uppercase,
    href,
    icon,
    circle,
    loading,
    htmlType,
    ...props
}) => {
    const classes = classNames(
        'es-button',
        className,
        {
            [`es-button__${size}`]: size,
            [`es-button__variant--${variant}`]: variant,
            [`${color}`]: color,
            'es-button__block': block,
            'es-button__block--mobile': blockOnlyMobile,
            loading,
            bold: bold,
            uppercase: uppercase,
            circle: circle
        },
        'ant-btn'
    )

    const mapChildren = child => {
        if (typeof child === 'string' || typeof child === 'number') {
            return <span>{child}</span>
        }
        return child
    }

    const kids =
        children && children.valueOf() > 1
            ? React.Children.map(children, mapChildren)
            : children

    if (!!href) {
        return (
            <a href={href} {...props} className={classes}>
                {icon && <ESIcon type={icon} />}
                {kids}
            </a>
        )
    }

    const Loading = () => <ESIcon type='loading' />

    return (
        <button
            disabled={loading}
            type={htmlType}
            className={classes}
            {...props}
        >
            {icon && <ESIcon type={icon} />}
            {loading && <Loading />}
            {kids}
        </button>
    )
}

type IProps = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign(
    { ...Button.propTypes },
    {
        className: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        loading: PropTypes.bool,

        htmlType: PropTypes.string,
        clear: PropTypes.bool,
        href: PropTypes.string,
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        target: PropTypes.string,
        size: PropTypes.oneOf(['xsmall', 'small', 'medium', 'large']),
        variant: PropTypes.oneOf(['solid', 'outlined', 'text']),
        color: PropTypes.oneOf([
            'primary',
            'secondary',
            'white',
            'black',
            'default',
            'light'
        ]),
        uppercase: PropTypes.any,
        circle: PropTypes.any,
        bold: PropTypes.bool,
        blockOnlyMobile: PropTypes.bool
    }
)

ESButton.propTypes = propTypes

ESButton.defaultProps = { size: 'medium', htmlType: 'button' }

export default ESButton
