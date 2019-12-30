import React from 'react'

import styled from 'styled-components'
import { prop } from 'styled-tools'

import { SANTypography, ISANTypographyProps } from '../Typography'
import { SANBox } from '../Box'

export interface ISANProgressProps {
    percent: number
    showInfo?: boolean
    InfoProps?: ISANTypographyProps
    color?: any
    backdrop?: any
    height?: number
}

interface IHeight {
    height: number
}

const borderRadius = ({ height }) => `border-radius: ${height / 2}px`

const Wrapper = styled.div<IHeight>`
    position: relative;
    height: ${prop('height')}px;
    width: 100%;
    overflow: hidden;
    ${borderRadius}
`

const Progress = styled(SANBox)<IHeight>`
    height: ${prop('height')}px;
    z-index: 1;
    position: absolute;
`

const Background = styled(SANBox)<IHeight>`
    ${borderRadius}
    height: ${prop('height')}px;
    width: 100%;
    position: absolute;
`

const SANProgress = ({
    percent,
    showInfo,
    InfoProps,
    color,
    backdrop,
    height = 6
}: ISANProgressProps) => (
    <SANBox display='flex' alignItems='center' width='100%'>
        <Wrapper height={height}>
            <Progress
                style={{ width: `${percent}%` }}
                bg={color || 'primary'}
                borderRadius='base'
                height={height}
            />
            <Background bg={backdrop || 'white.3'} height={height} />
        </Wrapper>
        {showInfo && (
            <SANTypography
                fontWeight='bold'
                fontSize='xs'
                ml='sm'
                color='white.10'
                {...InfoProps}
            >
                {percent}%
            </SANTypography>
        )}
    </SANBox>
)

export default SANProgress
