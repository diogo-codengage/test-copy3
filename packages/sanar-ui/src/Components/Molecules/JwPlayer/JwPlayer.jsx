import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ReactJWPlayer from 'react-jw-player'

import ESButton from '../../Atoms/Button'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESTypography from '../../Atoms/Typography'
import ESRate from '../../Atoms/Rate'

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

const ESJwPlayer = ({
    className,
    playerId,
    onReady,
    onOpenMenu,
    onFavorite,
    onNext,
    onPrevious,
    rate,
    title,
    subtitle,
    ...props
}) => {
    const { t } = useTranslation('sanarui')
    const [isReady, setIsReady] = useState(false)
    const [isPause, setIsPause] = useState(false)
    const [isHover, setIsHover] = useState(false)
    const classes = classNames('es-jw-player', className)

    const handleReady = e => {
        const player = getPlayer(playerId)

        player.addButton(
            '',
            t('jwplayer.advance'),
            function() {
                player.seek(player.getPosition() + 10)
            },
            'es-jw-advance',
            'jw-svg-icon-advance'
        )

        onNext &&
            player.addButton(
                '',
                t('jwplayer.next'),
                function(e) {
                    onNext(e)
                },
                'es-jw-next',
                'jw-svg-icon-next'
            )

        onPrevious &&
            player.addButton(
                '',
                t('jwplayer.previous'),
                function(e) {
                    onPrevious(e)
                },
                'es-jw-previous',
                'jw-svg-icon-previous'
            )

        player.on('error', function() {
            player.load({
                file: '//content.jwplatform.com/videos/7RtXk3vl-52qL9xLP.mp4',
                image: '//content.jwplatform.com/thumbs/7RtXk3vl-480.jpg'
            })
            player.play()
        })

        player.on('pause', function() {
            setIsPause(true)
        })
        player.on('play', function() {
            setIsPause(false)
        })

        setIsReady(true)
        player.setCaptions(captions)
        onReady && onReady(e)
    }

    const handleHoverIn = () => setIsHover(true)
    const handleHoverOut = () => setIsHover(false)

    return (
        <div
            className={classes}
            onMouseOver={handleHoverIn}
            onMouseOut={handleHoverOut}
        >
            {isReady && (isPause || isHover) && (
                <div className='es-jw-player__header'>
                    <div className='es-jw-player__header--left'>
                        <ESButton
                            onClick={onOpenMenu}
                            circle
                            size='medium'
                            variant='text'
                        >
                            <ESEvaIcon name='menu-outline' />
                        </ESButton>
                        <div>
                            <ESTypography level={5} className='title'>
                                {title}
                            </ESTypography>
                            <ESTypography
                                variant='subtitle2'
                                className='subtitle'
                            >
                                {subtitle}
                            </ESTypography>
                        </div>
                    </div>
                    <div className='es-jw-player__header--right'>
                        <div>
                            <ESTypography
                                variant='subtitle2'
                                className='mr-xs ml-xs'
                            >
                                {t('jwplayer.rateClass')}:
                            </ESTypography>
                            <ESRate {...rate} />
                        </div>
                    </div>
                </div>
            )}
            {isReady && isPause && (
                <>
                    <ESEvaIcon
                        name='skip-back'
                        className='previous-center'
                        onClick={onPrevious}
                    />
                    <ESEvaIcon
                        name='skip-forward'
                        className='next-center'
                        onClick={onNext}
                    />
                </>
            )}
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
