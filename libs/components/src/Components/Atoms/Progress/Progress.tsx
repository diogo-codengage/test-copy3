import React from 'react'

import styled from 'styled-components'

import { SANTypography, ISANTypographyProps } from '../Typography'
import { SANBox } from '../Box'

export interface ISANProgressProps {
    percent: number
    showInfo?: boolean
    InfoProps?: ISANTypographyProps
    color?: any
    backdrop?: any
}

const Wrapper = styled.div`
    position: relative;
    height: 6px;
    width: 100%;
    overflow: hidden;
    border-radius: 3px;
`

const Progress = styled(SANBox)`
    height: 6px;
    z-index: 1;
    position: absolute;
`

const Background = styled(SANBox)`
    border-radius: 3px;
    height: 6px;
    width: 100%;
    position: absolute;
`

const SANProgress = ({
    percent,
    showInfo,
    InfoProps,
    color,
    backdrop
}: ISANProgressProps) => (
    <SANBox display='flex' alignItems='center' width='100%'>
        <Wrapper>
            <Progress
                style={{ width: `${percent}%` }}
                bg={color || 'primary'}
                borderRadius='base'
            />
            <Background bg={backdrop || 'white.3'} />
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
