import React from 'react'

import { isMobile } from 'react-device-detect'
import { PDFReader, MobilePDFReader } from 'reactjs-pdf-reader'

import { useTranslation } from 'react-i18next'

import { SANTypography } from '../../Atoms/Typography'
import { SANButton } from '../../Atoms/Button'
import { SANScroll } from '../../Atoms/Scroll'
import { SANBox } from '../../Atoms/Box'

import styled from 'styled-components'

const SANStyledScroll = styled(SANScroll)`
    &&& {
        @media (max-width: 1024px) {
            max-height: calc(100vh - 172px);
        }
        @media (max-width: 992px) {
            max-height: calc(100vh - 238px);
        }
        max-height: calc(100vh - 128px);
    }
`

export interface ISANPdfReaderProps {
    url: string
    hasDownload?: boolean
}
const SANPdfReader = ({ url, hasDownload = true }: ISANPdfReaderProps) => {
    const { t } = useTranslation('sanarui')

    const openPdf = () => window.open(url)

    return (
        <div>
            <SANBox flex='1' displayFlex flexDirection='column' bg='#d1d1d1'>
                <SANStyledScroll>
                    {isMobile ? (
                        <MobilePDFReader showAllPage url={`${url}`} />
                    ) : (
                        <PDFReader scale={1} showAllPage url={`${url}`} />
                    )}
                </SANStyledScroll>
            </SANBox>
            {hasDownload && (
                <SANBox
                    flexDirection={{ _: 'column', xs: 'row' }}
                    mt={{ _: 'sm', xs: 0 }}
                    displayFlex
                    alignItems='center'
                    justifyContent='center'
                >
                    <SANTypography type='light' variant='caption'>
                        {t('pdfReader.problemRenderingPdf')}
                    </SANTypography>
                    <SANButton
                        variant='text'
                        color='secondary'
                        size='xsmall'
                        onClick={openPdf}
                        bold
                    >
                        {t('pdfReader.clickAndDownload')}
                    </SANButton>
                </SANBox>
            )}
        </div>
    )
}

export default SANPdfReader
