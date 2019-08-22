import PropTypes from 'prop-types'

import { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANTabPaneProps = PropTypes.InferProps<
    typeof ESTabPane['propTypes']
>

const SANTabPane = SANStyled(ESTabPane)`
`

export default SANTabPane
