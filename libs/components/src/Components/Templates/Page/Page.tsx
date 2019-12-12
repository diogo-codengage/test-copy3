import React, { useMemo, memo } from 'react'

import { SANBox, ISANBoxProps } from '../../Atoms/Box'
import { SANHeader, ISANHeaderProps } from '../../Molecules/Header'
import { SANLayoutContainer, ISANContainerProps } from '../../Organisms/Layout'

export interface ISANPageProps {
    HeaderProps?: ISANHeaderProps
    ContainerProps?: ISANContainerProps
    BoxProps?: ISANBoxProps
    hasContainer?: boolean
    children: React.ReactNode
}

const SANPage = memo<ISANPageProps>(
    ({ children, hasContainer, HeaderProps, ContainerProps, BoxProps }) => {
        const content = useMemo(
            () =>
                hasContainer ? (
                    <SANLayoutContainer {...ContainerProps}>
                        {children}
                    </SANLayoutContainer>
                ) : (
                    children
                ),
            [hasContainer, children, ContainerProps]
        )

        return (
            <SANBox display='flex' flexDirection='column' flex='1'>
                {!!HeaderProps && <SANHeader {...HeaderProps} />}
                <SANBox flex={1} pb={9} {...BoxProps}>
                    {content}
                </SANBox>
            </SANBox>
        )
    }
)

export default SANPage
