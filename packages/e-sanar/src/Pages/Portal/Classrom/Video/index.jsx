import React, { useState, useEffect, useRef } from 'react'

import classNames from 'classnames'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

import ESJwPlayer from 'sanar-ui/dist/Components/Molecules/JwPlayer'
import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { SANErrorPiece } from 'sanar-ui/dist/Components/Molecules/Error'
import { createDebounce } from 'sanar-ui/dist/Util/Debounce'

import { useApolloContext } from 'Hooks/apollo'
import { useAuthContext } from 'Hooks/auth'

import { GET_RATING } from 'Apollo/Classroom/queries/rating'
import { CREATE_RATING } from 'Apollo/Classroom/mutations/rate'

import { usePortalContext } from 'Pages/Portal/Context'

import SANQuiz from 'Components/Quiz'
import renderTabBar from './renderTabBar'
import { useClassroomContext } from '../Context'
import SANDiscussion from './Discussion'

const ButtonTab = ({ active, className, ...props }) => (
    <ESButton
        size='small'
        uppercase
        bold
        color={!active ? 'white' : undefined}
        variant={active ? 'solid' : 'outlined'}
        className={classNames(className, { active: active })}
        {...props}
    />
)

const SANClassroomVideo = () => {
    const { t } = useTranslation('esanar')
    const playerRef = useRef()
    const {
        me: { id: userId }
    } = useAuthContext()
    const client = useApolloContext()
    const {
        currentResource,
        error,
        nextResource,
        prevResource,
        onNavigation,
        state: { currentModule }
    } = usePortalContext()

    const { handleProgress, openMenu } = useClassroomContext()

    const [rate, setRate] = useState()
    const [playlistVideo, setPlaylistVideo] = useState()
    const [videoError, seVideoError] = useState()
    const [videoReady, seVideoReady] = useState()
    const [activeKey, setActiveKey] = useState(currentResource.quiz ? '1' : '2')

    const handleVideoError = () => seVideoError(true)

    const handleVideoReady = () => seVideoReady(true)

    const handleRate = async value => {
        try {
            setRate(value)
            await client.mutate({
                mutation: CREATE_RATING,
                variables: {
                    resourceId: currentResource.video.id,
                    resourceType: currentResource.resource_type,
                    rating: { value, type: 'numeric' }
                }
            })
        } catch {
            message.error(t('classroom.failRateClass'))
        }
    }

    const onProgress = (percentage = 0) => {
        const videoPercentage =
            (currentResource &&
                currentResource.video.progress &&
                currentResource.video.progress.percentage) ||
            0

        if (!videoError && percentage >= videoPercentage) {
            const timeInSeconds =
                playerRef && playerRef.current
                    ? playerRef.current.position()
                    : 0
            handleProgress({
                timeInSeconds: parseInt(timeInSeconds),
                percentage,
                resourceId: currentResource.video.id
            })
        }
    }

    const goTab = key => () => {
        setActiveKey(key)
        const lessonHeader = document.getElementById('es-lesson-header')
        lessonHeader &&
            lessonHeader.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            })
    }

    const debounceProgress = createDebounce(onProgress, 500)
    const debounceRate = createDebounce(handleRate, 1000)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {
                    data: { rating }
                } = await client.query({
                    query: GET_RATING,
                    fetchPolicy: 'network-only',
                    variables: {
                        resourceId: currentResource.video.id,
                        userId
                    }
                })

                setRate(rating && rating.rating.value)
            } catch (e) {
                message.error(t('classroom.failLoadRating'))
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentResource, userId])

    useEffect(() => {
        if (currentResource) {
            const playler = currentResource.video.providers.data.find(
                provider => provider.code === 'jwplayer'
            )
            setPlaylistVideo([
                {
                    ...(playler && { file: playler.files.smil.url }),
                    image: currentResource.video.thumbnails.large
                }
            ])
        }
    }, [currentResource])

    useEffect(() => {
        if (
            currentResource.video &&
            currentResource.video.progress &&
            videoReady &&
            playerRef.current
        ) {
            const seconds = currentResource.video.progress.timeInSeconds
            playerRef &&
                playerRef.current.seek(seconds > 10 ? seconds - 10 : seconds)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentResource, playerRef, videoReady])

    return error ? (
        <div className='classroom__video'>
            <SANErrorPiece message={t('classroom.error')} dark={true} />
        </div>
    ) : (
        <div
            className={classNames('classroom__video', {
                'classroom__video--no-quiz': !currentResource.quiz
            })}
        >
            <div className='classroom__video-container'>
                <ESJwPlayer
                    onError={handleVideoError}
                    onReady={handleVideoReady}
                    ref={playerRef}
                    playerId='playerId'
                    playlist={playlistVideo}
                    playerScript='/jwplayer/jwplayer.js'
                    licenseKey={process.env.REACT_APP_JWPLAYER}
                    isMuted={false}
                    title={currentResource.video.title}
                    subtitle={`${t('global.subject')} ${currentModule.index +
                        1}, ${t('global.activity')} ${currentResource.index +
                        1}`}
                    rate={{
                        value: rate,
                        onChange: debounceRate
                    }}
                    onOpenMenu={openMenu}
                    onNext={onNavigation('next')}
                    onPrevious={onNavigation('prev')}
                    onTwentyFivePercent={() => debounceProgress(25)}
                    onFiftyPercent={() => debounceProgress(50)}
                    onSeventyFivePercent={() => debounceProgress(75)}
                    onOneHundredPercent={() => debounceProgress(100)}
                    onFirstFrame={() => debounceProgress(1)}
                />
                {currentResource.quiz ? (
                    <div className='classroom__video-container--buttons'>
                        <ButtonTab
                            onClick={goTab('1')}
                            active={activeKey === '1'}
                        >
                            {t('classroom.askQuestions')}
                        </ButtonTab>
                        <ButtonTab
                            onClick={goTab('2')}
                            active={activeKey === '2'}
                        >
                            {t('classroom.viewDiscussions')}
                        </ButtonTab>
                    </div>
                ) : (
                    <div className='classroom__video-container--button'>
                        <ButtonTab
                            onClick={goTab('2')}
                            active={activeKey === '2'}
                        >
                            {t('classroom.viewDiscussions')}
                        </ButtonTab>
                    </div>
                )}
            </div>

            <ESTabs
                dark
                center
                tabBarGutter={0}
                onChange={setActiveKey}
                activeKey={activeKey}
                renderTabBar={renderTabBar({
                    onClick: openMenu,
                    nextResource: nextResource && nextResource.title,
                    prevResource: prevResource && prevResource.title,
                    onPrev: onNavigation('prev'),
                    onNext: onNavigation('next'),
                    title: currentResource.video.title,
                    subtitle: `${t('global.subject')} ${currentModule.index +
                        1}, ${t('global.activity')} ${currentResource.index +
                        1}`,
                    label: t('classroom.rateClass'),
                    rate: {
                        value: rate,
                        onChange: handleRate
                    }
                })}
            >
                {currentResource.quiz && (
                    <ESTabPane tab={t('classroom.questions')} key='1'>
                        <SANQuiz
                            quiz={currentResource.quiz}
                            parentVideoId={currentResource.video.id}
                            scrollToOffsetElementPosition
                        />
                    </ESTabPane>
                )}
                <ESTabPane tab={t('classroom.discussions')} key='2'>
                    <SANDiscussion resourceId={currentResource.video.id} />
                </ESTabPane>
            </ESTabs>
        </div>
    )
}

export default SANClassroomVideo
