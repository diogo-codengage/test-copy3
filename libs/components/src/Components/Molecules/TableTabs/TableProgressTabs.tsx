import React, { useState } from 'react'

import styled, { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'

import { SANTabs, SANTabPane } from '../Tabs'
import { SANTypography } from '../../Atoms/Typography'
import { SANProgress } from '../../Atoms/Progress'
import { SANButton } from '../../Atoms/Button'
import { SANBox } from '../../Atoms/Box'

interface IPercentBarsProps {
    percent: number
    barColor?: string
}

interface IContentProps {
    title: string
    percentBars?: IPercentBarsProps[]
    notPercent?: string
}

interface ITabsProps {
    key: string
    title: string
    rows: IContentProps[]
}

export interface ISANTableProgressTabsProps {
    defaultTabkey?: string
    primaryButtonTitle?: string
    onPrimaryButtonClick?: () => void
    secundaryButtonTitle?: string
    secundaryButtonColor?: string
    onSecundaryButtonClick?: () => void
    tabs: ITabsProps[]
}

const SANContainerProgress = styled(SANBox)`
    && {
        float: right;
    }
`

const SANBoxProgress = styled(SANBox)`
    &&&& {
        border-color: ${theme('colors.grey.2')};
    }
`

const SANBoxPrimaryButton = styled(SANBox)<{ unique?: boolean }>`
    &&& {
        flex: 1;
        ${ifProp(
            'unique',
            css`
                border-bottom-right-radius: ${theme('radii.base')};
                border-bottom-left-radius: ${theme('radii.base')};
            `,
            css`
                border-right: 0.5px solid ${theme('colors.grey.2')};
                border-bottom-left-radius: ${theme('radii.base')};
            `
        )}
    }
`

const SANBoxSecundaryButton = styled(SANBox)`
    &&& {
        flex: 1;
        border-left: 0.5px solid ${theme('colors.grey.2')};
        border-bottom-right-radius: ${theme('radii.base')};
    }
`

const ContentProgress = ({ last, title, percentBars, notPercent }) => (
    <SANBox
        px={{ _: 'md', sm: 'xl' }}
        flexDirection='row'
        displayFlex
        minHeight='64px'
        py='md'
        bg={!!notPercent ? 'grey-solid.1' : 'transparent'}
        borderBottom={last ? 'none' : '1px solid'}
        borderColor='grey.2'
    >
        <SANTypography
            my='auto'
            color={!!percentBars ? 'grey.6' : 'grey-solid.4'}
            width='55%'
            display='flex'
            float='left'
            fontSize='md'
            fontWeight='bold'
        >
            {title}
        </SANTypography>
        <SANContainerProgress width='45%' display='flex'>
            {!!percentBars ? (
                percentBars.map(({ percent, barColor }, index) => (
                    <SANBoxProgress
                        height={{ _: '100%' }}
                        pt='10px'
                        flex='1'
                        pl='md'
                        pr={index === percentBars.length - 1 ? 0 : 'md'}
                        borderLeft='1px solid'
                    >
                        <SANProgress
                            backdrop='grey.1'
                            showInfo
                            color={
                                barColor
                                    ? barColor
                                    : index === 0
                                    ? 'blue.1'
                                    : 'grey-solid.5'
                            }
                            percent={percent}
                            InfoProps={{ color: 'grey.6' }}
                            height={6}
                        />
                    </SANBoxProgress>
                ))
            ) : (
                <SANTypography
                    my='auto'
                    color='grey.5'
                    textAlign='center'
                    fontSize='md'
                    fontWeight='bold'
                >
                    {notPercent}
                </SANTypography>
            )}
        </SANContainerProgress>
    </SANBox>
)

const ButtonsContainer = ({
    primaryButtonTitle,
    onPrimaryButtonClick,
    secundaryButtonTitle,
    secundaryButtonColor,
    onSecundaryButtonClick
}) => (
    <SANBox
        displayFlex
        width='100%'
        borderTop='1px solid'
        borderColor='grey.2'
        mb='-0.5px'
    >
        <SANBoxPrimaryButton unique={!onSecundaryButtonClick}>
            <SANButton
                size='medium'
                uppercase
                variant='text'
                mx='auto'
                block
                bold
                onClick={onPrimaryButtonClick}
            >
                <SANTypography fontSize='sm' color='primary-4'>
                    {primaryButtonTitle}
                </SANTypography>
            </SANButton>
        </SANBoxPrimaryButton>
        {!!onSecundaryButtonClick && (
            <SANBoxSecundaryButton>
                <SANButton
                    size='medium'
                    uppercase
                    variant='text'
                    mx='auto'
                    block
                    bold
                    onClick={onSecundaryButtonClick}
                >
                    <SANTypography fontSize='sm' color={secundaryButtonColor}>
                        {secundaryButtonTitle}
                    </SANTypography>
                </SANButton>
            </SANBoxSecundaryButton>
        )}
    </SANBox>
)

const SANTableProgressTabs: React.FC<ISANTableProgressTabsProps> = ({
    defaultTabkey,
    primaryButtonTitle,
    onPrimaryButtonClick,
    secundaryButtonTitle,
    secundaryButtonColor,
    onSecundaryButtonClick,
    tabs
}) => {
    const [activeTab, setActiveTab] = useState(defaultTabkey || tabs[0].key)
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
                {tabs.map(({ key, title, rows }) => (
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
                        <SANBox pt={{ _: 'xxs', sm: 'xs' }}>
                            {rows.map(
                                ({ title, percentBars, notPercent }, index) => (
                                    <ContentProgress
                                        key={index}
                                        last={index === rows.length - 1}
                                        title={title}
                                        percentBars={percentBars || null}
                                        notPercent={notPercent || null}
                                    />
                                )
                            )}
                        </SANBox>
                        {!!onPrimaryButtonClick && (
                            <ButtonsContainer
                                primaryButtonTitle={primaryButtonTitle}
                                onPrimaryButtonClick={onPrimaryButtonClick}
                                secundaryButtonTitle={secundaryButtonTitle}
                                secundaryButtonColor={secundaryButtonColor}
                                onSecundaryButtonClick={onSecundaryButtonClick}
                            />
                        )}
                    </SANTabPane>
                ))}
            </SANTabs>
        </SANBox>
    )
}

export default SANTableProgressTabs
