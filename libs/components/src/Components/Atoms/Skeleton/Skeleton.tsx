import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { SpaceProps, space } from 'styled-system'

import ESSkeleton from 'sanar-ui/dist/Components/Atoms/Skeleton'

export type ISANSkeletonProps = PropTypes.InferProps<
    typeof ESSkeleton['propTypes']
> &
    SpaceProps

const SANSkeleton: React.FC<ISANSkeletonProps> = styled(ESSkeleton)`
    ${space}
`

export default SANSkeleton
