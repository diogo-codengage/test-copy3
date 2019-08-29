import React from 'react'

import { theme, ifProp, prop } from 'styled-tools'

import { SANStyled } from '../../../Theme'
import { SANButton, ISANButtonProps } from '../../Atoms/Button'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANTypography } from '../../Atoms/Typography'
import { SANRow, SANCol } from '../Grid'

const SANClassroomHeaderStyled = SANStyled.div``

export interface ISANClassroomHeaderProps {
    title: string
    subtitle: string
    ButtonPreviousProps?: ISANButtonProps
    ButtonNextProps?: ISANButtonProps
    ButtonBookmarkProps?: ISANButtonProps
}

const SANClassroomHeader = ({
    title,
    subtitle,
    ButtonPreviousProps,
    ButtonNextProps,
    ButtonBookmarkProps
}: ISANClassroomHeaderProps) => {
    const buttonDefaultProps = {
        size: 'small',
        variant: 'outlined',
        color: 'white',
        block: true
    }

    const mergeButtonPreviousProps = {
        ...ButtonPreviousProps,
        ...buttonDefaultProps
    }
    const mergeButtonNextProps = {
        ...ButtonPreviousProps,
        ...buttonDefaultProps
    }

    const mergeButtonBookmarkProps = {
        size: 'small',
        variant: 'text',
        color: 'white',
        ...ButtonBookmarkProps,
        children: (
            <>
                {ButtonBookmarkProps.bookmarked ? (
                    <SANEvaIcon
                        name='heart'
                        key='bookmarked'
                        color='secondary'
                    />
                ) : (
                    <SANEvaIcon name='heart-outline' key='not-bookmarked' />
                )}
                {ButtonBookmarkProps.children}
            </>
        )
    }

    return (
        <SANRow type='flex' justify='space-between' align='bottom'>
            <SANCol>
                <SANButton circle variant='text'>
                    <SANEvaIcon name='menu-outline' />
                </SANButton>
                <SANTypography
                    fontSize={['lg', 'xl']}
                    fontWeight='bold'
                    color='white.10'
                >
                    {title}
                </SANTypography>
                <SANTypography fontSize='md' color='gold.0'>
                    {subtitle}
                </SANTypography>
            </SANCol>
            <SANCol>
                <SANButton {...mergeButtonBookmarkProps} />
                <SANButton {...mergeButtonPreviousProps} />
                <SANButton {...mergeButtonNextProps} />
            </SANCol>
        </SANRow>
    )
}

export default SANClassroomHeader
