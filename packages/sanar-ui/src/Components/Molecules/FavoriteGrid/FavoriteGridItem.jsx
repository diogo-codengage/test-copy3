import React from 'react'
import PropTypes from 'prop-types'
import ESTypography from '../../Atoms/Typography'
import ESEvaIcon from '../../Atoms/EvaIcon'

const ESFavoriteGridItem = ({
    resourceType,
    title,
    subtitle,
    preview,
    image,
    icon,
    action
}) => {
    return (
        <div className='es-favorite-grid__item'>
            {resourceType && resourceType !== 'Question' && (
                <ESTypography variant='body1' strong>
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
                >
                    {preview}
                </ESTypography>
            )}
            <div className='es-favorite-grid__item--actions'>
                <ESEvaIcon
                    name={icon}
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
                    name='trash-outline'
                    className='es-favorite-grid__item--actions-remove'
                    onClick={action}
                    size='large'
                />
            </div>
        </div>
    )
}

ESFavoriteGridItem.propTypes = {
    resourceType: PropTypes.string,
    preview: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    image: PropTypes.string,
    icon: PropTypes.string,
    action: PropTypes.func
}

export default ESFavoriteGridItem
