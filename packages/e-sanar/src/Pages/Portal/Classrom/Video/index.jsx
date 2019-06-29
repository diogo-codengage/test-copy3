import React, { useState, useEffect, useRef } from 'react'

import classNames from 'classnames'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'

import ESJwPlayer from 'sanar-ui/dist/Components/Molecules/JwPlayer'
import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import { createDebounce } from 'sanar-ui/dist/Util/Debounce'

import { useApolloContext } from 'Hooks/apollo'

import { useAuthContext } from 'Hooks/auth'
import { GET_RATING } from 'Apollo/Classroom/queries/rating'
import { CREATE_RATING } from 'Apollo/Classroom/mutations/rate'

import SANQuiz from 'Components/Quiz'
import renderTabBar from './renderTabBar'
import { usePortalContext } from 'Pages/Portal/Context'
import { useClassroomContext } from '../Context'

const SANClassroomVideo = () => {
    const { t } = useTranslation('esanar')
    const playerRef = useRef()
    const {
        me: { id: userId }
    } = useAuthContext()
    const client = useApolloContext()
    const {
        currentResource,
        nextResource,
        prevResource,
        onNavigation,
        state: { currentModule }
    } = usePortalContext()

    const {
        handleBookmark,
        bookmarked,
        handleProgress,
        openMenu
    } = useClassroomContext()

    const [quizBookmarked, setQuizBookmarked] = useState()
    const [rate, setRate] = useState()
    const [playlistVideo, setPlaylistVideo] = useState()
    const [videoError, seVideoError] = useState()
    const [videoReady, seVideoReady] = useState()

    const handleVideoError = () => seVideoError(true)

    const handleVideoReady = () => seVideoReady(true)

    const handleQuizBookmark = () => {
        handleBookmark({
            resourceId: currentResource.quiz.id,
            resourceType: 'Quiz'
        })
        setQuizBookmarked(oldQuizBookmarked => !oldQuizBookmarked)
    }

    const handleRate = value => {
        setRate(value)
        client.mutate({
            mutation: CREATE_RATING,
            variables: {
                resourceId: currentResource.video.id,
                resourceType: currentResource.resource_type,
                userId,
                rating: { value, type: 'numeric' }
            }
        })
    }

    const onProgress = percentage => {
        const videoPercentage =
            currentResource && currentResource.video.progress.percentage
        if (!videoError && percentage !== videoPercentage) {
            const timeInSeconds = playerRef && playerRef.current.position()
            handleProgress({
                timeInSeconds: parseInt(timeInSeconds),
                percentage,
                resourceId: currentResource.video.id
            })
        }
    }

    const askQuestions = () => {
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
                    image: currentResource.video.thumbnails.medium.url
                }
            ])
            currentResource.quiz &&
                setQuizBookmarked(currentResource.quiz.bookmarked)
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
    }, [currentResource, playerRef.current, videoReady])

    return (
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
                    subtitle={`${t('global.subject')} 3, ${t(
                        'global.activity'
                    )} ${currentResource.index + 1}`}
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
                />
                {currentResource.quiz && (
                    <div className='classroom__video-container--buttons'>
                        <ESButton
                            size='small'
                            uppercase
                            bold
                            variant='solid'
                            className='questions'
                            onClick={askQuestions}
                        >
                            {t('classroom.askQuestions')}
                        </ESButton>
                        <ESButton
                            size='small'
                            uppercase
                            bold
                            variant='outlined'
                            color='white'
                            disabled
                        >
                            {t('classroom.viewDiscussions')}
                        </ESButton>
                    </div>
                )}
            </div>
            {currentResource.quiz && (
                <ESTabs
                    dark
                    center
                    tabBarGutter={0}
                    defaultActiveKey='1'
                    renderTabBar={renderTabBar({
                        bookmarked,
                        handleBookmark,
                        onClick: openMenu,
                        nextResource: nextResource && nextResource.title,
                        prevResource: prevResource && prevResource.title,
                        onPrev: onNavigation('prev'),
                        onNext: onNavigation('next'),
                        title: currentResource.video.title,
                        subtitle: `${t(
                            'global.subject'
                        )} ${currentModule.index + 1}, ${t(
                            'global.activity'
                        )} ${currentResource.index + 1}`,
                        label: t('classroom.rateClass'),
                        rate: {
                            value: rate,
                            onChange: handleRate
                        }
                    })}
                >
                    <ESTabPane tab={t('classroom.questions')} key='1'>
                        <SANQuiz
                            quiz={currentResource.quiz}
                            bookmarked={quizBookmarked}
                            handleBookmark={handleQuizBookmark}
                        />
                    </ESTabPane>
                    <ESTabPane
                        tab={t('classroom.discussions')}
                        key='2'
                        disabled
                    />
                </ESTabs>
            )}
        </div>
    )
}

export default SANClassroomVideo
