import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router'

import { SANHelpCenter } from '@sanar/components'
import { useLayoutContext } from 'Pages/Private/Context'

const { handleTrack } = useLayoutContext()

const RMHelpCenter = ({ history }: RouteComponentProps) => (
    <SANHelpCenter
        onBack={() => {
            history.goBack()
            handleTrack('Voltar button clicked')
        }}
    />
)

export default withRouter(RMHelpCenter)
