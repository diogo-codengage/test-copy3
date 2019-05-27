import React from 'react'
import ESIcon from '../../Atoms/Icon'
import google from '../../../assets/images/social/blue-google-circle.svg'
import ESButton from '../../Atoms/Button'

const GoogleSVG = () => <img src={google} alt='Google Sign In' />

const ESGoogleSignIn = ({ className }) => (
    <ESButton block bold variant='outlined' color='black' className={className}>
        <ESIcon component={GoogleSVG} />
        Google
    </ESButton>
)

export default ESGoogleSignIn
