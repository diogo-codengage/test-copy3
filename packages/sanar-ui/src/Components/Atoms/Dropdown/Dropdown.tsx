import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from 'antd/lib/dropdown'
import classNames from 'classnames'

const ESDropdown: React.FC<IProps> = ({ className, component, ...props }) => {
    const classes = classNames('es-dropdown', className)

    return <Dropdown className={classes} {...props} overlay={propTypes.any}/>
}

type IProps = PropTypes.InferProps<typeof propTypes>

const propTypes = Object.assign(
    { ...Dropdown['propTypes'] },
    {
        className: PropTypes.string,
        disabled: PropTypes.bool,
        getPopupContainer: PropTypes.func,
        overlay: PropTypes.node,
        overlayClassName: PropTypes.string,
        overlayStyle: PropTypes.object,
        trigger: PropTypes.arrayOf(
            PropTypes.oneOf(['click', 'hover', 'contextMenu'])
        ),
        visible: PropTypes.bool,
        onVisibleChange: PropTypes.func,
        placement: PropTypes.oneOf([
            'bottomLeft',
            'bottomCenter',
            'bottomRight',
            'topLeft',
            'topCenter',
            'topRight'
        ])
    }
)
ESDropdown.propTypes = propTypes

ESDropdown.defaultProps = Dropdown['defaultProps']

export default ESDropdown
