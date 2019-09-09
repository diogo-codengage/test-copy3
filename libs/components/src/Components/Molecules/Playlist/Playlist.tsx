import PropTypes from 'prop-types'

import ESPlaylist from 'sanar-ui/dist/Components/Molecules/Playlist'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export type ISANPlaylistProps = PropTypes.InferProps<
    typeof ESPlaylist.propTypes
>

const SANPlaylist: SANElement<ISANPlaylistProps> = SANStyled(ESPlaylist)``

export default SANPlaylist
