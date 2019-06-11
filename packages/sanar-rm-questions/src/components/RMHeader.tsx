import React, { ReactNode } from 'react'
import { RMContainer } from './RMContainer'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import logo from '../assets/images/logo.png'

interface IProp {
    title: string
    rightElement: ReactNode
}

export function RMHeader(props: IProp) {
    return (
        <div style={
            {
                backgroundColor: 'white',
                borderBottom: '.5px solid rgba(17,19,23,.15)',
                marginBottom: '1em',
                height: '80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }>
            <RMContainer>
                <div style={
                    {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }
                }>
                    <img src={logo} />
                    <ESTypography
                        level={6}
                    >{props.title}</ESTypography>
                    {props.rightElement}
                </div>
            </RMContainer>
        </div>
    )
}
