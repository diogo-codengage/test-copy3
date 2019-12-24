import React from 'react'

import { theme, switchProp } from 'styled-tools'
import styled from 'styled-components'

import { SANTypography } from '../../Atoms/Typography'
import { SANBox, ISANBoxProps } from '../../Atoms/Box'

type IType = 'viewed' | 'unseen' | 'live' | 'exams'
export interface ISANCardEventProps extends ISANBoxProps {
    title: string
    date: string
    type: IType
}

const SANCardBox = styled(SANBox)<{ type: IType }>`
    &&& {
        cursor: pointer;
        border-color: ${switchProp('type', {
            viewed: theme('colors.primary-4'),
            unseen: theme('colors.burgundy.1'),
            live: theme('colors.grey.4'),
            exams: theme('colors.blue.2')
        })};

        &:hover {
            background-color: ${switchProp('type', {
                viewed: theme('colors.primary-1'),
                unseen: theme('colors.burgundy.0'),
                live: theme('colors.grey.0'),
                exams: theme('colors.blue.0')
            })};
        }
    }
`

const SANCardEvent = ({ title, date, type, ...props }: ISANCardEventProps) => (
    <SANCardBox
        type={type}
        boxShadow={1}
        width='100%'
        bg='white.10'
        borderRadius='base'
        border='2px solid'
        py='sm'
        px={{ _: 'sm', sm: 'md' }}
        {...props}
    >
        <SANTypography
            fontSize='md'
            fontWeight='bold'
            color='grey.6'
            mb='xxs'
            ellipsis={{ rows: 1 }}
        >
            {title}
        </SANTypography>
        <SANTypography fontSize='sm' color='grey.4' lineHeight='1.35'>
            {date}
        </SANTypography>
    </SANCardBox>
)

export default SANCardEvent
