import React from 'react'
import PropTypes from 'prop-types'
import Progress from 'antd/lib/progress'
import Typography from 'antd/lib/typography'
import { Row, Col } from 'antd'
import classNames from 'classnames'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESBadgePercent from '../../Atoms/BadgePercent'
import ESTypography from '../../Atoms/Typography'

const ESProgressBar = ({ className, percent, title, limit }) => {
    const classes = classNames('es-progress-bar', className)

    return (
        <div className={classes}>
            <Row type='flex' justify='space-between' align='middle'>
                <Col>
                    <ESTypography level={6} className='es-progress-bar__title'>
                        {title}
                    </ESTypography>
                </Col>
                <Col>
                    <Row
                        gutter={16}
                        type='flex'
                        justify='space-between'
                        align='middle'
                    >
                        <Col>
                            <ESBadgePercent count={percent} status='warning' />
                        </Col>
                        <Col className='es-progress-bar__icon'>
                            <ESEvaIcon
                                size='small'
                                name='award-outline'
                                color={percent >= limit ? 'warning' : 'default'}
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
    percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    limit: PropTypes.number
}

ESProgressBar.defaultProps = {
    title: 'Progresso do curso',
    limit: 80
}

export default ESProgressBar
