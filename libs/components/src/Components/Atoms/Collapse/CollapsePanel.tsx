import PropTypes from 'prop-types'

import { ESCollapsePanel } from 'sanar-ui/dist/Components/Atoms/Collapse'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANCollapsePanelProps = PropTypes.InferProps<typeof propTypes>

const SANCollapse = SANStyled(ESCollapsePanel)``

const propTypes = ESCollapsePanel['propTypes']

export default SANCollapse
