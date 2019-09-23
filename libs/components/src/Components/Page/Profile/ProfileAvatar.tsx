import React from 'react'

import { SANBox } from '../../Atoms/Box'
import { SANTypography } from '../../Atoms/Typography'
import { SANAvatar } from '../../Atoms/Avatar'

import { IUser } from './Profile'

export interface ProfileAvatarProps
    extends Pick<IUser, 'email' | 'name' | 'profilePicture'> {}

const ProfileAvatar = ({ email, name, profilePicture }: ProfileAvatarProps) => {
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
                src={profilePicture}
                size={100}
                borderRadius={50}
                border='1px solid'
                borderColor='grey.1'
            />
            <SANTypography level={6} mb='md' mt='xl'>
                {name}
            </SANTypography>
            <SANTypography variant='subtitle2'>{email}</SANTypography>
        </SANBox>
    )
}

export default ProfileAvatar