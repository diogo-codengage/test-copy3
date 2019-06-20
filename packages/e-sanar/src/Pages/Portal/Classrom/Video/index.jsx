import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import ESJwPlayer from 'sanar-ui/dist/Components/Molecules/JwPlayer'
import ESLessonHeader, {
    ESLessonHeaderExtra
} from 'sanar-ui/dist/Components/Molecules/LessonHeader'
import ESTabs, { ESTabPane } from 'sanar-ui/dist/Components/Atoms/Tabs'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import ESRate from 'sanar-ui/dist/Components/Atoms/Rate'

import { useApolloContext } from 'Hooks/apollo'

import { useAuthContext } from 'Hooks/auth'
import { CREATE_RATING } from 'Apollo/Classroom/mutations/rate'
import { useClassroomContext } from '../Context'

import SANClassroomVideoQuiz from './Quiz'

const renderTabBar = ({ rate, label, title, subtitle }) => (
    props,
    DefaultTabBar
) => {
    return (
        <ESLessonHeader
            leftChildren={
                <>
                    <ESTypography ellipsis level={5}>
                        {title}
                    </ESTypography>
                    <div className='subtitle'>
                        <ESTypography
                            variant='subtitle2'
                            className='subtitle__path'
                            ellipsis
                        >
                            {subtitle}
                        </ESTypography>
                        <ESTypography
                            variant='subtitle2'
                            className='subtitle__rate'
                        >
                            {label}
                        </ESTypography>
                        <ESRate {...rate} />
                    </div>
                </>
            }
            rightChildren={
                <ESLessonHeaderExtra
                    previousLesson='Anterior'
                    nextLesson='Próxima'
                />
            }
        >
            <DefaultTabBar {...props} style={{ background: 'none' }} />
        </ESLessonHeader>
    )
}

const SANClassroomVideo = () => {
    const { t } = useTranslation('esanar')
    const {
        me: { id: userId }
    } = useAuthContext(0)
    const client = useApolloContext()
    const { current } = useClassroomContext()
    const [rate, setRate] = useState()
    const [playlistVideo, setPlaylistVideo] = useState()

    const handleRate = value => {
        setRate(value)
        mutateRate({
            resourceId: current.video.id,
            resourceType: current.resource_type,
            userId,
            rating: { value, type: 'numeric' }
        })
    }

    const mutateRate = ({ resourceId, resourceType, userId, rating }) =>
        client.mutate({
            mutation: CREATE_RATING,
            variables: {
                resourceId,
                resourceType,
                userId,
                rating
            }
        })

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
                onOpenMenu={console.log('onOpenMenu')}
                onNext={console.log('onNext')}
                onPrevious={console.log('onPrevious')}
            />
            {current.quiz && (
                <ESTabs
                    dark
                    center
                    defaultActiveKey='1'
                    renderTabBar={renderTabBar({
                        title: current.video.title,
                        subtitle: `${t('global.subject')} 3, ${t(
                            'global.activity'
                        )} ${current.index + 1}`,
                        label: t('classroom.rateClass'),
                        rate: {
                            value: rate,
                            onChange: handleRate
                        }
                    })}
                >
                    <ESTabPane tab={t('classroom.questions')} key='1'>
                        <SANClassroomVideoQuiz quiz={current.quiz} />
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
