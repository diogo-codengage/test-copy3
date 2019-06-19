import React from 'react'

import { Switch, Route } from 'react-router-dom'

import ESSpin from 'sanar-ui/dist/Components/Atoms/Spin'

import SANClassromVideo from './Video'
import { useClassromContext, withClassromProvider } from './Context'

const SANClassrom = ({ match: { url } }) => {
    const {
        state: { loading, error }
    } = useClassromContext()

    if (loading) return <ESSpin />

    if (error) return `Error: ${error}`

    return (
        <div className='classrom'>
            <Switch>
                <Route path={`${url}/video/:id`} component={SANClassromVideo} />
                <Route
                    path={`${url}/documento/:id`}
                    render={() => <div>SANClassromDocument</div>}
                    // component={SANClassromDocument}
                />
                <Route
                    path={`${url}/simulado/:id`}
                    render={() => <div>SANClassromDocument</div>}
                    // component={SANClassromMock}
                />
            </Switch>
        </div>
    )
}

export default withClassromProvider(SANClassrom)
