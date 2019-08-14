import React from 'react'
import PropTypes from 'prop-types'
import ESCard from '../Card'
import MetricCardBadge from './MetricCardBadge'
import ESTypography from '../../Atoms/Typography'

const ESMetricCard: React.FC<any>  = ({
    img,
    badge,
    description,
    status,
    doubt,
    title,
    loading,
    style
}) => {
    return (
        <ESCard
            className='es-metric-card'
            title={title}
            doubt={doubt}
            loading={loading}
            style={style}
        >
            <div className='es-metric-card__content'>
                <img src={img} alt={description} />
                <MetricCardBadge status={status}>{badge}</MetricCardBadge>
                <ESTypography
                    className='es-metric-card__content--description'
                    variant='caption'
                    ellipsis={{ rows: 2 }}
                >
                    {description}
                </ESTypography>
            </div>
        </ESCard>
    )
}

ESMetricCard.propTypes = {
    title: PropTypes.string.isRequired,
    doubt: PropTypes.string,
    img: PropTypes.string.isRequired,
    badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    loading: PropTypes.bool
}

export default ESMetricCard
