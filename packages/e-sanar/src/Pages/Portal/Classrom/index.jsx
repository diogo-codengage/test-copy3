import React from 'react'
import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'
import SANClassroomVideo from './Video'
import { useClassroomContext, withClassroomProvider } from './Context'
import { usePortalContext } from '../Context'

const renderResourceContent = resource => {
    switch (resource.resource_type) {
        case 'Video':
            return <SANClassroomVideo />
        default:
            return <h1>Mock</h1>
    }
}

const SANClassroomPage = ({ match: { params } }) => {
    const {
        state: { error }
    } = useClassroomContext()

    const { currentResource, resourcesLoading } = usePortalContext()

    if (resourcesLoading || !currentResource)
        return (
            <div className='classroom'>
                <ESSpin className='classroom__loader' />
            </div>
        )

    if (error) return <div className='classroom'>{`Error: ${error}`}</div>

    // moduleId type resourceId
    return (
        <div className='classroom'>
            {renderResourceContent(currentResource)}
        </div>
    )
}

export default withClassroomProvider(SANClassroomPage)
