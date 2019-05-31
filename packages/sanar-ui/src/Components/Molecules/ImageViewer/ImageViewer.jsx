import React, { useState, useMemo } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import useWindowSize from '../../../Hooks/useWindowSize'

import ESModal from '../../Atoms/Modal'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESButton from '../../Atoms/Button'

const ESImageViewer = ({ className, image, alt }) => {
    const { width } = useWindowSize()
    const [open, setOpen] = useState(false)
    const [isMobile, setMobile] = useState(false)
    const classes = classNames('es-image-viewer', className)

    useMemo(() => setMobile(width <= 992), [width, open])
    console.log(isMobile)
    return (
        <div className={classes}>
            <div
                className='es-image-viewer__small'
                onClick={() => setOpen(true)}
            >
                <img src={image} alt={alt} />
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
                centered
                className='es-image-viewer__full'
                onCancel={() => setOpen(false)}
                visible={open}
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
                <img src={image} alt={alt} />
            </ESModal>
        </div>
    )
}

ESImageViewer.propTypes = {
    className: PropTypes.string,
    image: PropTypes.string
}
ESImageViewer.defaultProps = {}

export default ESImageViewer
