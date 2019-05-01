import React, { useState } from 'react'
import {
    Layout as ANTDLayout,
    Divider as ANTDivider,
    Typography as ANTTypography
} from 'antd'

import { ESRow, ESCol } from 'sanar-ui/dist/Components/Atoms/Grid'
import ESButton from 'sanar-ui/dist/Components/Atoms/Button'
import ESEvaIcon from 'sanar-ui/dist/Components/Atoms/EvaIcon'

import { SANPortalPagesContainer } from '../Layout'

import logoSvg from '../../../assets/images/logo.svg'

const { Text: ANTText } = ANTTypography

const SANFooter = () => {
    return (
        <ANTDLayout.Footer className='san-portal-layout__footer'>
            <ANTDivider className='san-portal-layout__footer--divider' />
            <SANPortalPagesContainer>
                <ESRow
                    type='flex'
                    className='san-portal-layout__footer--contact'
                    justify='space-between'
                    align='middle'
                >
                    <ESCol
                        xs={24}
                        sm={24}
                        md={24}
                        lg={3}
                        className='san-portal-layout__footer--contact--logo'
                    >
                        <img src={logoSvg} />
                    </ESCol>
                    <ESCol
                        xs={24}
                        sm={12}
                        md={5}
                        lg={4}
                        className='san-portal-layout__footer--contact--help'
                        type='flex'
                    >
                        <ESButton size='small' fontSize={12}>
                            <ANTText>PRECISA DE AJUDA?</ANTText>
                        </ESButton>
                    </ESCol>
                    <ESCol
                        xs={24}
                        sm={12}
                        md={4}
                        lg={4}
                        className='san-portal-layout__footer--contact--phone'
                    >
                        <ESEvaIcon name='phone-outline' />
                        <ANTText>71 3052-4831</ANTText>
                    </ESCol>
                    <ESCol
                        xs={24}
                        sm={12}
                        md={7}
                        lg={6}
                        className='san-portal-layout__footer--contact--email'
                    >
                        <ESEvaIcon name='email-outline' />
                        <ANTText>atendimento@e-sanar.com.br</ANTText>
                    </ESCol>
                    <ESCol
                        xs={24}
                        sm={12}
                        md={8}
                        lg={7}
                        className='san-portal-layout__footer--contact--attendance'
                    >
                        <ANTText>
                            Atendimento de Seg. a Sex. das 09h às 18h
                        </ANTText>
                    </ESCol>
                </ESRow>
            </SANPortalPagesContainer>
            <ANTDivider />
            <ESRow
                type='flex'
                justify='center'
                className='san-portal-layout__footer--copyright'
                gutter={8}
            >
                <ESCol>
                    <ANTText type='secondary'>
                        Copyright © E-sanar. Todos os direitos reservados.
                    </ANTText>
                </ESCol>
                <ESCol>
                    <ANTText strong>
                        <a>Termos de Uso</a>
                    </ANTText>
                    {' | '}
                    <ANTText strong>
                        <a>Política de Privacidade</a>
                    </ANTText>
                </ESCol>
            </ESRow>
        </ANTDLayout.Footer>
    )
}

export default SANFooter
