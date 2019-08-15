import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import { theme } from 'styled-tools'
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

const SANContainerStyled = styled.div`
    width: 100%;
    max-width: 1008px;
    padding-right: ${theme('space.md')};
    padding-left: ${theme('space.md')};
    margin-right: auto;
    margin-left: auto;

    ${color}
    ${space}
    ${layout}
    ${flexbox}
    ${border}
`

type IProps = PropTypes.InferProps<typeof propTypes> &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    BorderProps &
    BackgroundColorProps &
    OpacityProps

const SANContainer: React.FC<IProps> = props => {
    return <SANContainerStyled {...props} />
}

const propTypes = {}

SANContainer.propTypes = propTypes
SANContainer.defaultProps = {}

export default SANContainer
