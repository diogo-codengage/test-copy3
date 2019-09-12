import React from 'react'
import styled from 'styled-components'
import { theme } from 'styled-tools'

import { ESLeftOff } from 'sanar-ui/dist/Components/Organisms/MainMenu'

type IProps = {
    title?: string
    thumbnail?: string
    classReference?: number | string
    moduleReference?: number | string
    label?: string
    onClick?: () => void
}

const SANLeftOffStyled = styled.div`
    margin: ${theme('space.md')};
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
