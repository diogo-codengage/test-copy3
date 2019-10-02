import React from 'react'

import { SANBox } from '../../Atoms/Box'
import { SANTypography } from '../../Atoms/Typography'
import { SANAvatar } from '../../Atoms/Avatar'

import { IUser } from './Profile'

export interface ProfileAvatarProps
    extends Pick<IUser, 'email' | 'name' | 'profile_picture'> {}

const ProfileAvatar = ({
    email,
    name,
    profile_picture
}: ProfileAvatarProps) => {
    return (
        <SANBox
            p='8'
            display='flex'
            flexDirection='column'
            alignItems='center'
            bg='white.10'
            borderRadius='base'
            border='1px solid'
            borderColor='grey.2'
            boxShadow='1'
        >
            <SANAvatar
                src={profile_picture}
                size={100}
                borderRadius={50}
                border='1px solid'
                borderColor='grey.1'
                data-testid='flix_my_account-profile--card-photo'
            />
            <SANTypography level={6} mb='md' mt='xl' color='grey.7'>
                {name}
            </SANTypography>
            <SANTypography
                color='grey.7'
                variant='subtitle2'
                data-testid='flix_my_account-profile--typography-email'
            >
                {email}
            </SANTypography>
        </SANBox>
    )
}

export default ProfileAvatar
