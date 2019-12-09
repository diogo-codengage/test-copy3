import React, { useState, useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/react-hooks'

import { RMComplementaryRegisterForm } from '../'

import { SANBox, SANPage, SANTypography } from '@sanar/components'

import { GET_SUPPLEMENTARY_SPECIALTIES } from 'Apollo/User/Queries/supplementary-specialties'

const RMPage = ({ history }) => {
    const { t } = useTranslation('resmed')
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
                        specialties={suppSpecialties}
                        institutions={test}
                    />
                </SANBox>
            </SANBox>
        </SANPage>
    )
}

export default RMPage
