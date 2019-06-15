import React, { ReactNode } from 'react'
import { RMContainer } from './RMContainer'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import logo from '../assets/images/logo.png'
import useWindowSize from 'sanar-ui/dist/Hooks/useWindowSize'

interface IProp {
    title?: string
    rightElement?: ReactNode
}

export function RMHeader({ title , rightElement }: IProp) {

    const { width } = useWindowSize()
    const isSmall = width < 770

    return (
        <div style={
            {
                backgroundColor: 'white',
                borderBottom: '.5px solid rgba(17,19,23,.15)',
                marginBottom: '1em',
                height: isSmall ? '' :'80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }>
            <RMContainer>
                <div style={
                    {
                        display: 'flex',
                        flexDirection: isSmall ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }
                }>
                    <img src={logo}/>
                    <ESTypography
                        level={4}
                    >{title}</ESTypography>
                    {rightElement || <div></div>}
                </div>
            </RMContainer>
        </div>
    )
}
