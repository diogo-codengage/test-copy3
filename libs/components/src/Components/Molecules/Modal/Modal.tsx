import PropTypes from 'prop-types'

import ESModal from 'sanar-ui/dist/Components/Atoms/Modal'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANModalProps = PropTypes.InferProps<typeof ESModal.propTypes>

const SANModal: SANElement<ISANModalProps> = SANStyled(ESModal)``

export default SANModal
