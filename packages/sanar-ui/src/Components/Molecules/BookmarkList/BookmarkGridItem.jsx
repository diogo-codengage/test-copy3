import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ESTypography from '../../Atoms/Typography'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'

import videoSvg from '../../../assets/images/bookmark/video.svg'
import questionSvg from '../../../assets/images/bookmark/question.svg'
import documentSvg from '../../../assets/images/bookmark/document.svg'
import documentPng from '../../../assets/images/bookmark/document-default.png'
import videoPng from '../../../assets/images/bookmark/video-default.png'

export const icon = {
    Document: documentSvg,
    Question: questionSvg,
    Video: videoSvg
}

const VideoDocument = ({ title, image, resourceType }) => {
    const img = !image
        ? resourceType === 'Document'
            ? documentPng
            : resourceType === 'Video'
            ? videoPng
            : image
        : image
    return (
        <>
            <ESTypography variant='body2' strong>
                {title}
            </ESTypography>
            <div className='es-favorite-grid__item-container'>
                <div
                    className='es-favorite-grid__item-container--image'
                    style={{
                        backgroundImage: `url(${img})`
                    }}
                />
            </div>
        </>
    )
}

const Question = ({ title }) => (
    <ESTypography
        variant='subtitle2'
        className='es-favorite-grid__item--preview'
    >
        {title}
    </ESTypography>
)

const ESBookmarkGridItem = ({
    className,
    image,
    resourceType,
    subtitle,
    title,
    onRemove,
    onClick
}) => {
    const classes = classNames('es-favorite-grid__item', className)
    const handleRemove = e => {
        e.stopPropagation()
        onRemove && onRemove(e)
    }

    return (
        <div className={classes} onClick={onClick}>
            <div className='es-favorite-grid__item-content'>
                {resourceType === 'Video' || resourceType === 'Document' ? (
                    <VideoDocument {...{ title, image, resourceType }} />
                ) : (
                    <Question {...{ title }} />
                )}
            </div>
            <div className='es-favorite-grid__item--actions'>
                <img src={icon[resourceType]} alt='' width={21} />
                {!!subtitle && (
                    <ESTypography
                        variant='caption'
                        className='es-favorite-grid__item--actions-description'
                    >
                        {subtitle}
                    </ESTypography>
                )}
                <ESButton
                    circle
                    onClick={handleRemove}
                    variant='text'
                    size='xsmall'
                    className='es-favorite-grid__item--actions-remove'
                >
                    <ESEvaIcon name='trash-outline' />
                </ESButton>
            </div>
        </div>
    )
}

ESBookmarkGridItem.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    resourceType: PropTypes.oneOf(['Video', 'Document', 'Question']).isRequired,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    onRemove: PropTypes.func,
    onClick: PropTypes.func
}

export default ESBookmarkGridItem
