import React from 'react'
import { storiesOf } from '@storybook/react'
import SANPdfReader from './PdfReader'

const url =
    'https://plataforma-cursos-residencia-uploads.s3-sa-east-1.amazonaws.com/MANUAL+DE+ACESSO+À+PLATAFORMA.pdf'

storiesOf('Molecules.PdfReader', module).add('Simple', () => (
    <SANPdfReader url={url} />
))
