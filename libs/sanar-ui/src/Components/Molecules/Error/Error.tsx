import React from 'react'
import PropTypes from 'prop-types'
import ESButton from '../../Atoms/Button'
import ESTypography from '../../Atoms/Typography'
import { useTranslation } from 'react-i18next'
import errorImg from '../../../assets/images/errors/grey-error.svg'

const SANErrorPiece = ({ message, action, dark, ...props }) => {
    const { t } = useTranslation('sanarui')

    return (
        <div className='san-error-piece' {...props}>
            <img src={errorImg} />
            <ESTypography
                variant='body2'
                className='san-error-piece__message'
                type={dark ? 'light' : 'default'}
            >
                {message}
            </ESTypography>
            {action && (
                <ESButton
                    bold
                    color={dark ? 'secondary' : 'primary'}
                    size='xsmall'
                    uppercase
                    variant='solid'
                    onClick={action}
                    className='san-error-piece__button'
                >
                    {t('errorPiece.updateButton')}
                </ESButton>
            )}
        </div>
    )
}

SANErrorPiece.propTypes = {
    message: PropTypes.string,
    action: PropTypes.func,
    dark: PropTypes.bool
}

export default SANErrorPiece
