import React, { ReactNode, useState } from 'react'
import { RMContainer } from './RMContainer'
import ESTypography from 'sanar-ui/dist/Components/Atoms/Typography'
import logo from '../assets/images/logo.png'
import styled from 'styled-components'
import { IStyledComponent } from '../Theme/IStyledComponent'

import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESModal from 'sanar-ui/dist/Components/Atoms/Modal'

interface IProp extends IStyledComponent {
    title?: string
    rightElement?: ReactNode
}

const RMHeaderTemplate = ({ title, rightElement, className }: IProp) => {

    const [showModalBackToHome, setShowModalBackToHome] = useState(false)

    return (
        <div className={className}>
            <div id="logo-fixed" className="logo">
                <img alt='logo' src={logo}/>
            </div>
            <RMContainer>
                <div className='container'>
                    <div className="logo">
                        <a href="/" onClick={(e) => {
                            e.preventDefault()
                            setShowModalBackToHome(true)
                        }}>
                            <img alt='logo' src={logo}/>
                        </a>
                    </div>
                    <div className="title">
                        <ESTypography
                            level={4}
                        >{title}</ESTypography>
                    </div>
                    <div className="action">
                        {rightElement}
                    </div>
                </div>
            </RMContainer>
            <ESModal
                title={'Sair'}
                visible={showModalBackToHome}
                centered={'Centered'}
                onCancel={() => {
                    setShowModalBackToHome(false)
                }}
            >
                <p>Tem certeza que deseja sair da página de prática?</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ESButton
                        color='outlined'
                        variant='text'
                        uppercase
                        blockOnlyMobile
                        onClick={() => {
                            setShowModalBackToHome(false)
                        }}
                    >VOLTAR</ESButton>
                    <ESButton
                        color='primary'
                        variant='solid'
                        uppercase
                        blockOnlyMobile
                        onClick={() => {
                            setShowModalBackToHome(false)
                            window.open('/', '_self')
                        }}
                    >CONFIRMAR</ESButton>
                </div>
            </ESModal>
        </div>
    )
}

export const RMHeader = styled(RMHeaderTemplate)`
    && {
            
            background-color: white;
            border-bottom: 1px solid rgba(17, 19, 23, .15);
            margin-bottom: 1em;
            height: 80px;
            display: flex;
            justify-content: center;
            align-items: center;
            
            .container {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }
            
            .title {
                justify-content: center;
            }
            
            #logo-fixed {
                display: none;
            }
            
            @media screen and (max-width: 576px) {
              height: inherit;

              .container {
                flex-direction: column;
              }
              
              .title {
                justify-content: flex-start;
                width: 100%;
                padding-top: 10px;
              }
              .logo {
                text-align: center;
                width: 100%;
                border-bottom: 1px solid rgba(17, 19, 23, .15);
                padding: 10px;  
              }
              .action {
                width: 100%;
                padding: 10px 0px;
              }
              
              #logo-fixed {
                display: block;                
                position: fixed;
                top: 0;
                right: 0;
                left: 0;
                background-color: white;
                z-index: 1000;
              }
            }

    }
    
` as React.FC<IProp>
