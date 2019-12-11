import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'
import { useWindowSize } from '@sanar/utils/dist/Hooks'

import { RMComplementaryRegisterForm } from '../'

import {
    SANBox,
    SANPage,
    SANTypography,
    useSnackbarContext
} from '@sanar/components'

import { GET_SUPPLEMENTARY_SPECIALTIES } from 'Apollo/User/Queries/supplementary-specialties'
import { GET_INSTITUTIONS } from 'Apollo/PracticalArea/Queries/institutions'
import { GET_ME } from 'Apollo/User/Queries/me'

interface IListProps {
    label: string
    value: number | string
}
const RMPage = ({ history }) => {
    const { t } = useTranslation('resmed')
    const { width } = useWindowSize()
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
        if (suppSpecialties[0] && institutions[0]) {
            try {
                const {
                    data: { me }
                } = await client.query({ query: GET_ME })
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
                py: { sm: '8' },
                px: '0',
                pb: { _: '0', sm: '8' }
            }}
            HeaderProps={{
                onBack: () => history.goBack(),
                SessionTitleProps: {
                    title: t('userProfile.title'),
                    subtitle: t('userProfile.pageSubtitle')
                }
            }}
            ContainerProps={{
                paddingLeft: width < 576 ? '0' : 'md',
                paddingRight: width < 576 ? '0' : 'md'
            }}
        >
            <SANBox
                maxWidth={{ _: '100%', sm: '744px' }}
                marginLeft='auto'
                marginRight='auto'
            >
                <SANTypography
                    fontSize='lg'
                    color='grey.6'
                    mb='xl'
                    px={{ _: 'md', sm: '0' }}
                    pt={{ _: 'md', sm: '0' }}
                >
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
