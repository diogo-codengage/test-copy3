import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import useWindowSize from '../../../Hooks/useWindowSize'

import ESModal from '../../Atoms/Modal'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'

const ESImageViewer: React.FC<any> = ({ className, images, alt }) => {
    if (!images.small.url.match(/\.(jpeg|jpg|png)$/)) {
        console.error(`ESImageViewer - it's not an image: ${images.small.url}`)
        return null
    }
    const { width } = useWindowSize()
    const [open, setOpen] = useState(false)
    const [isMobile, setMobile] = useState(false)
    const classes = classNames('es-image-viewer', className)
    const classesModal = classNames('es-image-viewer__full', {
        'es-image-viewer__full--mobile': isMobile
    })

    useEffect(() => setMobile(width <= 992), [width, open])

    return (
        <div className={classes}>
            <div
                className='es-image-viewer__small'
                onClick={() => setOpen(true)}
            >
                <img src={images.small.url} alt={alt} />
                <div className='es-image-viewer__small--hover'>
                    <ESEvaIcon name='maximize-outline' />
                </div>
            </div>

            {isMobile && open && (
                <ESButton
                    size='xsmall'
                    variant='solid'
                    color='white'
                    circle
                    onClick={() => setOpen(false)}
                    className='close-button-mobile'
                >
                    <ESEvaIcon name='close-outline' />
                </ESButton>
            )}

            <ESModal
                closable={false}
                centered={true}
                className={classesModal}
                onCancel={() => setOpen(false)}
                visible={open}
                width={isMobile ? '100%' : 'auto'}
            >
                {!isMobile && (
                    <ESButton
                        size='xsmall'
                        variant='solid'
                        color='white'
                        circle
                        onClick={() => setOpen(false)}
                        className='close-button-web'
                    >
                        <ESEvaIcon name='close-outline' />
                    </ESButton>
                )}
                <img src={images.large.url || images.medium.url} alt={alt} />
            </ESModal>
        </div>
    )
}

ESImageViewer.propTypes = {
    className: PropTypes.string,
    images: PropTypes.shape({
        small: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            url: PropTypes.string
        }),
        medium: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            url: PropTypes.string
        }),
        large: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
            url: PropTypes.string
        })
    })
}
ESImageViewer.defaultProps = {}

export default ESImageViewer
