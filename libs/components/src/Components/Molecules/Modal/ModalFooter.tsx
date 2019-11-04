import PropTypes from 'prop-types'

import {
    flexbox,
    FlexboxProps,
    border,
    BorderProps,
    space,
    SpaceProps,
    compose
} from 'styled-system'

import { ESModalFooter } from 'sanar-ui/dist/Components/Atoms/Modal'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANModalFooterProps = PropTypes.InferProps<
    typeof ESModalFooter.propTypes
> &
    FlexboxProps &
    BorderProps &
    SpaceProps

const SANModalFooter: SANElement<ISANModalFooterProps> = SANStyled(
    ESModalFooter
)`
    && {
        ${compose(
            flexbox,
            border,
            space
        )}
    }
`

export default SANModalFooter
