import React from 'react'
import { PageHeader as ANTPageHeader } from 'antd'
import PropTypes from 'prop-types'
import Title from './Title'
import Extra from './Extra'
import './style.less'

const ESQuestionHeader = ({ title, extraTitle, subtitle, actions }) => {
    return (
        <ANTPageHeader
            // className='question-header'
            extra={<Extra actions={actions} />}
            title={
                <Title title={title} subtitle={subtitle} extra={extraTitle} />
            }
        />
    )
}

ESQuestionHeader.propTypes = {
    title: PropTypes.element,
    extra: PropTypes.element
}

export default ESQuestionHeader
