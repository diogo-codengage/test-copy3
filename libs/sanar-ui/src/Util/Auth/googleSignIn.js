import { Auth } from 'aws-amplify'

const esGoogleSignIn = () => {
    return Auth.federatedSignIn({ provider: 'Google' }).then(
        googleUser => {
            console.log(googleUser)
            return getAWSCredentials(googleUser)
        },
        error => {
            console.log(error)
        }
    )
}

export const esGoogleCreateScript = key => {
    // load the Google SDK
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/platform.js'
    script.async = true
    script.onload = () => initGapi(key)
    document.body.appendChild(script)
}

const initGapi = key => {
    // init the Google SDK client
    const g = window.gapi
    g.load('auth2', function() {
        g.auth2.init({
            client_id: key,
            scope: 'profile email openid'
        })
    })
}

const getAWSCredentials = async googleUser => {
    console.log('Starting signIn with Google Button...')

    await Auth.federatedSignIn({ provider: 'Google' })
}

export default esGoogleSignIn
