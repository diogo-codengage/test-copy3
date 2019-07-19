import React from 'react'
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

const ESBookmarkGridItem = ({
    id,
    image,
    resourceType,
    subtitle,
    title,
    onRemove,
    onPress
}) => {
    return (
        <div className='es-favorite-grid__item'>
            {resourceType && resourceType !== 'Question' && (
                <ESTypography variant='body1' strong onClick={onPress}>
                    {title}
                </ESTypography>
            )}
            {resourceType &&
            (resourceType === 'Video' || resourceType === 'Document') ? (
                <img src={image} />
            ) : (
                <ESTypography
                    ellipsis={{ rows: 10, expandable: false }}
                    variant='subtitle2'
                    className='es-favorite-grid__item--preview'
                    onClick={onPress}
                >
                    {title}
                </ESTypography>
            )}
            <div className='es-favorite-grid__item--actions'>
                <ESEvaIcon
                    key={`${resourceType}_${id}_grid_icon`}
                    name={getIconName(resourceType)}
                    className='es-favorite-grid__item--actions-icon'
                    size='large'
                />
                <ESTypography
                    variant='body2'
                    className='es-favorite-grid__item--actions-description'
                >
                    {subtitle}
                </ESTypography>
                <ESEvaIcon
                    key={`${resourceType}_${id}_grid_remove_icon`}
                    name='trash-outline'
                    className='es-favorite-grid__item--actions-remove'
                    onClick={onRemove}
                    size='large'
                />
            </div>
        </div>
    )
}

ESBookmarkGridItem.propTypes = {
    image: PropTypes.string,
    resourceType: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    onRemove: PropTypes.func
}

export default ESBookmarkGridItem
