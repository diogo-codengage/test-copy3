import React, { useState, useEffect, useRef } from 'react'

import { message } from 'antd'
import { useTranslation } from 'react-i18next'

import ESJwPlayer from 'sanar-ui/dist/Components/Molecules/JwPlayer'
import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'

import { useApolloContext } from 'Hooks/apollo'

import { useAuthContext } from 'Hooks/auth'
import { GET_RATING } from 'Apollo/Classroom/queries/rating'
import { CREATE_RATING } from 'Apollo/Classroom/mutations/rate'
import { CREATE_PROGRESS } from 'Apollo/Classroom/mutations/video-progress'

import SANQuiz from 'Components/Quiz'
import renderTabBar from './renderTabBar'
import { usePortalContext } from 'Pages/Portal/Context'

const SANClassroomVideo = () => {
    const { t } = useTranslation('esanar')
    const playerRef = useRef()
    const {
        me: { id: userId },
        getEnrollment
    } = useAuthContext()
    const client = useApolloContext()
    const { currentResource } = usePortalContext()
    const [rate, setRate] = useState()
    const [playlistVideo, setPlaylistVideo] = useState()

    const { id: enrollmentId } = getEnrollment()

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
        }
    }, [currentResource])

    return (
        <div className='classroom__video'>
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
                onOpenMenu={() => console.log('onOpenMenu')}
                onNext={() => console.log('onNext')}
                onPrevious={() => console.log('onPrevious')}
                onTwentyFivePercent={handleProgress(25)}
                onFiftyPercent={handleProgress(50)}
                onSeventyFivePercent={handleProgress(75)}
                onOneHundredPercent={handleProgress(100)}
            />
            {currentResource.quiz && (
                <ESTabs
                    dark
                    center
                    tabBarGutter={0}
                    defaultActiveKey='1'
                    renderTabBar={renderTabBar({
                        title: currentResource.video.title,
                        subtitle: `${t('global.subject')} 3, ${t(
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
                        <SANQuiz quiz={currentResource.quiz} />
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
