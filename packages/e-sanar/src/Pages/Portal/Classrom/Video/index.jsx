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
import { useClassroomContext } from '../Context'

import SANQuiz from 'Components/Quiz'
import renderTabBar from './renderTabBar'

const SANClassroomVideo = () => {
    const { t } = useTranslation('esanar')
    const playerRef = useRef()
    const {
        me: { id: userId },
        getEnrollment
    } = useAuthContext()
    const client = useApolloContext()
    const { current } = useClassroomContext()
    const [rate, setRate] = useState()
    const [playlistVideo, setPlaylistVideo] = useState()

    const { id: enrollmentId } = getEnrollment()

    const handleRate = value => {
        setRate(value)
        client.mutate({
            mutation: CREATE_RATING,
            variables: {
                resourceId: current.video.id,
                resourceType: current.resource_type,
                userId,
                rating: { value, type: 'numeric' }
            }
        })
    }

    const handleProgress = percentage => () => {
        const timeInSeconds = playerRef && playerRef.current.position()
        client.mutate({
            mutation: CREATE_PROGRESS,
            variables: {
                percentage,
                timeInSeconds: parseInt(timeInSeconds),
                enrollmentId,
                resourceId: current.video.id,
                resourceType: current.resource_type
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
                        resourceId: current.video.id,
                        userId
                    }
                })

                setRate(rating && rating.rating.value)
            } catch (e) {
                message.error(t('classroom.failLoadRating'))
            }
        }
        fetchData()
    }, [client, current, t, userId])

    useEffect(() => {
        if (current) {
            const playler = current.video.providers.data.find(
                provider => provider.code === 'jwplayer'
            )
            setPlaylistVideo([
                {
                    ...(playler && { file: playler.files.smil.url }),
                    image: current.video.thumbnails.medium.url
                }
            ])
        }
    }, [current])

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
                title={current.video.title}
                subtitle={`${t('global.subject')} 3, ${t(
                    'global.activity'
                )} ${current.index + 1}`}
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
            {current.quiz && (
                <ESTabs
                    dark
                    center
                    tabBarGutter={0}
                    defaultActiveKey='1'
                    renderTabBar={renderTabBar({
                        title: current.video.title,
                        subtitle: `${t('global.subject')} 3, ${t(
                            'global.activity'
                        )} ${current.index + 1}`,
                        rate: {
                            value: rate,
                            onChange: handleRate
                        }
                    })}
                >
                    <ESTabPane tab={t('classroom.questions')} key='1'>
                        <SANQuiz quiz={current.quiz} />
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
