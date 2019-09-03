import PropTypes from 'prop-types'

import ESPdfReader from 'sanar-ui/dist/Components/Atoms/PdfReader'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANPdfReaderProps = PropTypes.InferProps<typeof ESPdfReader['propTypes']>

const SANPdfReader = SANStyled(ESPdfReader)``

export default SANPdfReader
