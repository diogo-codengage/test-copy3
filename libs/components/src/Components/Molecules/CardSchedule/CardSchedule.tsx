import React from 'react'

import { theme } from 'styled-tools'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

import { SANStyled } from '../../../Theme'
import { SANButton, ISANButtonProps } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'

export interface ISANCardScheduleProps {
    image?: string
    title: string
    subtitle: string
    ButtonProps: ISANButtonProps
}

const SANButtonRow = SANStyled(SANBox)`
    &&& {
        background-color: ${theme('colors.primary-2')}33;
        border-top: 1px solid ${theme('colors.grey.2')};
    }
`

const SANCardSchedule = ({
    image,
    title,
    subtitle,
    ButtonProps
}: ISANCardScheduleProps) => {
    const {
        assets: {
            cardSchedule: { suggested_schedule: suggested }
        }
    } = useThemeContext()

    return (
        <SANBox
            boxShadow='1'
            bg='white.10'
            borderRadius='base'
            border='1px solid'
            borderColor='grey.2'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
        >
            <SANBox
                as='img'
                src={image ? image : suggested}
                my={{ _: 0, sm: 'lg' }}
            />
            <SANButtonRow
                pt={{ _: 'md', sm: 'xl' }}
                pb='xl'
                px='xl'
                display='flex'
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                width={1}
            >
                <SANTypography
                    textAlign='center'
                    fontSize='xl'
                    fontWeight='bold'
                    color='grey.8'
                    mb='xxs'
                >
                    {title}
                </SANTypography>
                <SANTypography
                    textAlign='center'
                    fontSize='sm'
                    color='grey.7'
                    mb={{ _: 'xxl', sm: 'xl' }}
                >
                    {subtitle}
                </SANTypography>
                <SANBox width='176px'>
                    <SANButton
                        size='small'
                        uppercase
                        variant='outlined'
                        color='primary'
                        mx='auto'
                        block
                        bold
                        {...ButtonProps}
                    />
                </SANBox>
            </SANButtonRow>
        </SANBox>
    )
}

export default SANCardSchedule
