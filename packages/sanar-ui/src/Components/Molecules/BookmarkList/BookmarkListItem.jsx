import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ESTypography from '../../Atoms/Typography'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'

import iconQuestion from '../../../assets/images/bookmark/icon-question.svg'
import documentPng from '../../../assets/images/bookmark/document-default.png'
import videoPng from '../../../assets/images/bookmark/video-default.png'

import { icon } from './BookmarkGridItem'

const ESBookmarkListItem = ({
    className,
    image,
    resourceType,
    subtitle,
    title,
    onRemove,
    onClick
}) => {
    const classes = classNames('es-favorite-list__item', className)
    const handleRemove = e => {
        e.stopPropagation()
        onRemove && onRemove(e)
    }

    const img = !image
        ? resourceType === 'Document'
            ? documentPng
            : resourceType === 'Video'
            ? videoPng
            : iconQuestion
        : image

    return (
        <div className={classes} onClick={onClick}>
            <div
                className='es-favorite-list__item--image'
                style={{
                    backgroundImage: `url(${img})`,
                    ...(resourceType === 'Video' &&
                        !image && { backgroundSize: 'cover' })
                }}
            />
            <div className='es-favorite-list__item--content'>
                <ESTypography
                    variant='subtitle2'
                    ellipsis
                    className='es-favorite-list__item--content-title'
                    strong
                >
                    {title}
                </ESTypography>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <img src={icon[resourceType]} alt='' width={21} />
                        {!!subtitle && (
                            <ESTypography
                                variant='caption'
                                className='text-grey-6 ml-sm'
                            >
                                {subtitle}
                            </ESTypography>
                        )}
                    </div>

                    <ESButton
                        circle
                        onClick={handleRemove}
                        variant='text'
                        size='xsmall'
                        className='es-favorite-list__item--content-remove'
                    >
                        <ESEvaIcon name='trash-outline' />
                    </ESButton>
                </div>
            </div>
        </div>
    )
}

ESBookmarkListItem.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    resourceType: PropTypes.oneOf(['Video', 'Document', 'Question']).isRequired,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    onRemove: PropTypes.func,
    onClick: PropTypes.func
}

export default ESBookmarkListItem
