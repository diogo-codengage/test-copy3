import React, { useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESBrandHeader from '../../Atoms/BrandHeader'
import ESTypography from '../../Atoms/Typography'

import logo from '../../../assets/images/logo/logo-grey.svg'

const ESPasswordRecoveryTemplate = ({
    className,
    image,
    hideImage,
    title,
    subtitle,
    actionsMargin,
    actions,
    brandHeader,
    header,
    fullHeight,
    footer: footerProp
}) => {
    const classes = classNames('es-password-recovery-template', className, {
        'es-password-recovery-template--with-brand-header': brandHeader,
        'es-password-recovery-template--full-height': fullHeight
    })

    const classesInfo = classNames(
        'es-password-recovery-template__container-content__content__infos',
        className,
        {
            'es-password-recovery-template__container-content__content__infos--large-margin':
                actionsMargin === 'large'
        }
    )

    const footer = useMemo(() => {
        if (fullHeight) {
            if (!footerProp) {
                return (
                    <div className='es-password-recovery-template__footer'>
                        <img src={logo} alt='sanar-logo' />
                    </div>
                )
            } else {
                return footerProp
            }
        }
    }, [fullHeight, footerProp])

    return (
        <div className={classes}>
            {brandHeader && (header || <ESBrandHeader />)}
            <div className='es-password-recovery-template__container-content'>
                <div className='es-password-recovery-template__container-content__content'>
                    <div className={classesInfo}>
                        <img src={image} className={hideImage && 'hide'} />
                        <ESTypography
                            className='es-password-recovery-template__container-content__content__infos--title mb-md'
                            level={4}
                        >
                            {title}
                        </ESTypography>
                        <ESTypography
                            className='es-password-recovery-template__container-content__content__infos--subtitle'
                            variant='subtitle2'
                        >
                            {subtitle}
                        </ESTypography>
                    </div>

                    <div className='es-password-recovery-template__container-content__content__actions'>
                        {actions}
                    </div>
                </div>
            </div>

            {footer}
        </div>
    )
}

ESPasswordRecoveryTemplate.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    actions: PropTypes.node,
    actionsMargin: PropTypes.oneOf(['default', 'large']),
    brandHeader: PropTypes.bool,
    header: PropTypes.node,
    fullHeight: PropTypes.bool,
    footer: PropTypes.bool,
    hideImage: PropTypes.bool
}
ESPasswordRecoveryTemplate.defaultProps = {
    actionsMargin: 'default',
    brandHeader: true,
    fullHeight: true,
    hideImage: true
}

export default ESPasswordRecoveryTemplate
