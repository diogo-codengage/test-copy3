import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESTypography from '../../../Atoms/Typography'

const ESRanking = ({
    className,
    ranking,
    score
}) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-ranking', className)

    return (
        <div className={classes}>
            <ESTypography level={6}>
                RANKING {ranking} º
            </ESTypography>
            <div className="line-divisor"></div>
            <ESTypography level={6}>
                {score} {t('mainMenu.rankingPoints')}
            </ESTypography>
        </div>
    )
}

ESRanking.propTypes = {
    className: PropTypes.string,
    ranking: PropTypes.number,
    score: PropTypes.number,
}

ESRanking.defaultProps = {}

export default ESRanking
