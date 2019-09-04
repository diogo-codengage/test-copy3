import React from 'react'

import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import {
    SANSessionTitle,
    SANBanner,
    ISANSessionTitleProps,
    ISANBannerProps
} from '@sanar/components'

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
            {SessionTitleProps && <SANSessionTitle {...SessionTitleProps} />}
            <SANBanner {...BannerProps} />
        </FLXBannerStyled>
    )
}

export default FLXBanner
