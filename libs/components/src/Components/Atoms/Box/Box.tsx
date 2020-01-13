import React from 'react'

import { css } from 'styled-components'
import {
    SpaceProps,
    space,
    flexbox,
    color,
    layout,
    grid,
    border,
    position,
    shadow,
    FlexboxProps,
    LayoutProps,
    GridProps,
    BorderProps,
    ColorProps,
    background,
    BackgroundProps,
    PositionProps,
    ShadowProps,
    compose,
    typography,
    TypographyProps
} from 'styled-system'

import { ifProp } from 'styled-tools'

import { SANStyled, SANElement } from '../../../Theme/createTheme'

export interface ISANBoxProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
        SpaceProps,
        FlexboxProps,
        ColorProps,
        LayoutProps,
        GridProps,
        BorderProps,
        BackgroundProps,
        PositionProps,
        TypographyProps,
        ShadowProps {
    displayFlex?: boolean
    as?: keyof JSX.IntrinsicElements | React.ComponentType<any>
    src?: string
    alt?: string
    borderBottomRightRadius?: string
    borderBottomLeftRadius?: string
    borderTopRightRadius?: string
    borderTopLeftRadius?: string
}

const SANBox = SANStyled('div')`
    ${compose(
        space,
        flexbox,
        color,
        layout,
        grid,
        border,
        background,
        position,
        shadow,
        typography
    )}

    ${ifProp(
        'displayFlex',
        css`
            display: flex;
        `
    )}
`

export default SANBox as SANElement<ISANBoxProps>
