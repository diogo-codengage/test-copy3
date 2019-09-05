import PropTypes from 'prop-types'
import { space, SpaceProps } from 'styled-system'

import { SANStyled, SANElement } from '../../../Theme/createTheme'
import ESCardSelectFilter from 'sanar-ui/dist/Components/Molecules/CardSelectFilter'

export type ISANCardSelectFilterProps = PropTypes.InferProps<
    typeof ESCardSelectFilter['propTypes']
> &
    SpaceProps

const SANCardSelectFilter: SANElement<ISANCardSelectFilterProps> = SANStyled(
    ESCardSelectFilter
)`
    ${space}
`

export default SANCardSelectFilter
