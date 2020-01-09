import React from 'react'

import styled, { css } from 'styled-components'
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
    TypographyProps,
    OverflowProps
} from 'styled-system'

import { ifProp } from 'styled-tools'

export interface ISANBoxProps
    extends React.HTMLAttributes<HTMLImageElement | HTMLDivElement>,
        SpaceProps,
        FlexboxProps,
        ColorProps,
        LayoutProps,
        GridProps,
        BorderProps,
        BackgroundProps,
        PositionProps,
        TypographyProps,
        ShadowProps,
        OverflowProps {
    displayFlex?: boolean
    color?: string
    src?: string
    alt?: string
}

const SANBox = styled('div')<ISANBoxProps>`
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

export default SANBox
