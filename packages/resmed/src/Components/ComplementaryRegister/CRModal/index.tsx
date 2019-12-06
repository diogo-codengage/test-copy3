import React from 'react'

import { useTranslation } from 'react-i18next'

import { SANBox, SANModal, SANDivider, SANTypography } from '@sanar/components'

import { RMComplementaryRegisterForm } from '../'

import styled from 'styled-components'
import { theme } from 'styled-tools'

import logo from 'Assets/images/brand/logo.svg'

const SANStyledModal = styled(SANModal)`
    &&& {
        width: 744px !important;
        max-width: 100%;
        top: 0;
        margin: 0;
        padding: 0;

        ${theme('mediaQueries.down.sm')} {
            div.ant-modal-content {
                border-radius: 0 !important;
            }
        }
    }
`

const SANImageBox = styled(SANBox)`
    ${theme('mediaQueries.up.sm')} {
        display: none;
    }
`

const styleToModalBodyMobile = {
    padding: 0,
    'border-radius': 0
}

const styleToModalBody = {
    padding: 0
}

const RMModal = () => {
    const { t } = useTranslation('resmed')

    return (
        <SANStyledModal
            visible
            // title={t('userProfile.title')}
            centered={window.innerWidth >= 576}
            closable={false}
            maxWidth={{ _: '100%', sm: '744px' }}
            bodyStyle={
                window.innerWidth < 576
                    ? styleToModalBodyMobile
                    : styleToModalBody
            }
        >
            <SANImageBox textAlign='center'>
                <SANBox
                    as='img'
                    src={logo}
                    height={{ _: '24px', xs: '32px' }}
                    mx='auto'
                    my='sm'
                />
                <SANDivider my='0' mx='auto' bg='grey.2' />
            </SANImageBox>

            <SANBox px={{ _: 'md', sm: '60px' }} py={{ _: 'xl', sm: 'xxxl' }}>
                <SANTypography
                    fontSize='xl'
                    fontWeight='bold'
                    color='grey.7'
                    mb='xs'
                >
                    {t('userProfile.title')}
                </SANTypography>
                <SANTypography fontSize='md' color='grey.6'>
                    {t('userProfile.modalSubtitle')}
                </SANTypography>
                <SANDivider my='xl' mx='auto' bg='grey.2' />
                <RMComplementaryRegisterForm />
            </SANBox>
        </SANStyledModal>
    )
}

export default RMModal
