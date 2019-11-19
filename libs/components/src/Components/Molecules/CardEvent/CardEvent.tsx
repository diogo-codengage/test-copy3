import React from 'react'

import { useThemeContext } from '@sanar/utils/dist/Hooks'
import { theme, switchProp } from 'styled-tools'
import { css } from 'styled-components'
import { SANStyled } from '../../../Theme'
import { SANTypography } from '../../Atoms/Typography'
import { SANButton } from '../../Atoms/Button'
import { SANBox } from '../../Atoms/Box'
import { SANEvaIcon } from 'Components/Atoms/EvaIcon'

export interface ISANCardEventProps {
    title: string
    date: string
    type: 'lesson' | 'live' | 'courseActivity'
    onClick: () => void
}
const SANCardBox = SANStyled(SANBox)<{ type: string }>`
  &&& {
    ${switchProp('type', {
        lesson: css`
            border-color: ${theme('colors.blue.0')};
        `,
        live: css`
            border-color: ${theme('colors.gold.0')};
        `,
        courseActivity: css`
            border-color: ${theme('colors.burgundy.0')};
        `
    })}
  }
`

const SANCardEvent = ({ title, date, type, onClick }: ISANCardEventProps) => {
    const actionIcon = type === 'lesson' ? 'edit-outline' : 'trash-outline'

    return (
        <SANCardBox
            type={type}
            boxShadow={1}
            width='100%'
            height='auto'
            bg='white.10'
            borderRadius='base'
            border='2px solid'
            py='sm'
            px={{ _: 'sm', sm: 'md' }}
            textAlign='left'
        >
            <SANTypography
                fontSize='md'
                fontWeight='bold'
                color='grey.6'
                mb='xs'
                ellipsis={{ rows: 1 }}
            >
                {title}
            </SANTypography>
            <SANBox
                width='100%'
                display='inline-flex'
                justifyContent='space-between'
            >
                <SANTypography fontSize='sm' color='grey.4' lineHeight='1.35'>
                    {date}
                </SANTypography>
                <SANButton
                    onClick={onClick}
                    circle
                    variant='text'
                    size='xsmall'
                >
                    <SANEvaIcon color='grey.4' name={actionIcon} />
                </SANButton>
            </SANBox>
        </SANCardBox>
    )
}

export default SANCardEvent
