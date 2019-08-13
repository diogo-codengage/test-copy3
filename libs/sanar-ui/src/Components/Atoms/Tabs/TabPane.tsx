import React from 'react'
import PropTypes from 'prop-types'
import Tabs from 'antd/lib/tabs'
import classNames from 'classnames'

const TabPane = Tabs.TabPane

type IProps = PropTypes.InferProps<typeof propTypes>
const ESTabPane: React.FC<IProps> = ({ className, ...props }) => {
    const classes = classNames('es-tab-pane', className)

    return <TabPane className={classes} {...props} />
}


const propTypes = Object.assign(
    { ...TabPane['propTypes'] },
    {
        className: PropTypes.string
    }
)
ESTabPane.propTypes = propTypes

ESTabPane.defaultProps = TabPane['defaultProps']

export default ESTabPane
