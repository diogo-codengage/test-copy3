import React from 'react'

import { SANSplashLoader } from '@sanar/components'
import { ISANSplashLoaderProps } from '@sanar/components/dist/Components/Atoms/SplashLoader'

import logo from 'Assets/images/brand/logo.svg'

const RMSplashLoader = (
    props: Partial<Pick<ISANSplashLoaderProps, 'size'>>
) => (
    <SANSplashLoader
        {...props}
        ImageProps={{
            src: logo,
            alt: 'Residência Médica'
        }}
    />
)

export default RMSplashLoader
