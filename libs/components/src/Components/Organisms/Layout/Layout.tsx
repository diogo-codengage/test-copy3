import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { ifProp, theme, switchProp } from 'styled-tools'

import { useWindowSize } from '@sanar/utils/dist/Hooks'

import { SANBrandHeader } from '../../Atoms/BrandHeader'
import { SANMainMenu } from '../MainMenu'
import SANLayoutFooter from './Footer'

import sanarLogo from '../../../Assets/images/brand/sanar.svg'
import { ISANLayoutFooterProps } from 'index'

const SANLayoutContentStyled = styled.main`
    flex: auto;
    display: flex;
    flex-direction: column;
    min-height: 0;
`

const SANContentContainer = styled.section`
    min-height: 100vh;
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

    ${switchProp('context', {
        classroom: css`
            padding-bottom: 0;
        `
    })}

    @media screen and (min-width: 1025px) {
        padding-left: 56px;
        padding-bottom: 0;
    }
`

const SANLayoutStyled = styled.section`
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    & .es-main-menu__classroom + ${SANContentContainer} {
        padding: 0;
    }
`

type IProps = PropTypes.InferProps<typeof propTypes>

const SANLayout: React.FC<IProps> = ({
    MenuProps,
    FooterProps,
    showContinueBar,
    context,
    darkMode,
    children
}) => {
    const { width } = useWindowSize()
    const MergeMenuProps = {
        onOpenOrClose: () => {},
        onHome: () => {},
        showContinueBar,
        ...MenuProps
    }

    const MergeFooterProps: ISANLayoutFooterProps = {
        logo: sanarLogo,
        ...FooterProps
    }

    const hasHeaderMobile = useMemo(() => width <= 1024, [width])

    return (
        <SANLayoutStyled>
            <SANMainMenu {...MergeMenuProps} />
            <SANContentContainer {...{ showContinueBar, context }}>
                {hasHeaderMobile && <SANBrandHeader dark={darkMode} />}
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
    showContinueBar: PropTypes.bool,
    context: PropTypes.string,
    darkMode: PropTypes.bool
}

SANLayout.propTypes = propTypes
SANLayout.defaultProps = {}

export default SANLayout
