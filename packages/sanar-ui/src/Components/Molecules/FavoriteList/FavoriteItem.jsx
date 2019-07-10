import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESTypography from '../../Atoms/Typography'
import ESEvaIcon from '../../Atoms/EvaIcon'

const ESFavoriteListItem = ({
    className,
    extra,
    extraIcon,
    icon,
    image,
    title,
    subtitle,
    ...props
}) => {
    const classes = classNames('es-favorite-item', className)
    return (
        <div className={classes} {...props}>
            <div
                className='es-favorite-item__img'
                style={{
                    backgroundImage: `url(${image})`
                }}
            />
            <div className='es-favorite-item__content'>
                <ESTypography
                    variant='subtitle2'
                    ellipsis
                    className='mb-sm text-grey-8'
                    strong
                >
                    {title}
                </ESTypography>
                <div className='d-flex align-items-center'>
                    <ESEvaIcon
                        size='medium'
                        name={icon}
                        className='es-favorite-item__content--icon'
                    />
                    <ESTypography
                        variant='caption'
                        className='text-grey-6 ml-sm'
                    >
                        {subtitle}
                    </ESTypography>
                </div>
            </div>
            <div className='es-favorite-item__action'>
                {extra && (
                    <ESEvaIcon
                        size='small'
                        name={extraIcon}
                        onClick={extra}
                        className='es-favorite-item__action--icon'
                    />
                )}
            </div>
        </div>
    )
}

ESFavoriteListItem.propTypes = {
    className: PropTypes.string,
    extra: PropTypes.func,
    extraIcon: PropTypes.string,
    image: PropTypes.string,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}
ESFavoriteListItem.defaultProps = {}

export default ESFavoriteListItem
