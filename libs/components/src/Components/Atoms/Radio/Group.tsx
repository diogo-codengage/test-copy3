import PropTypes from 'prop-types'

import { ESRadioGroup } from 'sanar-ui/dist/Components/Atoms/Radio'

import { SANStyled } from '../../../Theme/createTheme'

export type ISANRadioGroupProps = PropTypes.InferProps<
    typeof ESRadioGroup['propTypes']
>

const SANRadioGroup = SANStyled(ESRadioGroup)``

export default SANRadioGroup
