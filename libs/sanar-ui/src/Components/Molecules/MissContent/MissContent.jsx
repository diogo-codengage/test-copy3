import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ESTypography from '../../Atoms/Typography'
import ESButton from '../../Atoms/Button'

const ESMissContent = ({
    className,
    direction,
    fullSpace,
    buttonAction,
    buttonText,
    text,
    image
}) => {
    const classes = classNames('es-miss-content', className, {
        'es-miss-content--column': direction === 'column',
        'es-miss-content--full-space': fullSpace
    })

    return (
        <div className={classes}>
            <img className='es-miss-content--img' src={image} />
            <div className='es-miss-content__content'>
                <ESTypography
                    className='es-miss-content__content--text'
                    regular
                    level={5}
                >
                    {text}
                </ESTypography>
                {buttonText && (
                    <ESButton
                        size='xsmall'
                        variant='text'
                        color='primary'
                        bold
                        uppercase
                        onClick={buttonAction}
                    >
                        {buttonText}
                    </ESButton>
                )}
            </div>
        </div>
    )
}

ESMissContent.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    buttonAction: PropTypes.func,
    image: PropTypes.string,
    direction: PropTypes.string,
    fullSpace: PropTypes.bool
}
ESMissContent.defaultProps = {}

export default ESMissContent
