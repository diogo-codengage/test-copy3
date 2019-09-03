import PropTypes from 'prop-types'

import ESJwPlayer from 'sanar-ui/dist/Components/Molecules/JwPlayer'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANJwPlayerProps = PropTypes.InferProps<typeof ESJwPlayer['propTypes']>

const SANJwPlayer = SANStyled(ESJwPlayer)``


export default SANJwPlayer
