import React from 'react'

import { css } from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import { theme, switchProp } from 'styled-tools'

import { SANStyled } from '../../../Theme/createTheme'
import { SANIcon } from '../Icon'

type Size = 'flexible' | 'fullHeight'

export interface ISANSplashLoaderProps extends SpaceProps {
    ImageProps: React.ImgHTMLAttributes<HTMLImageElement>
    size?: Size
}

const Wrapper = SANStyled.div<SpaceProps & { customSize: Size }>`
    ${space}
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    color: ${theme('colors.primary')};
    font-size: 32px;

    ${switchProp('customSize', {
        fullHeight: css`
            height: 100vh;
            width: 100vw;
        `,
        flexible: css`
            flex: 1 1;
        `
    })}
`

const Image = SANStyled.img`
    margin-bottom: ${theme('space.md')};
    max-height: 100px;
`

const SANSplashLoader = ({
    ImageProps,
    size = 'fullHeight',
    ...props
}: ISANSplashLoaderProps) => (
    <Wrapper {...props} customSize={size}>
        <Image {...ImageProps} />
        <SANIcon type='loading' />
    </Wrapper>
)

export default SANSplashLoader
