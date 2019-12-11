import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router'

import { SANHelpCenter } from '@sanar/components'
import { useMainContext } from 'Pages/Private/Context'

const RMHelpCenter = ({ history }: RouteComponentProps) => {
    const { handleTrack } = useMainContext()

    return (
        <SANHelpCenter
            onBack={() => {
                history.goBack()
                handleTrack('Voltar button clicked')
            }}
        />
    )
}

export default withRouter(RMHelpCenter)
