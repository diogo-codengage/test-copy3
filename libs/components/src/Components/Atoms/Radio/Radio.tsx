import PropTypes from 'prop-types'

import ESRadio from 'sanar-ui/dist/Components/Atoms/Radio'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANRadioProps = PropTypes.InferProps<typeof ESRadio['propTypes']>

const SANRadio = SANStyled(ESRadio)``

export default SANRadio
