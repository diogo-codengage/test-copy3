import React from 'react'

import { withRouter, RouteComponentProps } from 'react-router'

import { SANHelpCenter } from '@sanar/components'

const RMHelpCenter = ({ history }: RouteComponentProps) => (
    <SANHelpCenter onBack={() => history.goBack()} />
)

export default withRouter(RMHelpCenter)
