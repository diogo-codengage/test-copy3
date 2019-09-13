import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ESSkeleton from 'sanar-ui/dist/Components/Atoms/Skeleton'

export type ISANSkeletonProps = PropTypes.InferProps<
    typeof ESSkeleton['propTypes']
>

const SANSkeleton: React.FC<ISANSkeletonProps> = styled(ESSkeleton)``

export default SANSkeleton
