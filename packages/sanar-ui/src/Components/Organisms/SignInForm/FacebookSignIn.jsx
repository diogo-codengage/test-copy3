import React from 'react'
import ESIcon from '../../Atoms/Icon'
import facebook from '../../../assets/images/social/blue-facebook.svg'
import ESButton from '../../Atoms/Button'

const FacebookSVG = () => <img src={facebook} alt='Facebook Sign In' />

const ESFacebookSignIn = ({ className }) => (
    <ESButton block bold variant='outlined' color='black' className={className}>
        <ESIcon component={FacebookSVG} />
        Facebook
    </ESButton>
)

export default ESFacebookSignIn
