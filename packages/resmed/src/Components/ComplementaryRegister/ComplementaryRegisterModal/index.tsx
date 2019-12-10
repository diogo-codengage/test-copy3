import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useWindowSize } from '@sanar/utils/dist/Hooks'
import { useApolloClient } from '@apollo/react-hooks'

import { SANBox, SANModal, SANDivider, SANTypography } from '@sanar/components'

import { RMComplementaryRegisterForm } from '../'

import styled from 'styled-components'
import { theme } from 'styled-tools'

import logo from 'Assets/images/brand/logo.svg'
import { GET_SUPPLEMENTARY_SPECIALTIES } from 'Apollo/User/Queries/supplementary-specialties'

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
    const { width } = useWindowSize()
    const client = useApolloClient()
    const [suppSpecialties, setSuppSpecialties] = useState([])

    const getSpecialties = async () => {
        try {
            const {
                data: { supplementarySpecialties }
            } = await client.query({ query: GET_SUPPLEMENTARY_SPECIALTIES })

            setSuppSpecialties(
                supplementarySpecialties.map(({ id, name }) =>
                    Object({ label: name, value: id })
                )
            )
        } catch (err) {
            throw new Error(err)
        }
    }

    const test = [
        { label: 'teste0', value: '5dbe35bc107f4d001122aa43' },
        { label: 'teste1', value: '5dbe35bc107f4d001122aa44' },
        { label: 'teste2', value: '5dbe35bc107f4d001122aa45' },
        { label: 'teste3', value: '5dbe35bc107f4d001122aa46' },
        { label: 'teste4', value: '5dbe35bc107f4d001122aa47' },
        { label: 'teste5', value: '5dbe35bc107f4d001122aa48' },
        { label: 'teste6', value: '5dbe35bc107f4d001122aa49' },
        { label: 'teste7', value: '5dbe35bc107f4d001122aa50' },
        { label: 'teste8', value: '5dbe35bc107f4d001122aa51' },
        { label: 'teste9', value: '5dbe35bc107f4d001122aa52' }
    ]

    useEffect(() => {
        getSpecialties()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SANStyledModal
            visible
            centered={width >= 576}
            closable={false}
            maxWidth={{ _: '100%', sm: '744px' }}
            bodyStyle={width < 576 ? styleToModalBodyMobile : styleToModalBody}
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
                <RMComplementaryRegisterForm
                    specialties={suppSpecialties}
                    institutions={test}
                />
            </SANBox>
        </SANStyledModal>
    )
}

export default RMModal
