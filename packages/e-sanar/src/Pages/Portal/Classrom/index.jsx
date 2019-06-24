import React from 'react'

import { Switch, Route } from 'react-router-dom'

import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

import SANClassroomVideo from './Video'
import SANClassroomMock from './Mock'
import { useClassroomContext, withClassroomProvider } from './Context'
import SANClassRoomDocument from './Video/Document';

const SANClassroomPage = ({ match: { url } }) => {
    const {
        state: { loading, error }
    } = useClassroomContext()

    if (loading)
        return (
            <div className='classroom'>
                <ESSpin className='classroom__loader' />
            </div>
        )

    if (error) return <div className='classroom'>{`Error: ${error}`}</div>

    return (
        <div className='classroom'>
            <Switch>
                <Route
                    path={`${url}/video/:id`}
                    component={SANClassroomVideo}
                />
                <Route
                    path={`${url}/documento/:id`}
                    component={SANClassRoomDocument}
                />
                <Route
                    path={`${url}/simulado/:id`}
                    component={SANClassroomMock}
                />
            </Switch>
        </div>
    )
}

export default withClassroomProvider(SANClassroomPage)
