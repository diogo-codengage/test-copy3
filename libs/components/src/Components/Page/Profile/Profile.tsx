import React from 'react'

import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { SANRow, SANCol } from '../../Molecules/Grid'
import { ISANHeaderProps } from '../../Molecules/Header'
import { SANPage } from '../../Templates/Page'

import ProfileAvatar from './ProfileAvatar'
import ProfileTab from './ProfileTab'

export interface IUser {
    id?: string
    name?: string
    profilePicture?: string
    document?: string
    email?: string
    phone?: string
    college?: string
    semester?: number
    postalCode?: string
    address?: string
    neighborhood?: string
    complement?: string
    city?: string
    state?: string
}

export interface IState {
    id: string
    name: string
}

export interface ISANProfileProps extends Pick<ISANHeaderProps, 'onBack'> {
    states: IState[]
    user: IUser
    onSubmit?: (user: IUser) => void
}

const PageStyled = styled(SANPage)`
    overflow-x: hidden;
`

const SANProfile: React.FC<ISANProfileProps> = ({
    user,
    onSubmit,
    states,
    onBack
}) => {
    const { t } = useTranslation('components')

    return (
        <PageStyled
            hasContainer
            BoxProps={{
                bg: 'grey-solid.1',
                flex: '1',
                py: '8'
            }}
            HeaderProps={{
                onBack,
                SessionTitleProps: {
                    title: t('profile.title')
                }
            }}
        >
            <SANRow gutter={24}>
                <SANCol sm={24} md={8} mb='xl'>
                    <ProfileAvatar
                        name={user.name}
                        email={user.email}
                        profilePicture={user.profilePicture}
                    />
                </SANCol>
                <SANCol sm={24} md={16}>
                    <ProfileTab
                        onSubmit={onSubmit}
                        user={user}
                        states={states}
                    />
                </SANCol>
            </SANRow>
        </PageStyled>
    )
}

export default SANProfile
