import PropTypes from 'prop-types'
import { space, SpaceProps } from 'styled-system'

import { SANStyled, SANElement } from '../../../Theme/createTheme'
import ESCardCourseModule from 'sanar-ui/dist/Components/Molecules/CardCourseModule'

type IProps = PropTypes.InferProps<typeof ESCardCourseModule['propTypes']> &
    SpaceProps

const SANCardCourseModule: SANElement<IProps> = SANStyled(ESCardCourseModule)`
    && {
        ${space}
    }
`

export default SANCardCourseModule
