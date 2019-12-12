import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useWindowSize } from '@sanar/utils/dist/Hooks'
import { useApolloClient } from '@apollo/react-hooks'
import { useSnackbarContext } from '@sanar/components'

import { SANBox, SANModal, SANDivider, SANTypography } from '@sanar/components'

import { RMComplementaryRegisterForm } from '../'

import styled from 'styled-components'
import { theme } from 'styled-tools'

import logo from 'Assets/images/brand/logo.svg'
import { GET_SUPPLEMENTARY_SPECIALTIES } from 'Apollo/User/Queries/supplementary-specialties'
import { GET_INSTITUTIONS } from 'Apollo/PracticalArea/Queries/institutions'
import { IListProps } from '../ComplementaryRegisterForm'
import { IProfile } from 'Apollo/User/Queries/me'

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

const RMModal = ({ profileData = {} as IProfile }) => {
    const { t } = useTranslation('resmed')
    const { width } = useWindowSize()
    const client = useApolloClient()
    const snackbar = useSnackbarContext()
    const [suppSpecialties, setSuppSpecialties] = useState<IListProps[]>([])
    const [institutions, setInstitutions] = useState<IListProps[]>([])
    const [dataToForm, setDataToForm] = useState({})
    const [modalOpen, setModalOpen] = useState(true)

    const handleModalVisible = () => {
        setModalOpen(old => !old)
    }

    const getSpecialties = async () => {
        try {
            const {
                data: { supplementarySpecialties }
            } = await client.query({ query: GET_SUPPLEMENTARY_SPECIALTIES })

            setSuppSpecialties(supplementarySpecialties)
        } catch (err) {
            snackbar({
                message: t('userProfile.loadError.specialties'),
                theme: 'error'
            })
        }
    }

    const getInstitutions = async () => {
        try {
            const {
                data: { institutions }
            } = await client.query({ query: GET_INSTITUTIONS })

            setInstitutions(institutions)
        } catch (err) {
            snackbar({
                message: t('userProfile.loadError.institutions'),
                theme: 'error'
            })
        }
    }

    const getProfile = async () => {
        if (profileData && suppSpecialties[0] && institutions[0]) {
            try {
                const findedSpecialties = suppSpecialties.filter(({ value }) =>
                    profileData.specialtyIds.find(sp => value === sp)
                )

                const findedInstitutions = institutions.filter(({ value }) =>
                    profileData.institutionIds.find(itt => value === itt)
                )

                setDataToForm({
                    ...profileData,
                    specialtyIds: findedSpecialties,
                    institutionIds: findedInstitutions
                })
            } catch {
                snackbar({
                    message: t('userProfile.loadError.profileData'),
                    theme: 'error'
                })
            }
        }
    }

    useEffect(() => {
        getSpecialties()
        getInstitutions()
        if (profileData.id) {
            setDataToForm({ id: profileData.id })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (profileData.id) {
            getProfile()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [suppSpecialties, institutions])

    return (
        <SANStyledModal
            visible={modalOpen}
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
                    oldData={!!profileData.id && dataToForm}
                    specialties={suppSpecialties}
                    institutions={institutions}
                    closeModal={!!profileData.id && handleModalVisible}
                />
            </SANBox>
        </SANStyledModal>
    )
}

export default RMModal
