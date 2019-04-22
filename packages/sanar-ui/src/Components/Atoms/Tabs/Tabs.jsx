import React from 'react'
import PropTypes from 'prop-types'
import Tabs from 'antd/lib/tabs'
import classNames from 'classnames'

const ESTabs = ({ className, ...props }) => {
    const classes = classNames('es-tabs', className)

    return <Tabs className={classes} {...props} />
}

ESTabs.propTypes = Object.assign(
    { ...Tabs['propTypes'] },
    {
        className: PropTypes.string,
        activeKey: PropTypes.string,
        animated: PropTypes.bool,
        renderTabBar: PropTypes.node,
        defaultActiveKey: PropTypes.string,
        hideAdd: PropTypes.bool,
        size: PropTypes.oneOf(['default', 'large', 'small']),
        tabBarExtraContent: PropTypes.node,
        tabBarGutter: PropTypes.number,
        tabBarStyle: PropTypes.object,
        tabPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
        type: PropTypes.oneOf(['line', 'card', 'editable-card']),
        onChange: PropTypes.func,
        onEdit: PropTypes.func,
        onNextClick: PropTypes.func,
        onPrevClick: PropTypes.func,
        onTabClick: PropTypes.func
    }
)

ESTabs.defaultProps = Tabs['defaultProps']

export default ESTabs
