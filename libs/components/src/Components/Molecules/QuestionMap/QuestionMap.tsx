import PropTypes from 'prop-types'

import ESQuestionMap from 'sanar-ui/dist/Components/Molecules/QuestionMap'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANQuestionMapProps = PropTypes.InferProps<
    typeof ESQuestionMap['propTypes']
>

const SANQuestionMap = SANStyled(ESQuestionMap)``

export default SANQuestionMap
