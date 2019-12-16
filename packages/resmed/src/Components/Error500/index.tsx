import React from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { SANError500 } from '@sanar/components'

const RMError500 = ({ history }: RouteComponentProps) => {
    const reload = () => {
        history.push('/inicio/curso')
        window.location.reload()
    }

    return <SANError500 onClick={reload} />
}

export default withRouter(RMError500)
