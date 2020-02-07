import React from 'react'
import PropTypes from 'prop-types'

import { ESAvatarMenu } from 'sanar-ui/dist/Components/Organisms/MainMenu'

export type ISANAvatarMenuProps = PropTypes.InferProps<
    typeof ESAvatarMenu['propTypes']
>

const SANAvatarMenu: React.FC<ISANAvatarMenuProps> = props => (
    <ESAvatarMenu {...props} />
)

export default SANAvatarMenu
