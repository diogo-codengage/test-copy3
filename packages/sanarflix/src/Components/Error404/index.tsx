import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SANError404 } from '@sanar/components'

const FLXError404 = ({ history }: RouteComponentProps) => {
    return <SANError404 onClick={() => history.push('/portal/inicio')} />
}

export default withRouter(FLXError404)
