import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import ESTypography from '../../Atoms/Typography'
import ESEvaIcon from '../../Atoms/EvaIcon'

const getIconName = type => {
    switch (type) {
        case 'Document':
            return 'book-open-outline'
        case 'Question':
            return 'edit-outline'
        case 'Video':
            return 'play-circle-outline'
        default:
            return 'alert-circle-outline'
    }
}

const ESBookmarkListItem = ({
    id,
    className,
    image,
    resourceType,
    subtitle,
    title,
    onPress,
    onRemove
}) => {
    const classes = classNames('es-favorite-item', className)
    return (
        <div className={classes} onClick={onPress}>
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
                        key={`${resourceType}_${id}_icon`}
                        size='medium'
                        name={getIconName(resourceType)}
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
                {onRemove && (
                    <ESEvaIcon
                        key={`${resourceType}_${id}_grid_remove_icon`}
                        size='small'
                        name='trash-outline'
                        onClick={onRemove}
                        className='es-favorite-item__action--icon'
                    />
                )}
            </div>
        </div>
    )
}

ESBookmarkListItem.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    remove: PropTypes.func,
    image: PropTypes.string,
    resourceType: PropTypes.string,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    onRemove: PropTypes.func
}
ESBookmarkListItem.defaultProps = {}

export default ESBookmarkListItem
