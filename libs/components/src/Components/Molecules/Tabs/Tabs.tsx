import PropTypes from 'prop-types'
import { space, flex, SpaceProps, FlexProps } from 'styled-system'

import ESTabs from 'sanar-ui/dist/Components/Atoms/Tabs'

import { SANStyled } from '../../../Theme/createTheme'
import { ifNotProp, ifProp } from 'styled-tools'
import { css } from 'styled-components'

export type ISANTabsProps = PropTypes.InferProps<typeof ESTabs['propTypes']> &
    SpaceProps &
    FlexProps & { overflow?: boolean; container?: boolean }

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

    
    ${ifProp(
        'container',
        css`
            & .ant-tabs-nav-container {
                max-width: 978px;
                margin: 0 auto;
            }
        `
    )}

    & .ant-tabs-content {
        flex: 1;
    }

    ${space}
    ${flex}
`

export default SANTabs
