import React from 'react'
import { storiesOf } from '@storybook/react'
import ESPdfReader from './PdfReader'

const url =
    'https://plataforma-cursos-residencia-uploads.s3-sa-east-1.amazonaws.com/MANUAL+DE+ACESSO+À+PLATAFORMA.pdf'

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
