import React, {
    useEffect,
    forwardRef,
    useRef,
    useCallback,
    useState
} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import ReactJWPlayer from 'react-jw-player'

import img from '../../../assets/images/questions/strike-disabled.svg'

const captions = {
    textColor: '#edc26d',
    textOpacity: 0,
    backgroundColor: '#0000',
    backgroundOpacity: 0,
    fontFamily: 'Nunito Sans',
    edgeStyle: 'none',
    windowColor: '#FF3F0A',
    windowOpacity: 0
}

const getPlayer = id => window.jwplayer && window.jwplayer(id)

const ESJwPlayer = ({ className, playerId, onReady, ...props }) => {
    const classes = classNames('es-jw-player', className)

    const handleReady = e => {
        const player = getPlayer(playerId)

        player.setCaptions(captions)
        onReady && onReady(e)
    }

    return (
        <div className={classes}>
            <ReactJWPlayer
                {...props}
                onReady={handleReady}
                playerId={playerId}
            />
        </div>
    )
}

ESJwPlayer.propTypes = Object.assign(
    {
        ...ReactJWPlayer['propTypes']
    },
    {
        className: PropTypes.string
    }
)
ESJwPlayer.defaultProps = {}

export default ESJwPlayer
