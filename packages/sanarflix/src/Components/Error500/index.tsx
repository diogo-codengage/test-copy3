import React from 'react'

import { SANError500 } from '@sanar/components'

const FLXError500 = () => (
    <SANError500 onClick={() => window.location.reload()} />
)

export default FLXError500
