import React from 'react'
import PropTypes from 'prop-types'
import ESTypography from '../Typography'
import './style.less'
import ESButton from '../Button'
import { useTranslation } from 'react-i18next'

const ESPdfReader = ({ url }) => {
    const { t } = useTranslation('sanarui')

    return (
        <div style={{ height: '100%', width: '100%', paddingBottom: '5%' }}>
            <embed
                src={url}
                type='application/pdf'
                style={{ height: '95%', width: '100%' }}
            />
            <div
                style={{
                    height: '2%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    padding: 10
                }}
            >
                <ESTypography type='light' variant='caption'>
                    {t('pdfReader.problemRenderingPdf')}
                </ESTypography>
                <ESButton
                    variant='text'
                    color='secondary'
                    onClick={() => window.open(url)}
                >
                    <ESTypography variant='caption' type='secondary' strong>
                        {t('pdfReader.clickAndDownload')}
                    </ESTypography>
                </ESButton>
            </div>
        </div>
    )
}

ESPdfReader.propTypes = {
    url: PropTypes.string.isRequired
}
ESPdfReader.defaultProps = {}

export default ESPdfReader
