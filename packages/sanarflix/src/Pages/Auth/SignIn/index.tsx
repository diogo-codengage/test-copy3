import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'

import ESSignInForm from 'sanar-ui/dist/Components/Organisms/SignInForm'
import ESAuthTemplate from 'sanar-ui/dist/Components/Templates/Auth'
import ESBrandHeader from 'sanar-ui/dist/Components/Atoms/BrandHeader'

import logo from 'Assets/images/brand/logo.svg'
import imageMarketing from 'Assets/images/auth/marketing.png'
import signInByEmail from './signIn'

const FLXSignIn: React.FC<any> = ({ history }) => {
    const { t } = useTranslation('sanarflix')
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false)

    const marketing = {
        title: t('auth.marketing.title'),
        description: t('auth.marketing.description')
    }

    const action = (): void => {
        history.push('/portal')
    }

    return (
        <ESAuthTemplate
            image={imageMarketing}
            marketing={marketing}
            // terms={<Terms />}
            description={t('auth.signInDescription')}
            header={<ESBrandHeader logo={logo} />}
            form={
                <ESSignInForm
                    keepMeLoggedIn={t('auth.keepMeLoggedIn')}
                    forgotPassword={t('auth.forgotPassword')}
                    login={t('auth.login')}
                    action={action}
                    isKeepMeLoggedChecked={keepMeLoggedIn}
                    keepMeLogged={() => setKeepMeLoggedIn(old => !old)}
                    signInByEmail={signInByEmail}
                />
            }
        />
    )
}

export default withRouter(FLXSignIn)
