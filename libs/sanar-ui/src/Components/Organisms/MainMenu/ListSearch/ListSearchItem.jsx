import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../../Atoms/Typography'
import ESEvaIcon from '../../../Atoms/EvaIcon'

const ESListSearchItem = ({ className, title, onClick }) => {
    const classes = classNames('es-list-search-item', className)

    return (
        <div className={classes} onClick={onClick}>
            <div className='d-flex align-items-center'>
                <div className='es-list-search-item--icon' />
                <ESTypography
                    ellipsis
                    variant='subtitle2'
                    className='text-grey-7'
                >
                    {title}
                </ESTypography>
            </div>
            <ESEvaIcon
                className='text-grey-4'
                name='arrow-ios-forward-outline'
                size='xsmall'
            />
        </div>
    )
}

ESListSearchItem.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func
}

ESListSearchItem.defaultProps = {}

export default ESListSearchItem
