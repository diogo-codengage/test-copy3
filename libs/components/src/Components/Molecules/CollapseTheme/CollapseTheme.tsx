import React from 'react'
import styled, { css } from 'styled-components'

import { theme, ifProp, prop } from 'styled-tools'

import { SANCollapse, SANCollapsePanel } from '../../Atoms/Collapse'
import { SANTypography } from '../../Atoms/Typography'
import { SANEvaIcon } from '../../Atoms/EvaIcon'

const IconCheckedStyled = styled(SANEvaIcon)``
const RowLessonStyled = styled.div`
    padding: ${theme('space.md')} ${theme('space.xl')};
    display: flex;
    align-items: center;

    &:not(:first-child) {
        border-top: 1px solid ${theme('colors.grey.2')};
    }
`
const WrapperIconStyled = styled.div`
    margin-right: ${theme('space.lg')};
`
const SANCollapseStyled = styled(SANCollapse)`
    background-color: transparent;
`
const SANCollapsePanelStyled = styled(SANCollapsePanel)`
    && {
        margin-bottom: ${theme('space.md')};
        border: 1px solid ${theme('colors.grey.2')};
        border-radius: ${theme('radii.base')};
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

        & > div:first-child {
            padding: ${theme('space.xl')};
        }

        & > div:last-child:not(:first-child) > div:first-child {
            padding: 0;
        }
    }
`

interface ICollapseThemeLessons {
    icon?: string | React.ReactNode
    title: string | React.ReactNode
    subtitle?: string | React.ReactNode
    checked?: boolean
}

interface ICollapseThemeData {
    title: string | React.ReactNode
    lessons?: ICollapseThemeLessons[]
}

export interface ICollapseThemeProps {
    data: ICollapseThemeData[]
}

const renderTheme = (theme: ICollapseThemeData, index: number) => (
    <SANCollapsePanelStyled
        header={
            <SANTypography mr='sm' level={6} ellipsis>{`${index + 1}. ${
                theme.title
            }`}</SANTypography>
        }
    >
        {!!theme.lessons &&
            !!theme.lessons.length &&
            theme.lessons.map(renderClass)}
    </SANCollapsePanelStyled>
)

const renderClass = ({
    icon,
    title,
    subtitle,
    checked
}: ICollapseThemeLessons) => (
    <RowLessonStyled>
        {!!icon && <WrapperIconStyled>{icon}</WrapperIconStyled>}
        <div>
            <SANTypography variant='subtitle2' strong ellipsis>
                {title}
            </SANTypography>
            {!!subtitle && (
                <SANTypography variant='subtitle2' ellipsis>
                    {subtitle}
                </SANTypography>
            )}
        </div>
        {!!checked && <IconCheckedStyled name='checkmark-outline' />}
    </RowLessonStyled>
)

const SANBanner: React.FC<ICollapseThemeProps> = ({ data }) => {
    return (
        <SANCollapseStyled
            expandIconPosition='right'
            accordion
            bordered={false}
        >
            {data.map(renderTheme)}
        </SANCollapseStyled>
    )
}

export default SANBanner
