import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import historicalIssuesSvg from '../../../assets/images/historical-issues/historical-issues.svg'
import editSvg from '../../../assets/images/historical-issues/edit.svg'

import ESTypography from '../../Atoms/Typography'

const ESHistoricalIssuesItem = ({ className, title, subtitle, image }) => {
    const classes = classNames('es-historical-issues-item', className)
    return (
        <div className={classes}>
            <img
                className='es-historical-issues-item__img'
                src={image ? image : historicalIssuesSvg}
            />
            <div className='es-historical-issues-item__content'>
                <ESTypography
                    variant='subtitle2'
                    ellipsis
                    className='mb-sm text-grey-8'
                >
                    {title}
                </ESTypography>
                <div className='d-flex align-items-center'>
                    <img src={editSvg} />
                    <ESTypography
                        variant='caption'
                        className='text-grey-6 ml-sm'
                    >
                        {subtitle}
                    </ESTypography>
                </div>
            </div>
        </div>
    )
}

ESHistoricalIssuesItem.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}
ESHistoricalIssuesItem.defaultProps = {}

export default ESHistoricalIssuesItem
