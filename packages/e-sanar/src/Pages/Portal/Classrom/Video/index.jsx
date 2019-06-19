import React, { useState, useEffect } from 'react'

import ESJwPlayer from 'sanar-ui/dist/Components/Molecules/JwPlayer'

import { useApolloContext } from 'Hooks/apollo'

import { useAuthContext } from 'Hooks/auth'
import { CREATE_RATING } from 'Apollo/Classrom/mutations/rate'
import { useClassromContext } from '../Context'

const SANClassromVideo = () => {
    const {
        me: { id: userId }
    } = useAuthContext(0)
    const client = useApolloContext()
    const { current } = useClassromContext()
    const [rate, setRate] = useState()
    const [playlistVideo, setPlaylistVideo] = useState()

    const handleRate = value => {
        setRate(value)
        mutateRate({
            resourceId: current.video.id,
            resourceType: current.resource_type,
            userId,
            rating: { scale: 5, value, type: 'numeric' }
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
        <div className='classrom__video'>
            <ESJwPlayer
                playerId='playerId'
                playlist={playlistVideo}
                playerScript='/jwplayer/jwplayer.js'
                licenseKey={process.env.REACT_APP_JWPLAYER}
                isMuted={false}
                title={current.video.title}
                subtitle={`Disciplina 3, atividade ${current.index}`}
                // subtitle="Disciplina 3, atividade 5"
                rate={{
                    value: rate,
                    onChange: handleRate
                }}
                onOpenMenu={console.log('onOpenMenu')}
                onNext={console.log('onNext')}
                onPrevious={console.log('onPrevious')}
            />
        </div>
    )
}

export default SANClassromVideo
