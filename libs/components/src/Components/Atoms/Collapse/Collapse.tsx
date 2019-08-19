import PropTypes from 'prop-types'

import ESCollapse from 'sanar-ui/dist/Components/Atoms/Collapse'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANCollapseProps = PropTypes.InferProps<
    typeof ESCollapse.propTypes
>

const SANCollapse: SANElement<ISANCollapseProps> = SANStyled(ESCollapse)``

export default SANCollapse
