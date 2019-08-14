import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SANMainMenu from '../MainMenu'
import SANLayoutContent from './Content'

const SANLayoutStyled = styled.div`
    height: 100vh;
    overflow: hidden;
`

type IProps = PropTypes.InferProps<typeof propTypes>

const SANLayout: React.FC<IProps> = ({
    MenuProps,
    showContinueBar,
    children
}) => {
    const MergeMenuProps = {
        onOpenOrClose: () => console.log,
        showContinueBar: showContinueBar,
        ...MenuProps
    }

    return (
        <SANLayoutStyled>
            <SANMainMenu {...MergeMenuProps} />
            <SANLayoutContent showContinueBar={showContinueBar}>
                {children}
            </SANLayoutContent>
        </SANLayoutStyled>
    )
}

const propTypes = {
    MenuProps: PropTypes.object,
    ContentProps: PropTypes.object,
    showContinueBar: PropTypes.bool
}

SANLayout.propTypes = propTypes
SANLayout.defaultProps = {}

export default SANLayout
