import React, { memo } from 'react'

import { withRouter, RouteComponentProps } from 'react-router'

import { SANHelpCenter } from '@sanar/components'
import { useMainContext } from 'Pages/Private/Context'

const RMHelpCenter = memo<RouteComponentProps>(({ history }) => {
    const { handleTrack } = useMainContext()

    return (
        <SANHelpCenter
            onBack={() => {
                handleTrack('Voltar button clicked', {
                    'Source URL': history.location.pathname
                })
                history.goBack()
            }}
        />
    )
})

export default withRouter(RMHelpCenter)
