import React, { useEffect } from 'react'
import ESIcon from '../../Atoms/Icon'
import facebook from '../../../assets/images/social/blue-facebook.svg'
import ESButton from '../../Atoms/Button'
import { esFacebookCreateScript } from '../../../Util/Auth/facebookSignIn'

const FacebookSVG = () => <img src={facebook} alt='Facebook Sign In' />

// To federated sign in from Facebook
const ESFacebookSignIn = ({ signIn, loading }) => {
    useEffect(() => {
        if (!window.FB) esFacebookCreateScript()
    }, [])

    return (
        <ESButton
            block
            bold
            variant='outlined'
            color='black'
            loading={loading}
            onClick={() => signIn()}
            className='mb-md'
        >
            <ESIcon component={FacebookSVG} />
            Entrar com Facebook
        </ESButton>
    )
}

export default ESFacebookSignIn
