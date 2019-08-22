import PropTypes from 'prop-types'
import { space, flex, SpaceProps, FlexProps } from 'styled-system'

import ESTabs from 'sanar-ui/dist/Components/Atoms/Tabs'

import { SANStyled } from '../../../Theme/createTheme'
import { ifNotProp } from 'styled-tools'
import { css } from 'styled-components'

export type ISANTabsProps = PropTypes.InferProps<typeof ESTabs['propTypes']> &
    SpaceProps &
    FlexProps & { overflow?: boolean }

const SANTabs = SANStyled(ESTabs)`
    display: flex;
    flex-direction: column;

    & > div:first-child {
        margin: 0;
    }

    ${ifNotProp(
        'overflow',
        css`
            overflow: inherit;
        `
    )}

    & .ant-tabs-content {
        flex: 1;
    }

    ${space}
    ${flex}
`

export default SANTabs
