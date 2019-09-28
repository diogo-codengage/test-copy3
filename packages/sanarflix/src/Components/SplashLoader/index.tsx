import React from 'react'

//TODO: start use TS into SANAR-UI
import { SANSplashLoader } from '@sanar/components'
import { ISANSplashLoaderProps } from '@sanar/components/dist/Components/Atoms/SplashLoader'

import logo from 'Assets/images/brand/logo.svg'

const FLXSplashLoader = (
    props: Partial<Pick<ISANSplashLoaderProps, 'size'>>
) => (
    <SANSplashLoader
        {...props}
        ImageProps={{
            src: logo,
            alt: 'SanarFlix'
        }}
    />
)

export default FLXSplashLoader
