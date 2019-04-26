import React from 'react'
import PropTypes from 'prop-types'
import Progress from 'antd/lib/progress'
import Typography from 'antd/lib/typography'
import { Row, Col } from 'antd'
import classNames from 'classnames'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESBadgePercent from '../../Atoms/BadgePercent'

const { Title } = Typography

const ESProgressBar = ({ className, percent, title, limit }) => {
    const classes = classNames('es-progress-bar', className)

    return (
        <div className={classes}>
            <Row type='flex' justify='space-between' align='middle'>
                <Col>
                    <Title className='es-progress-bar__title'>{title}</Title>
                </Col>
                <Col>
                    <Row
                        gutter={16}
                        type='flex'
                        justify='space-between'
                        align='middle'
                    >
                        <Col className='d-flex'>
                            <ESBadgePercent
                                fontSize={10}
                                count={percent}
                                status='warning'
                            />
                        </Col>
                        <Col className='d-flex es-progress-bar__icon'>
                            <ESEvaIcon
                                size='small'
                                name='award-outline'
                                color={percent >= limit && 'warning'}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <div className='es-progress-bar__progress'>
                <Progress size='small' percent={percent} showInfo={false} />
                <div
                    className='es-progress-bar__progress--limit'
                    style={{ width: `calc(100% - ${limit}%)` }}
                />
            </div>
        </div>
    )
}

ESProgressBar.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    percent: PropTypes.number,
    limit: PropTypes.number
}

ESProgressBar.defaultProps = {
    title: 'Progresso do curso',
    limit: 80
}

export default ESProgressBar
