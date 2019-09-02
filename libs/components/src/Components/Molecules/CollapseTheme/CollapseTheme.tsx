import React from 'react'
import { css } from 'styled-components'

import { theme, ifProp } from 'styled-tools'

import { SANCollapse, SANCollapsePanel } from '../../Atoms/Collapse'
import { SANTypography } from '../../Atoms/Typography'
import { SANEvaIcon } from '../../Atoms/EvaIcon'
import { SANStyled } from '../../../Theme/createTheme'

const IconWrapperStyled = SANStyled.div`
    position: absolute;
    right: ${theme('space.xl')};
`
const TextWrapperStyled = SANStyled.div`
    width: calc(100% - 67px);
`
const RowLessonStyled = SANStyled.div`
    && {
        cursor: pointer;
        padding: ${theme('space.md')} ${theme('space.xl')};
        display: flex;
        align-items: center;
        position: relative;

        &:not(:first-child) {
            border-top: 1px solid ${theme('colors.grey.2')};
        }

        & i {
            right: ${theme('space.xl')} !important;
        }
    }
`
const WrapperIconStyled = SANStyled.div`
    margin-right: ${theme('space.lg')};
`
const SANCollapseStyled = SANStyled(SANCollapse)`
    background-color: transparent;
`
const SANCollapsePanelStyled = SANStyled(SANCollapsePanel)`
    && {
        margin-bottom: ${theme('space.md')};
        border: 1px solid ${theme('colors.grey.2')};
        border-radius: ${theme('radii.base')} !important;
        box-shadow: 0 1px 2px ${theme('colors.grey.2')};

        ${ifProp(
            'isActive',
            css`
                & > div {
                    background-color: ${theme('colors.grey.0')};
                    border-bottom: 1px solid ${theme('colors.grey.2')};
                }
            `
        )}

        & i.ant-collapse-arrow {
            right: ${theme('space.xl')} !important;
        }

        & > div:first-child {
            padding: ${theme('space.xl')};
        }

        & > div:last-child:not(:first-child) > div:first-child {
            padding: 0;
        }
    }
`

export interface ISANCollapseThemeDataProps {
    title: string | React.ReactNode
    index?: number
    id?: string
    customKey?: string | number
    lessons?: ISANCollapseThemeLessonProps[]
}

export interface ISANCollapseThemeLessonProps {
    id?: string
    icon?: string | React.ReactNode
    title: string | React.ReactNode
    subtitle?: string | React.ReactNode
    checked?: boolean
    onClick?: (e: {
        themeId: string
        contentId: string
        resourceType: string
    }) => void
    themeId?: string
    resourceType?: 'Video' | 'Document' | 'Question'
}

export interface ISANCollapseThemeProps {
    data: ISANCollapseThemeDataProps[]
}

const types = {
    Video: 'video',
    Question: 'questao',
    Document: 'documento'
}

export const renderClass = ({
    id,
    icon,
    title,
    subtitle,
    checked,
    themeId,
    onClick,
    resourceType
}: ISANCollapseThemeLessonProps) => (
    <RowLessonStyled
        key={id}
        onClick={() =>
            onClick({
                contentId: id,
                themeId,
                resourceType: types[resourceType]
            })
        }
    >
        {!!icon && <WrapperIconStyled>{icon}</WrapperIconStyled>}
        <TextWrapperStyled>
            <SANTypography
                fontSize={['sm', 'md']}
                variant='subtitle2'
                strong
                ellipsis
                color='grey.6'
            >
                {title}
            </SANTypography>
            {!!subtitle && (
                <SANTypography
                    fontSize={['sm', 'md']}
                    variant='subtitle2'
                    ellipsis
                    color='grey.5'
                >
                    {subtitle}
                </SANTypography>
            )}
        </TextWrapperStyled>
        {!!checked && (
            <IconWrapperStyled>
                <SANEvaIcon name='checkmark-outline' color='grey.4' />
            </IconWrapperStyled>
        )}
    </RowLessonStyled>
)

export const renderTheme = (
    { title, lessons, id }: ISANCollapseThemeDataProps,
    index: number
) => {
    const header = typeof index === 'number' ? `${index + 1}. ${title}` : title

    return (
        <SANCollapsePanelStyled
            key={id}
            customKey={id}
            header={
                <SANTypography
                    fontSize={['md', 'lg']}
                    mr='xl'
                    strong
                    ellipsis
                    color='grey.7'
                >
                    {header}
                </SANTypography>
            }
        >
            {!!lessons && !!lessons.length && lessons.map(renderClass)}
        </SANCollapsePanelStyled>
    )
}

export const SANCollapseThemePanel: React.FC<ISANCollapseThemeDataProps> = ({
    title,
    index,
    lessons,
    children,
    ...props
}) => {
    const header = typeof index === 'number' ? `${index + 1}. ${title}` : title

    return (
        <SANCollapsePanelStyled
            {...props}
            header={
                <SANTypography mr='xl' level={6} ellipsis color='grey.7'>
                    {header}
                </SANTypography>
            }
        >
            {!!lessons && !!lessons.length && lessons.map(renderClass)}
            {children}
        </SANCollapsePanelStyled>
    )
}

export const SANCollapseTheme: React.FC = ({ children }) => (
    <SANCollapseStyled expandIconPosition='right' accordion bordered={false}>
        {children}
    </SANCollapseStyled>
)

export const SANCollapseThemeControlled: React.FC<ISANCollapseThemeProps> = ({
    data
}) => (
    <SANCollapseStyled expandIconPosition='right' accordion bordered={false}>
        {data.map(renderTheme)}
    </SANCollapseStyled>
)
