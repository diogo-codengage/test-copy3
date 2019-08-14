import React from 'react'
import styled, { css } from 'styled-components'
import { ifProp, theme } from 'styled-tools'

const SANLayoutContentStyled = styled.div`
    height: 100%;
    padding-bottom: 56px;

    ${ifProp(
        'showContinueBar',
        css`
            padding-bottom: 96px;
        `,
        css`
            padding-bottom: ${theme('space.8')};
        `
    )}

    @media screen and (min-width: 1025px) {
        padding-left: 56px;
    }

    @media screen and (min-width: 1365px) {
        padding-left: 360px;
    }
`

interface IProps {
    showContinueBar?: boolean
}

const SANLayoutContent: React.FC<IProps> = ({ children, showContinueBar }) => (
    <SANLayoutContentStyled {...{ showContinueBar }}>
        {children}
    </SANLayoutContentStyled>
)

SANLayoutContent.defaultProps = {
    showContinueBar: false
}

export default SANLayoutContent
