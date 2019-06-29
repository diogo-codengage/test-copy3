import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESBrandHeader from '../../Atoms/BrandHeader'
import ESTypography from '../../Atoms/Typography'

const ESHelpCenterTemplate = ({
    className,
    image,
    title,
    subtitle,
    actionsMargin,
    actions,
    brandHeader
}) => {
    const classes = classNames('es-help-center-template', className, {
        'es-help-center-template--without-brand-header': !brandHeader
    })

    const classesInfo = classNames(
        'es-help-center-template__content__infos',
        className,
        {
            'es-help-center-template__content__infos--large-margin':
                actionsMargin === 'large'
        }
    )

    return (
        <div className={classes}>
            {brandHeader && (
                <ESBrandHeader className='es-help-center-template__header' />
            )}
            <div className='es-help-center-template__content'>
                <div className={classesInfo}>
                    <img src={image} />
                    <ESTypography
                        className='es-help-center-template__content__infos--title mb-md'
                        level={4}
                    >
                        {title}
                    </ESTypography>
                    <ESTypography
                        className='es-help-center-template__content__infos--subtitle'
                        variant='subtitle2'
                    >
                        {subtitle}
                    </ESTypography>
                </div>

                <div className='es-help-center-template__content__actions'>
                    {actions}
                </div>
            </div>
        </div>
    )
}

ESHelpCenterTemplate.propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    actions: PropTypes.element,
    actionsMargin: PropTypes.oneOf(['default', 'large']),
    brandHeader: PropTypes.bool
}
ESHelpCenterTemplate.defaultProps = {
    actionsMargin: 'default',
    brandHeader: true
}

export default ESHelpCenterTemplate
