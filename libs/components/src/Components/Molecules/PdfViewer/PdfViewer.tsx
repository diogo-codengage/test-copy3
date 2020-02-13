import React from 'react'

import { isMobile } from 'react-device-detect'
import { PdfViewer, MobilePdfViewer } from 'reactjs-pdf-reader'

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

export interface ISANPdfViewerProps {
    url: string
    hasDownload?: boolean
}
const SANPdfViewer: React.FC<ISANPdfViewerProps> = ({
    url,
    hasDownload = true
}) => {
    const { t } = useTranslation('sanarui')

    const openPdf = () => window.open(url)

    return (
        <>
            <SANBox flex='1' displayFlex flexDirection='column' bg='#d1d1d1'>
                <SANStyledScroll>
                    {isMobile ? (
                        <MobilePdfViewer showAllPage url={`${url}`} />
                    ) : (
                        <PdfViewer scale={1} showAllPage url={`${url}`} />
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
                        {t('PdfReader.problemRenderingPdf')}
                    </SANTypography>
                    <SANButton
                        variant='text'
                        color='secondary'
                        size='xsmall'
                        onClick={openPdf}
                        bold
                    >
                        {t('PdfReader.clickAndDownload')}
                    </SANButton>
                </SANBox>
            )}
        </>
    )
}

export default SANPdfViewer
