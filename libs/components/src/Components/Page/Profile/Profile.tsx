import React from 'react'

import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { SANRow, SANCol } from '../../Molecules/Grid'
import { ISANHeaderProps } from '../../Molecules/Header'
import { SANPage } from '../../Templates/Page'

import ProfileAvatar from './ProfileAvatar'
import ProfileTab from './ProfileTab'

interface IUserMedUniversity {
    medUniversity: {
        id: string
        label: string
    }
    ingressSemester: string
    ingressYear: string
    methodology: string
}

export interface IUser {
    id?: string
    name?: string
    profile_picture?: string
    cpf?: string
    email?: string
    phone_number?: string
    college?: string
    period?: string
    address?: {
        id?: string
        postal_code?: string
        address?: string
        district?: string
        complement?: string
        city_name?: string
        state_id?: string
    }
    userMedUniversity?: IUserMedUniversity
}

export interface IState {
    id: string
    name: string
}

export interface IUniversity {
    id: string
    label: string
}

interface IParams {
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISANProfileProps extends Pick<ISANHeaderProps, 'onBack'> {
    states: IState[]
    universities?: IUniversity[]
    user?: IUser
    onSubmit?: (user: IUser, params: IParams) => void | Promise<void>
}

const PageStyled = styled(SANPage)`
    overflow-x: hidden;
`

const SANProfile: React.FC<ISANProfileProps> = ({
    user = {},
    onSubmit,
    states,
    universities,
    onBack
}) => {
    const { t } = useTranslation('components')

    return (
        <PageStyled
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: { xs: '8', _: 'xl' }
            }}
            HeaderProps={{
                onBack,
                SessionTitleProps: {
                    title: t('profile.title'),
                    subtitle: t('profile.subtitle')
                }
            }}
        >
            <SANRow gutter={24}>
                <SANCol sm={24} md={8} mb='xl'>
                    <ProfileAvatar
                        name={!!user ? user.name : ''}
                        email={user.email || ''}
                        profile_picture={user.profile_picture || ''}
                    />
                </SANCol>
                <SANCol sm={24} md={16}>
                    <ProfileTab
                        onSubmit={onSubmit}
                        user={user}
                        states={states}
                        universities={universities}
                    />
                </SANCol>
            </SANRow>
        </PageStyled>
    )
}

export default SANProfile
