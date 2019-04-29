import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Typography } from 'antd'

import ESCard from '../../Molecules/Card'

const { Title, Text } = Typography

const ESCardNextLive = ({ className, title, date, actions, ...props }) => {
    const classes = classNames('es-card-next-live', className)

    return (
        <ESCard actions={actions} {...props}>
            <>
                <Title className='es-card-next-live__title' level={4}>
                    {title}
                </Title>
                <Text className='es-card-next-live__date' disabled>
                    {date}
                </Text>
            </>
        </ESCard>
    )
}

ESCardNextLive.propTypes = Object.assign(
    { ...ESCard['propTypes'] },
    {
        className: PropTypes.string,
        title: PropTypes.string,
        date: PropTypes.string,
        actions: PropTypes.arrayOf(PropTypes.node)
    }
)

ESCardNextLive.defaultProps = {}

export default ESCardNextLive
