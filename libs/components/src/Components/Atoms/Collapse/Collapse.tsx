import PropTypes from 'prop-types'
import { space, SpaceProps } from 'styled-system'

import ESCollapse from 'sanar-ui/dist/Components/Atoms/Collapse'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANCollapseProps = PropTypes.InferProps<
    typeof ESCollapse.propTypes & SpaceProps
>

const SANCollapse: SANElement<ISANCollapseProps> = SANStyled(ESCollapse)`
    && {
        ${space}
    }
`

export default SANCollapse
