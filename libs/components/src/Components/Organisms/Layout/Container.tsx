import { SANStyled, SANElement } from '../../../Theme/createTheme'
import { css } from 'styled-components'
import { theme, ifProp } from 'styled-tools'
import {
    color,
    space,
    layout,
    flexbox,
    border,
    BackgroundColorProps,
    OpacityProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    BorderProps
} from 'styled-system'

const SANContainer: SANElement<ISANContainerProps> = SANStyled.div`
    width: 100%;
    max-width: 1008px;
    padding-right: ${theme('space.md')};
    padding-left: ${theme('space.md')};
    margin-right: auto;
    margin-left: auto;

    ${ifProp(
        'fullMobile',
        css`
            ${theme('mediaQueries.down.md')} {
                padding: 0;
            }
        `
    )}

    ${color}
    ${space}
    ${layout}
    ${flexbox}
    ${border}
`

export type ISANContainerProps = SpaceProps &
    LayoutProps &
    FlexboxProps &
    BorderProps &
    BackgroundColorProps &
    OpacityProps & { fullMobile?: boolean }

export default SANContainer
