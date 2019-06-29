import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Auth } from 'aws-amplify'
import debug from 'debug'
const logger = debug('sanar::home')
window.Auth = Auth;

function HomePage() {
    const { t, i18n } = useTranslation('esanar')
    const [redirectPath, setRedirectPath] = useState('');

    const changeLng = lng => {
        i18n.changeLanguage(lng)
    }
    Auth.currentAuthenticatedUser()
      .then((user) => {
          logger('Use is authenticated: %o', user);
          setRedirectPath('/aluno');
      })
      .catch((error) => {
          logger('Error checking for current authenticated user: %o', error);
          setRedirectPath('/auth/login');
      });

    logger('Home page mounted');

    return (
        <div>
            { redirectPath !== '' ? <Redirect to={redirectPath} /> : null }
            {/* <span>{t('hello')}</span>
            <button onClick={() => changeLng('en')}>Change for English</button>
            <button onClick={() => changeLng('pt')}>
                Mudar para Português
            </button> */}
        </div>
    )
}

export default HomePage
