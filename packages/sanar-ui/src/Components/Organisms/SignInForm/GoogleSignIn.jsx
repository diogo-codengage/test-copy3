import React, { useEffect } from 'react'
import ESIcon from '../../Atoms/Icon'
import google from '../../../assets/images/social/blue-google-circle.svg'
import ESButton from '../../Atoms/Button'
import { esGoogleCreateScript } from '../../../Util/Auth/googleSignIn'
import { useTranslation } from 'react-i18next'

const GoogleSVG = () => <img src={google} alt='Google Sign In' />

const ESGoogleSignIn = ({ className, signIn }) => {
    const { t } = useTranslation('sanarui')
    useEffect(() => {
        const ga =
            window.gapi && window.gapi.auth2
                ? window.gapi.auth2.getAuthInstance()
                : null
        if (!ga) esGoogleCreateScript()
    }, [])

    return (
        <ESButton
            onClick={signIn}
            block
            bold
            variant='outlined'
            color='black'
            className={className}
        >
            <ESIcon component={GoogleSVG} />
            {t('authTexts.signInWith', { social: 'Google ' })}
        </ESButton>
    )
}

export default ESGoogleSignIn
