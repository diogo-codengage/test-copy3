import PropTypes from 'prop-types'

import ESSessionTitle from 'sanar-ui/dist/Components/Molecules/SessionTitle'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANSessionTitleProps = PropTypes.InferProps<typeof propTypes>

const SANSessionTitle = SANStyled(ESSessionTitle)``

const propTypes = ESSessionTitle['propTypes']

export default SANSessionTitle
