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
    compose
} from 'styled-system'

import { ifProp } from 'styled-tools'

import { SANStyled } from '../../../Theme/createTheme'

export interface ISANBoxProps
    extends SpaceProps,
        FlexboxProps,
        ColorProps,
        LayoutProps,
        GridProps,
        BorderProps,
        BackgroundProps,
        PositionProps,
        ShadowProps {
    displayFlex?: boolean
    as?: 'img'
    src?: string
    alt?: string
}

const SANBox: React.FC<ISANBoxProps> = SANStyled('div')`
    ${compose(
        space,
        flexbox,
        color,
        layout,
        grid,
        border,
        background,
        position,
        shadow
    )}

    ${ifProp(
        'displayFlex',
        css`
            display: flex;
        `
    )}
`

export default SANBox
