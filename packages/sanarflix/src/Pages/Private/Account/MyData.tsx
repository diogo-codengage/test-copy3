import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { SANProfile } from '@sanar/components'

const FLXMyData = ({ history }: RouteComponentProps) => {
    return (
        <SANProfile
            onBack={() => history.goBack()}
            states={[]}
            user={{}}
            onSubmit={console.log}
        />
    )
}

export default withRouter(FLXMyData)
