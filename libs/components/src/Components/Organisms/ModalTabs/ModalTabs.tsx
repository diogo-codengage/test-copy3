import React from 'react'
import PropTypes from 'prop-types'

import ESModalTabs from 'sanar-ui/dist/Components/Organisms/ModalTabs'
import { SANSpin } from 'Components/Atoms/Spin'

export type ISANModalTabsProps = PropTypes.InferProps<
    typeof ESModalTabs['propTypes']
>

const SANModalTabs = props => <ESModalTabs {...props} />

export default SANModalTabs
