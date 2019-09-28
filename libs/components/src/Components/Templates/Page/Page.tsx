import React, { useMemo } from 'react'

import { SANBox, ISANBoxProps } from '../../Atoms/Box'
import { SANHeader, ISANHeaderProps } from '../../Molecules/Header'
import { SANLayoutContainer, ISANContainerProps } from '../../Organisms/Layout'

export interface ISANPageProps {
    HeaderProps?: ISANHeaderProps
    ContainerProps?: ISANContainerProps
    BoxProps?: ISANBoxProps
    hasContainer?: boolean
}

const SANPage: React.FC<ISANPageProps> = ({
    children,
    hasContainer,
    HeaderProps,
    ContainerProps,
    BoxProps
}) => {
    const content = useMemo(
        () =>
            hasContainer ? (
                <SANLayoutContainer {...ContainerProps}>
                    {children}
                </SANLayoutContainer>
            ) : (
                children
            ),
        [hasContainer, children]
    )

    return (
        <SANBox display='flex' flexDirection='column' flex='1'>
            {!!HeaderProps && <SANHeader {...HeaderProps} />}
            <SANBox pb={9} {...BoxProps}>
                {content}
            </SANBox>
        </SANBox>
    )
}

export default SANPage
