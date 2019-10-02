import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { SANError404 } from '@sanar/components'

import FLXSearch from '../Search'

const FLXError404 = ({ history }: RouteComponentProps) => {
    return (
        <SANError404 onClick={() => history.push('/portal/inicio')}>
            <FLXSearch />
        </SANError404>
    )
}

export default withRouter(FLXError404)
