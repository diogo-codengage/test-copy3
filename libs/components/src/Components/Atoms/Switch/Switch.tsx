import PropTypes from 'prop-types'

import ESSwitch from 'sanar-ui/dist/Components/Atoms/Switch'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANSwitchProps = PropTypes.InferProps<typeof ESSwitch.propTypes>

const SANSwitch = SANStyled(ESSwitch)``

export default SANSwitch
