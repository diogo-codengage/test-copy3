
import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { boolean, color, number, select } from '@storybook/addon-knobs'
import ESEvaIcon from '../../Atoms/EvaIcon'

const ESFeedbackUpload = ({ className }) => {
    const classes = classNames('es-feedback-upload', className)
    return (
        <div className={classes}>

            <div className='es-feedback-upload__text'>
                <ESEvaIcon className='es-feedback-upload__icon'
                    name='image-outline'
                />
                Carregar uma imagem de até <strong> 100kb </strong> de peso</div>

        </div>
    )
}

ESFeedbackUpload.propTypes = {
    className: PropTypes.string
}
ESFeedbackUpload.defaultProps = {}

export default ESFeedbackUpload
