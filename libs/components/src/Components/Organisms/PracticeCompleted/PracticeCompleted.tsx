import PropTypes from 'prop-types'

import ESPracticeCompleted from 'sanar-ui/dist/Components/Organisms/PracticeCompleted'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANPracticeCompletedProps = PropTypes.InferProps<
    typeof ESPracticeCompleted['propTypes']
>

const SANPracticeCompleted = SANStyled(ESPracticeCompleted)``

export default SANPracticeCompleted
