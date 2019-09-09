import React, {
    useState,
    forwardRef,
    useRef,
    useImperativeHandle,
    useMemo,
    useEffect
} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import { useTranslation } from 'react-i18next'

import ReactJWPlayer from 'react-jw-player'

import ESButton from '../../Atoms/Button'
import ESEvaIcon from '../../Atoms/EvaIcon'
import ESTypography from '../../Atoms/Typography'
import ESRate from '../../Atoms/Rate'
import ESSpin from '../../Atoms/Spin'

import useWindowSize from '../../../Hooks/useWindowSize'

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

const ESJwPlayer = forwardRef(
    (
        {
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
            BookmarkProps,
            ...props
        },
        ref
    ) => {
        const playerRef = useRef()
        const wrapperRef = useRef()
        const { t } = useTranslation('sanarui')
        const { width } = useWindowSize()
        const [isReady, setIsReady] = useState(false)
        const [error, setError] = useState(false)
        const [isPause, setIsPause] = useState(!props.autostart)
        const classes = classNames('es-jw-player', className)

        const handleSetupError = () => setError(true)

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
                setError(true)
                player.load({
                    file:
                        '//content.jwplatform.com/videos/7RtXk3vl-52qL9xLP.mp4',
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

            if (player.getWidth() > 1024) {
                player.resize('100%', '100vh')
            } else if (player.getWidth() > 576) {
                player.resize('100%', 'calc(100vh - 60px)')
            }

            setIsReady(true)
            player.setCaptions(captions)
            onReady && onReady(e)
        }

        useImperativeHandle(ref, () => ({
            ...playerRef,
            position: () => getPlayer(playerId).getPosition(),
            seek: seconds => getPlayer(playerId).seek(seconds)
        }))

        const height = useMemo(
            () =>
                wrapperRef.current &&
                parseInt(wrapperRef.current.clientWidth * 0.56),
            [wrapperRef.current]
        )

        useEffect(() => {
            if (width < 1024) {
                const player = getPlayer(playerId)
                player && player.resize('100%', 'calc(100vh - 60px)')
            } else {
                const player = getPlayer(playerId)
                player && player.resize('100%', '100vh')
            }
        }, [width])

        const player = getPlayer(playerId)
        const isIdle =
            !!player && player.getState && player.getState() === 'idle'

        return (
            <div className={classes} ref={wrapperRef}>
                {!error && !isReady && (
                    <ESSpin
                        dark
                        className='es-jw-player__loader'
                        style={{ height: `${height}px` }}
                    />
                )}
                {isReady && (
                    <div
                        className={classNames('es-jw-player__header', {
                            ['has-header']: isPause
                        })}
                    >
                        <div className='es-jw-player__header--left'>
                            <ESButton
                                onClick={onOpenMenu}
                                circle
                                size='medium'
                                variant='text'
                                className={classNames({
                                    ['visible']: isReady
                                })}
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
                            {BookmarkProps && (
                                <ESButton
                                    size='small'
                                    variant='text'
                                    color='white'
                                    onClick={BookmarkProps.onClick}
                                    className='mr-xs'
                                    bold
                                >
                                    {BookmarkProps.value ? (
                                        <ESEvaIcon
                                            name='heart'
                                            key='bookmarked'
                                            color='secondary'
                                        />
                                    ) : (
                                        <ESEvaIcon
                                            name='heart-outline'
                                            key='not-bookmarked'
                                        />
                                    )}
                                    {t('jwplayer.bookmark')}
                                </ESButton>
                            )}
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

                {isReady && (
                    <>
                        <ESEvaIcon
                            name='skip-back'
                            className={classNames('previous-center', {
                                idle: isIdle
                            })}
                            onClick={onPrevious}
                        />
                        <ESEvaIcon
                            name='skip-forward'
                            className={classNames('next-center', {
                                idle: isIdle
                            })}
                            onClick={onNext}
                        />
                    </>
                )}
                <ReactJWPlayer
                    {...props}
                    ref={playerRef}
                    onReady={handleReady}
                    onSetupError={handleSetupError}
                    playerId={playerId}
                />
            </div>
        )
    }
)

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
