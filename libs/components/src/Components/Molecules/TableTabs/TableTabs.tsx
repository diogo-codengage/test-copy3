import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'
import { theme, ifProp, prop } from 'styled-tools'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

import { SANTabs, SANTabPane } from '../Tabs'
import { SANTypography } from '../../Atoms/Typography'
import { SANProgress } from '../../Atoms/Progress'
import { SANSkeleton } from '../../Atoms/Skeleton'
import { SANBox } from '../../Atoms/Box'

interface IPercentBarsProps {
    percent: number
    barColor: string
}

interface IContentProps {
    title: string
    percentBars: IPercentBarsProps[]
}

interface ITabsProps {
    key: string
    title: string
    rows: IContentProps[]
}

export interface ISANTableTabsProps {
    defaultTabkey?: string
    primaryButtonTitle?: string
    onPrimaryButtonClick?: () => void
    secundaryButtonTitle?: string
    onSecundaryButtonClick?: () => void
    tabs: ITabsProps[]
}

const ContentProgress = ({ title, percentBars }) => (
    <SANBox>
        <SANTypography>{title}</SANTypography>
        <SANBox>
            {percentBars.map(({ percent, barColor }) => (
                <SANProgress
                    showInfo
                    color={barColor}
                    percent={percent}
                    // InfoProps={{ color: 'warning' }}
                    height={4}
                />
            ))}
        </SANBox>
    </SANBox>
)

const SANTableTabs: React.FC<ISANTableTabsProps> = ({
    defaultTabkey,
    primaryButtonTitle,
    onPrimaryButtonClick,
    secundaryButtonTitle,
    onSecundaryButtonClick,
    tabs
}) => {
    const [activeTab, setActiveTab] = useState(defaultTabkey || '1')
    const activeTabColor = '#393F4D'
    const inativeTabColor = '#858E99'

    return (
        <SANBox
            bg='white.10'
            boxShadow={1}
            borderRadius='base'
            border='1px solid'
            borderColor='grey.2'
        >
            <SANTabs
                defaultActiveKey={activeTab}
                fullBar
                center
                tabBarGutter={0}
                type='card'
                tabPosition='top'
                onTabClick={setActiveTab}
            >
                {tabs.map(({ key, title, rows }, index) => (
                    <SANTabPane
                        bg='#ff0000'
                        tab={
                            <SANTypography
                                fontWeight='bold'
                                fontSize='md'
                                transform='uppercase'
                                color={
                                    key === activeTab
                                        ? activeTabColor
                                        : inativeTabColor
                                }
                            >
                                {title}
                            </SANTypography>
                        }
                        key={key}
                    >
                        <SANBox
                            pt={{ _: 'xxs', sm: 'xs' }}
                            px={{ _: 'md', sm: 'xl' }}
                        >
                            {rows.map(({ title, percentBars }) => (
                                <ContentProgress
                                    title={title}
                                    percentBars={percentBars}
                                />
                            ))}
                        </SANBox>
                    </SANTabPane>
                ))}
            </SANTabs>
        </SANBox>
    )
}

export default SANTableTabs
