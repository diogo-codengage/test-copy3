import React from 'react'

import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

import {
    SANSessionTitle,
    ISANSessionTitleProps
} from '@sanar/components/dist/Components/Atoms/SessionTitle'
import {
    SANBanner,
    ISANBannerProps
} from '@sanar/components/dist/Components/Molecules/Banner'

type IProps = {
    BannerProps?: ISANBannerProps
    SessionTitleProps?: ISANSessionTitleProps
} & SpaceProps

const FLXBannerStyled = styled.div`
    ${space}
`

const FLXBanner = ({ BannerProps, SessionTitleProps, ...props }: IProps) => {
    return (
        <FLXBannerStyled {...props}>
            <SANSessionTitle {...SessionTitleProps} />
            <SANBanner {...BannerProps} />
        </FLXBannerStyled>
    )
}

export default FLXBanner
