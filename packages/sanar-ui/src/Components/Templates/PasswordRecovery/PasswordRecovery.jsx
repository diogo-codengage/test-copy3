import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESBrandHeader from '../../Atoms/BrandHeader'
import ESTypography from '../../Atoms/Typography'

const ESPasswordRecoveryTemplate = ({
    className,
    image,
    title,
    subtitle,
    actionsMargin,
    actions,
    brandHeader,
    fullHeight
}) => {
    const classes = classNames('es-password-recovery-template', className, {
        'es-password-recovery-template--with-brand-header': brandHeader,
        'es-password-recovery-template--full-height': fullHeight
    })

    const classesInfo = classNames(
        'es-password-recovery-template__content__infos',
        className,
        {
            'es-password-recovery-template__content__infos--large-margin':
                actionsMargin === 'large'
        }
    )

    return (
        <div className={classes}>
            {brandHeader && (
                <ESBrandHeader className='es-password-recovery-template__header' />
            )}
            <div className='es-password-recovery-template__content'>
                <div className={classesInfo}>
                    <img src={image} />
                    <ESTypography
                        className='es-password-recovery-template__content__infos--title mb-md'
                        level={4}
                    >
                        {title}
                    </ESTypography>
                    <ESTypography
                        className='es-password-recovery-template__content__infos--subtitle'
                        variant='subtitle2'
                    >
                        {subtitle}
                    </ESTypography>
                </div>

                <div className='es-password-recovery-template__content__actions'>
                    {actions}
                </div>
            </div>
        </div>
    )
}

ESPasswordRecoveryTemplate.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    actions: PropTypes.element,
    actionsMargin: PropTypes.oneOf(['default', 'large']),
    brandHeader: PropTypes.bool,
    fullHeight: PropTypes.bool
}
ESPasswordRecoveryTemplate.defaultProps = {
    actionsMargin: 'default',
    brandHeader: true,
    fullHeight: true
}

export default ESPasswordRecoveryTemplate
