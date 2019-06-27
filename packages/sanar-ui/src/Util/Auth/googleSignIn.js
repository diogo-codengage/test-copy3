import { Auth } from 'aws-amplify'

// To federated sign in from Google

const esGoogleSignIn = () => {
    return Auth.federatedSignIn({ provider: 'Google' }).then(
        googleUser => {
            console.log(googleUser);
            return getAWSCredentials(googleUser)
        },
        error => {
            console.log(error)
        }
    )
}

export const esGoogleCreateScript = () => {
    // load the Google SDK
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.async = true
    script.onload = initGapi
    document.body.appendChild(script)
}

const initGapi = () => {
    // init the Google SDK client
    const g = window.gapi
    g.load('auth2', function() {
        g.auth2.init({
            client_id:
                '807324955316-01gamhmmlffq8oc15r2huvnrahigdi5v.apps.googleusercontent.com',
            // authorized scopes
            scope: 'profile email openid'
        })
    })
}

const getAWSCredentials = async googleUser => {
    console.log('Starting signIn with Google Button...');
    /*
    const { id_token, expires_at } = googleUser.getAuthResponse()
    const profile = googleUser.getBasicProfile()
    let user = {
        email: profile.getEmail(),
        name: profile.getName()
    }

    await Auth.federatedSignIn('google', { token: id_token, expires_at }, user)
    */
    await Auth.federatedSignIn({ provider: 'Google' })
}

export default esGoogleSignIn
