import PropTypes from 'prop-types'

import ESQuestion from 'sanar-ui/dist/Components/Molecules/Question'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANQuestionProps = PropTypes.InferProps<
    typeof ESQuestion['propTypes']
>

const SANQuestion = SANStyled(ESQuestion)``

export default SANQuestion
