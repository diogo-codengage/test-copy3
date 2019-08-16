import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ESPlaylistList from './PlaylistList'
import ESPlaylistItem from './PlaylistItem'
import ESTypography from '../../Atoms/Typography'
import ESSkeleton from '../../Atoms/Skeleton/Skeleton'

const ESPlaylist = ({
    className,
    items,
    loading,
    currentIndex,
    goToResource
}) => {
    const { t } = useTranslation('sanarui')
    const classes = classNames('es-playlist', className)

    const current = items[currentIndex]

    const renderItem = (item, index) => (
        <ESPlaylistItem
            key={index}
            index={index}
            item={item}
            onClick={goToResource}
            current={currentIndex === index}
        />
    )

    return loading ? (
        <>
            <ESSkeleton
                title={false}
                className='pl-md pr-md'
                active
                dark
                avatar
            />
            <ESSkeleton
                title={false}
                className='pl-md pr-md'
                paragraph={{ rows: 3, width: '100%' }}
                active
                dark
            />
        </>
    ) : (
        <div className={classes}>
            {current && (
                <div className='es-playlist__current-info'>
                    <div className='es-playlist__current-info__index'>
                        <ESTypography level={6}>
                            {current.index + 1}
                        </ESTypography>
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
                            {current[current.resource_type.toLowerCase()].title}
                        </ESTypography>
                    </div>
                </div>
            )}
            <ESPlaylistList>{items.map(renderItem)}</ESPlaylistList>
        </div>
    )
}

ESPlaylist.propTypes = {
    className: PropTypes.string
}
ESPlaylist.defaultProps = {}

export default ESPlaylist
