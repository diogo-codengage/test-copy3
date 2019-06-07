import React from 'react'
import { storiesOf } from '@storybook/react'
import ESPdfReader from './PdfReader'

const url =
    'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'

storiesOf('Atoms.PdfReader', module).add(
    'Simple',
    () => <ESPdfReader url={url} />,
    {
        style: {
            padding: 0,
            height: '100vh'
        }
    }
)
