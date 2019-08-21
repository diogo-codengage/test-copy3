import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { ifProp, theme } from 'styled-tools'

import { SANMainMenu } from '../MainMenu'
import SANLayoutFooter from './Footer'

import sanarLogo from 'Assets/images/brand/sanar.svg'
import { ISANLayoutFooterProps } from 'index'

const SANLayoutStyled = styled.div`
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`

const SANLayoutContentStyled = styled.div`
    flex: auto;
`

const SANContentContainer = styled.div`
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;

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
        padding-bottom: 0;
    }

    @media screen and (min-width: 1365px) {
        padding-left: 360px;
    }
`

type IProps = PropTypes.InferProps<typeof propTypes>

const SANLayout: React.FC<IProps> = ({
    MenuProps,
    FooterProps,
    showContinueBar,
    children
}) => {
    const MergeMenuProps = {
        onOpenOrClose: () => console.log,
        showContinueBar,
        ...MenuProps
    }

    const MergeFooterProps: ISANLayoutFooterProps = {
        logo: sanarLogo,
        ...FooterProps
    }

    return (
        <SANLayoutStyled>
            <SANMainMenu {...MergeMenuProps} />
            <SANContentContainer {...{ showContinueBar }}>
                <SANLayoutContentStyled>{children}</SANLayoutContentStyled>
                <SANLayoutFooter {...MergeFooterProps} />
            </SANContentContainer>
        </SANLayoutStyled>
    )
}

const propTypes = {
    MenuProps: PropTypes.object.isRequired,
    ContentProps: PropTypes.object,
    FooterProps: PropTypes.object.isRequired,
    showContinueBar: PropTypes.bool
}

SANLayout.propTypes = propTypes
SANLayout.defaultProps = {}

export default SANLayout
