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
        [hasContainer]
    )

    return (
        <>
            {!!HeaderProps && <SANHeader {...HeaderProps} />}
            <SANBox {...BoxProps}>{content}</SANBox>
        </>
    )
}

export default SANPage
