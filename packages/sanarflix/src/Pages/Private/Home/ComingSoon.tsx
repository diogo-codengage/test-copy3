import React from 'react'
import styled from 'styled-components'

import logo from 'Assets/images/brand/logo.svg'

const ComingSoon = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.primary};
    && img {
        margin-bottom: ${props => props.theme.margins.md};
    }
`

const FLXComingSoon: React.FC = () => {
    return (
        <ComingSoon>
            <img src={logo} alt='sanarflix-logo' />
            Em breve...
        </ComingSoon>
    )
}

export default FLXComingSoon
