import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'antd/lib/typography'
import { Row, Col } from 'antd'
import classNames from 'classnames'

const { Title, Text } = Typography

const ESSessionTitle = ({ className, title, subtitle, extra }) => {
    const classes = classNames('es-session-title', className)

    return (
        <Row
            type='flex'
            justify='space-between'
            align='bottom'
            className={classes}
        >
            <Col>
                <Title level={4}>{title}</Title>
                <Text>{subtitle}</Text>
            </Col>
            {extra && <Col>{extra}</Col>}
        </Row>
    )
}

ESSessionTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    extra: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    align: PropTypes.oneOf(['top', 'middle', 'bottom'])
}

ESSessionTitle.defaultProps = {
    align: 'bottom'
}

export default ESSessionTitle