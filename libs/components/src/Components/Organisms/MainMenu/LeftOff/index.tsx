import React from 'react'
import PropTypes from 'prop-types'

import { ESLeftOff } from 'sanar-ui/dist/Components/Organisms/MainMenu'
import styled from 'styled-components'
import { theme } from 'styled-tools'

type IProps = PropTypes.InferProps<typeof ESLeftOff.propTypes>

const SANLeftOffStyled = styled.div`
    margin: ${theme('space.md')};
    margin-bottom: ${theme('space.8')};
    margin-top: 0;
`

const SANLeftOff: React.FC<IProps> = props => {
    return (
        <SANLeftOffStyled>
            <ESLeftOff {...props} />
        </SANLeftOffStyled>
    )
}

export default SANLeftOff
