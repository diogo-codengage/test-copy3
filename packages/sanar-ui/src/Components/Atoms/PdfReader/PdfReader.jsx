import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import PDFObject from 'pdfobject'

const ESPdfReader = ({ className, url, ...props }) => {
    useEffect(() => {
        if (PDFObject.supportsPDFs) {
            PDFObject.embed(url, '#es-pdf')
        } else {
            console.error('Inline PDFs are not supported by this browser')
        }
    }, [url])

    return <div id='es-pdf' style={{ height: '100%', width: '100%' }} />
}

ESPdfReader.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string.isRequired
}
ESPdfReader.defaultProps = {}

export default ESPdfReader
