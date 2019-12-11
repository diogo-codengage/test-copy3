import React, { memo } from 'react'

import { SANSplashLoader } from '@sanar/components'
import { ISANSplashLoaderProps } from '@sanar/components/dist/Components/Atoms/SplashLoader'

import logo from 'Assets/images/brand/logo.svg'

const RMSplashLoader = memo<Partial<Pick<ISANSplashLoaderProps, 'size'>>>(
    props => (
        <SANSplashLoader
            {...props}
            ImageProps={{
                src: logo,
                alt: 'Residência Médica'
            }}
        />
    )
)

export default RMSplashLoader
