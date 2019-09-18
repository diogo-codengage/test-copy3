import PropTypes from 'prop-types'

import { ESModalFooter } from 'sanar-ui/dist/Components/Atoms/Modal'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANModalFooterProps = PropTypes.InferProps<
    typeof ESModalFooter.propTypes
>

const SANModalFooter: SANElement<ISANModalFooterProps> = SANStyled(
    ESModalFooter
)``

export default SANModalFooter
