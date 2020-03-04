import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isMobile } from 'react-device-detect'

import { useTranslation } from 'react-i18next'

import ESTypography from '../Typography'
import ESButton from '../Button'

const ESPdfReader = ({ url, hasDownload = true, className }) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-pdf-reader', className)
    const pdf = (
        <iframe
            onLoad={() => clean()}
            src={`https://drive.google.com/viewerng/viewer?url=${url}?pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
            onCompositionStart
        />
    )

    const [document, setDocument] = useState(pdf)
    let interval

    const openPdf = () => window.open(url)

    useEffect(() => {
        retry()
    }, [])

    const clean = () => clearInterval(interval)

    const retry = () =>
        (interval = setInterval(
            () => {
                setDocument()
                setDocument(pdf)
            },
            isMobile ? 35000 : 10000
        ))

    return (
        <div className={classes}>
            {document}
            {hasDownload && (
                <div className='es-pdf-reader__footer'>
                    <ESTypography type='light' variant='caption'>
                        {t('pdfReader.problemRenderingPdf')}
                    </ESTypography>
                    <ESButton
                        variant='text'
                        color='secondary'
                        size='xsmall'
                        onClick={openPdf}
                        bold
                    >
                        {t('pdfReader.clickAndDownload')}
                    </ESButton>
                </div>
            )}
        </div>
    )
}

ESPdfReader.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string.isRequired
}
ESPdfReader.defaultProps = {}

export default ESPdfReader
