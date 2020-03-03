import React, { useEffect } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import RMHomeLives from './Home'
import RMPreviousLive from './Previous'
import { useMainContext } from '../Context'
import { useAuthContext } from '../../../Hooks/auth'

const RMLives = () => {
    const { handleTrack } = useMainContext()
    const { me: { id: userId }} = useAuthContext()

    useEffect(() => {
        const livesAreaOpened = () => {
            handleTrack('Lives Area Viewed', {
                'User ID': userId
            })
        }
        livesAreaOpened()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])

    return (
        <Switch>
            <Route path='/inicio/lives/atual' component={RMHomeLives}/>
            <Route
                path='/inicio/lives/anterior/:previousId'
                component={RMPreviousLive}
            />
            <Route render={() => <Redirect to='/inicio/lives/atual'/>}/>
        </Switch>
    )
}

export default RMLives
