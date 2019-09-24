import React, { ImgHTMLAttributes, useMemo } from 'react'

import styled from 'styled-components'

import { SANBox } from '../Box'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

export interface ISANBrandHeaderProps extends ImgHTMLAttributes<any> {
    dark?: boolean
}

const Image = styled.img``

const SANBrandHeader = ({ dark, ...props }: ISANBrandHeaderProps) => {
    const {
        assets: {
            icons: {
                logo: { light: lightLogo, dark: darkLogo }
            }
        }
    } = useThemeContext()

    const conditionalProps = useMemo(
        () =>
            dark
                ? {
                      bg: 'grey-solid.9',
                      boxShadow: '2'
                  }
                : {
                      bg: 'white.10',
                      boxShadow: '1'
                  },
        [dark]
    )

    return (
        <SANBox
            {...conditionalProps}
            p='sm'
            display='flex'
            alignItems='center'
            justifyContent='center'
        >
            <Image {...props} src={dark ? darkLogo : lightLogo} />
        </SANBox>
    )
}

export default SANBrandHeader
