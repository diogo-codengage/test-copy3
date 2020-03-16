import React, { useMemo } from 'react'

import { SANBox, ISANBoxProps } from '../Box'

import { useThemeContext } from '@sanar/utils/dist/Hooks'

export interface ISANBrandHeaderProps extends ISANBoxProps {
    dark?: boolean
}

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
                      bg: 'grey-solid.8',
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
            zIndex={1}
            height={50}
            {...props}
        >
            <img src={dark ? darkLogo : lightLogo} alt='' />
        </SANBox>
    )
}

export default SANBrandHeader
