import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { useAuthContext } from 'Hooks/auth'
import { useSnackbarContext } from '@sanar/components'

import { RMComplementaryRegisterForm } from '../'

import { SANBox, SANPage, SANTypography } from '@sanar/components'

import { GET_SUPPLEMENTARY_SPECIALTIES } from 'Apollo/User/Queries/supplementary-specialties'
import { GET_INSTITUTIONS } from 'Apollo/PracticalArea/Queries/institutions'

interface IListProps {
    label: string
    value: number | string
}
const RMPage = ({ history }) => {
    const { t } = useTranslation('resmed')
    const { me } = useAuthContext()
    const client = useApolloClient()
    const snackbar = useSnackbarContext()
    const [profileData, setProfileData] = useState({})
    const [institutions, setInstitutions] = useState<IListProps[]>([])
    const [suppSpecialties, setSuppSpecialties] = useState<IListProps[]>([])

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
        if (!!me && me.profile && suppSpecialties && institutions) {
            const findedSpecialties = suppSpecialties.filter(({ value }) =>
                me.profile.specialtyIds.find(sp => value === sp)
            )

            const findedInstitutions = institutions.filter(({ value }) =>
                me.profile.institutionIds.find(itt => value === itt)
            )

            setProfileData({
                ...me.profile,
                specialtyIds: findedSpecialties,
                institutionIds: findedInstitutions
            })
        }
    }

    useEffect(() => {
        getSpecialties()
        getInstitutions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        getProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [suppSpecialties, institutions])

    return (
        <SANPage
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: { xs: '8', _: 'md' }
            }}
            HeaderProps={{
                onBack: () => history.goBack(),
                SessionTitleProps: {
                    title: t('userProfile.title'),
                    subtitle: t('userProfile.pageSubtitle')
                }
            }}
            ContainerProps={{}}
        >
            <SANBox
                maxWidth={{ _: '100%', sm: '744px' }}
                marginLeft='auto'
                marginRight='auto'
            >
                <SANTypography fontSize='lg' color='grey.6' mb='xl'>
                    {t('userProfile.pagePresentation')}
                </SANTypography>
                <SANBox
                    bg='white.10'
                    borderRadius='base'
                    border='1px solid'
                    borderColor='grey.2'
                    boxShadow='1'
                    px={{ _: 'md', sm: '60px' }}
                    py={{ _: 'xl', sm: 'xxxl' }}
                >
                    <RMComplementaryRegisterForm
                        oldData={profileData}
                        specialties={suppSpecialties}
                        institutions={institutions}
                    />
                </SANBox>
            </SANBox>
        </SANPage>
    )
}

export default RMPage
