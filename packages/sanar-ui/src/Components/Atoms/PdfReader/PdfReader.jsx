import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useTranslation } from 'react-i18next'

import ESTypography from '../Typography'
import ESButton from '../Button'

const ESPdfReader = ({ url, className }) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-pdf-reader', className)

    const openPdf = () => window.open(url)

    return (
        <div className={classes}>
            <embed src={url} type='application/pdf' />
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
        </div>
    )
}

ESPdfReader.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string.isRequired
}
ESPdfReader.defaultProps = {}

export default ESPdfReader
