import React, { useState, useEffect, useRef } from 'react'

import { message } from 'antd'
import { useTranslation } from 'react-i18next'

import ESJwPlayer from 'sanar-ui/dist/Components/Molecules/JwPlayer'
import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'

import { useApolloContext } from 'Hooks/apollo'

import { useAuthContext } from 'Hooks/auth'
import { GET_RATING } from 'Apollo/Classroom/queries/rating'
import { CREATE_RATING } from 'Apollo/Classroom/mutations/rate'
import { CREATE_PROGRESS } from 'Apollo/Classroom/mutations/video-progress'

import SANQuiz from 'Components/Quiz'
import renderTabBar from './renderTabBar'
import { usePortalContext } from 'Pages/Portal/Context'
import { useClassroomContext } from '../Context'
import { useLayoutContext } from '../../Layout/Context'

const SANClassroomVideo = () => {
    const { t } = useTranslation('esanar')
    const playerRef = useRef()
    const {
        me: { id: userId },
        getEnrollment
    } = useAuthContext()
    const client = useApolloContext()
    const {
        currentResource,
        nextResource,
        prevResource,
        onNavigation,
        currentModule
    } = usePortalContext()

    const { openMenu, setOpenMenu } = useLayoutContext()
    const { handleBookmark, bookmarked } = useClassroomContext()

    const [quizBookmarked, setQuizBookmarked] = useState()
    const [rate, setRate] = useState()
    const [playlistVideo, setPlaylistVideo] = useState()

    const { id: enrollmentId } = getEnrollment()

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

    const handleProgress = percentage => () => {
        const timeInSeconds = playerRef && playerRef.currentResource.position()
        client.mutate({
            mutation: CREATE_PROGRESS,
            variables: {
                percentage,
                timeInSeconds: parseInt(timeInSeconds),
                enrollmentId,
                resourceId: currentResource.video.id,
                resourceType: currentResource.resource_type
            }
        })
    }

    const askQuestions = () => {
        const lessonHeader = document.getElementById('es-lesson-header')
        lessonHeader &&
            lessonHeader.scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            })
    }

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
    }, [client, currentResource, t, userId])

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

    return (
        <div className='classroom__video'>
            <div className='classroom__video-container'>
                <ESJwPlayer
                    type='html5'
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
                        onChange: handleRate
                    }}
                    onOpenMenu={() => setOpenMenu(!openMenu)}
                    onNext={() => console.log('onNext')}
                    onPrevious={() => console.log('onPrevious')}
                    onTwentyFivePercent={handleProgress(25)}
                    onFiftyPercent={handleProgress(50)}
                    onSeventyFivePercent={handleProgress(75)}
                    onOneHundredPercent={handleProgress(100)}
                />
                <div className='classroom__video-container--buttons'>
                    <ESButton
                        size='small'
                        uppercase
                        bold
                        variant='solid'
                        className='questions'
                        onClick={askQuestions}
                    >
                        Fazer Questões
                    </ESButton>
                    <ESButton
                        size='small'
                        uppercase
                        bold
                        variant='outlined'
                        color='white'
                        disabled
                    >
                        Ver discussões
                    </ESButton>
                </div>
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
