import React from 'react'

import { Redirect } from 'react-router-dom'

import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

import { withClassroomProvider } from './Context'
import { usePortalContext } from '../Context'

import SANClassroomVideo from './Video'
import SANClassroomDocument from './Document'
import SANClassroomMock from './Mock'
import ESDefaultError from '../Errors/Default'

const renderResourceContent = resource => {
    switch (resource.resource_type) {
        case 'Video':
            return <SANClassroomVideo />
        case 'Document':
            return <SANClassroomDocument />
        case 'Quiz':
            return <SANClassroomMock />
        default:
            return <Redirect to='/aluno/curso' />
    }
}

const SANClassroomPage = () => {
    const {
        currentResource,
        state: { error, loading }
    } = usePortalContext()

    if (loading || !currentResource)
        return (
            <div className='classroom'>
                <ESSpin className='classroom__loader' dark />
            </div>
        )

    if (error) return <ESDefaultError />

    return (
        <div className='classroom'>
            {renderResourceContent(currentResource)}
        </div>
    )
}

export default withClassroomProvider(SANClassroomPage)
