import PropTypes from 'prop-types'

import ESForm from 'sanar-ui/dist/Components/Molecules/Form'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANFormProps = PropTypes.InferProps<typeof ESForm.propTypes>

const SANForm: SANElement<ISANFormProps> = SANStyled(ESForm)``

export default SANForm
