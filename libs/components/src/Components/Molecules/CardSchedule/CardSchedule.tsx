import React from 'react'

import { theme } from 'styled-tools'

import { useThemeContext } from '@sanar/utils/dist/Hooks'
// import { useTranslation } from 'react-i18next'
import { SANStyled } from '../../../Theme'
import { SANButton } from '../../Atoms/Button'
import { SANTypography } from '../../Atoms/Typography'
import { SANBox } from '../../Atoms/Box'
import { SANRow, SANCol } from '../Grid'

export interface ISANCardScheduleProps {
    imgUrl?: string
    title: string
    subtitle: string
    buttonTitle: string
    buttonPress: () => {}
}

const SANImageRow = SANStyled(SANRow)`
    &&& {
        border-top-left-radius: ${theme('radii.base')};
        border-top-right-radius: ${theme('radii.base')};
        text-align: center;
    }
`
const SANButtonRow = SANStyled(SANRow)`
    &&& {
        border-bottom-left-radius: ${theme('radii.base')};
        border-bottom-right-radius: ${theme('radii.base')};
        background-color: ${theme('colors.primary-2')}33;
    }
`

const SANCardBox = SANStyled(SANBox)`
    &&& {
        box-shadow: 0px 1px 2px ${theme('colors.grey.2')};
    }
`

const SANCardSchedule = ({
    imgUrl,
    title,
    subtitle,
    buttonTitle,
    buttonPress
}: ISANCardScheduleProps) => {
    const {
        assets: {
            cardSchedule: { suggested_schedule: suggested }
        }
    } = useThemeContext()

    return (
        <SANCardBox
            width={{ _: 1, sm: '488px' }}
            m={{ _: 'md', sm: '0px' }}
            bg='white.10'
            borderRadius='base'
            borderWidth='0.5px'
            borderStyle='solid'
            borderColor='grey.2'
        >
            <SANImageRow width={[1]}>
                <SANBox
                    as='img'
                    src={imgUrl ? imgUrl : suggested}
                    my={{ _: 0, sm: 'lg' }}
                />
            </SANImageRow>
            <SANButtonRow pt={{ _: 'md', sm: 'xl' }} pb='xl' width={[1]}>
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
                <SANRow>
                    <SANButton
                        onClick={buttonPress}
                        size='small'
                        uppercase
                        color='primary-4'
                        variant='outlined'
                        mx='auto'
                    >
                        <SANTypography
                            fontSize='md'
                            fontWeight='bold'
                            color='primary-4'
                        >
                            {buttonTitle}
                        </SANTypography>
                    </SANButton>
                </SANRow>
            </SANButtonRow>
        </SANCardBox>
    )
}

export default SANCardSchedule
