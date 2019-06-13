import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESPlaylistList from './PlaylistList'
import ESPlaylistItem from './PlaylistItem'
import ESTypography from '../../Atoms/Typography'

const ESPlaylist = ({ className, items }) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-playlist', className)
    const current = items.find(item => item.current)

    return (
        <div className={classes}>
            {current && (
                <div className='es-playlist__current-info'>
                    <div className='es-playlist__current-info__index'>
                        <ESTypography level={6}>5</ESTypography>
                    </div>
                    <div className='es-playlist__current-info__description'>
                        <ESTypography variant='overline' className='title'>
                            {t('playlist.youAreIn')}:
                        </ESTypography>
                        <ESTypography
                            ellipsis
                            variant='subtitle1'
                            className='description'
                        >
                            {current.description}
                        </ESTypography>
                    </div>
                </div>
            )}
            <ESPlaylistList>
                {items.map((item, i) => (
                    <ESPlaylistItem key={item.id} index={i + 1} {...item} />
                ))}
            </ESPlaylistList>
        </div>
    )
}

ESPlaylist.propTypes = {
    className: PropTypes.string
}
ESPlaylist.defaultProps = {}

export default ESPlaylist
