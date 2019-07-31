import React from 'react'
import PropTypes from 'prop-types'

import ESTypography from '../../Atoms/Typography'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'

import videoSvg from '../../../assets/images/bookmark/video.svg'
import questionSvg from '../../../assets/images/bookmark/question.svg'
import documentSvg from '../../../assets/images/bookmark/document.svg'

const icon = {
    Document: documentSvg,
    Question: questionSvg,
    Video: videoSvg
}

const VideoDocument = ({ title, image }) => (
    <>
        <ESTypography variant='body2' strong>
            {title}
        </ESTypography>
        <div className='es-favorite-grid__item-container'>
            <div
                className='es-favorite-grid__item-container--image'
                style={{
                    backgroundImage: `url(${image})`
                }}
            />
        </div>
    </>
)

const Question = ({ title }) => (
    <ESTypography
        variant='subtitle2'
        className='es-favorite-grid__item--preview'
    >
        {title}
    </ESTypography>
)

const ESBookmarkGridItem = ({
    id,
    image,
    resourceType,
    subtitle,
    title,
    onRemove,
    onPress
}) => {
    const handleRemove = e => {
        e.stopPropagation()
        onRemove && onRemove(e)
    }

    return (
        <div className='es-favorite-grid__item' onClick={onPress}>
            <div className='es-favorite-grid__item-content'>
                {resourceType === 'Video' || resourceType === 'Document' ? (
                    <VideoDocument {...{ title, image }} />
                ) : (
                    <Question {...{ title }} />
                )}
            </div>
            <div className='es-favorite-grid__item--actions'>
                <img src={icon[resourceType]} alt='' width={21} />
                <ESTypography
                    variant='caption'
                    className='es-favorite-grid__item--actions-description'
                >
                    {subtitle}
                </ESTypography>
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
    image: PropTypes.string,
    resourceType: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    onRemove: PropTypes.func
}

export default ESBookmarkGridItem
