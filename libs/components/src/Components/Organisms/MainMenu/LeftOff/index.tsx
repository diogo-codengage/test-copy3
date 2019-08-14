import React from 'react'
import PropTypes from 'prop-types'

import { ESLeftOff } from 'sanar-ui/dist/Components/Organisms/MainMenu'
import styled from 'styled-components'
import { theme } from 'styled-tools'

type IProps = PropTypes.InferProps<typeof propTypes>

const SANLeftOffStyled = styled.div`
    margin: ${theme('space.md')};
    margin-bottom: ${theme('space.8')};
    margin-top: 0;
`

const SANLeftOff: React.FC<IProps> = ({ ...props }) => {
    return (
        <SANLeftOffStyled>
            <ESLeftOff {...props} />
        </SANLeftOffStyled>
    )
}

const propTypes = {
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    classReference: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    moduleReference: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    label: PropTypes.string,
    onClick: PropTypes.func
}

export default SANLeftOff
