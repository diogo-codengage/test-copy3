import PropTypes from 'prop-types'

import ESStopwatch from 'sanar-ui/dist/Components/Atoms/Stopwatch'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANStopwatchProps = PropTypes.InferProps<
    typeof ESStopwatch.propTypes
>

const SANStopwatch = SANStyled(ESStopwatch)``

export default SANStopwatch
