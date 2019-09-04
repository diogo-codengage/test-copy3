import React from 'react'
import PropTypes from 'prop-types'
import Tabs from 'antd/lib/tabs'
import classNames from 'classnames'

const TabPane = Tabs.TabPane

const ESTabPane = ({ className, ...props }) => {
    const classes = classNames('es-tab-pane', className)
    console.log(props)
    return <TabPane className={classes} {...props} />
}

ESTabPane.propTypes = Object.assign(
    { ...TabPane['propTypes'] },
    {
        className: PropTypes.string
    }
)

ESTabPane.defaultProps = TabPane['defaultProps']

export default ESTabPane
