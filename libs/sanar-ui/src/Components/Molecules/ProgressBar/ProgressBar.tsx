import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ESEvaIcon from '../../Atoms/EvaIcon'
import ESCommonBadge from '../../Atoms/CommonBadge'
import ESTypography from '../../Atoms/Typography'
import ESProgress from '../../Atoms/Progress/Progress'
import { ESRow, ESCol } from '../../Atoms/Grid'
import ESSkeleton from '../../Atoms/Skeleton'

const ESProgressBar: React.FC<any>  = ({ className, percent, title, limit, loading }) => {
    const classes = classNames('es-progress-bar', className)

    return (
        <div className={classes}>
            <ESSkeleton loading={loading} paragraph={false} title>
                <ESRow type='flex' justify='space-between' align='middle'>
                    <ESCol xs={12}>
                        <ESTypography
                            level={6}
                            className='es-progress-bar__title'
                        >
                            {title}
                        </ESTypography>
                    </ESCol>
                    <ESCol>
                        <ESRow
                            gutter={16}
                            type='flex'
                            justify='space-between'
                            align='middle'
                        >
                            <ESCol>
                                <ESCommonBadge
                                    count={percent}
                                    status='warning'
                                    suffix='%'
                                />
                            </ESCol>
                            <ESCol className='es-progress-bar__icon'>
                                <ESEvaIcon
                                    size='small'
                                    name='award-outline'
                                    className={percent >= limit && 'warning'}
                                />
                            </ESCol>
                        </ESRow>
                    </ESCol>
                </ESRow>
                <ESProgress
                    size='small'
                    status='warning'
                    percent={percent}
                    goal={limit}
                />
            </ESSkeleton>
        </div>
    )
}

ESProgressBar.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    percent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    limit: PropTypes.number,
    loading: PropTypes.bool
}

ESProgressBar.defaultProps = {
    title: 'Progresso do curso',
    limit: 80
}

export default ESProgressBar
