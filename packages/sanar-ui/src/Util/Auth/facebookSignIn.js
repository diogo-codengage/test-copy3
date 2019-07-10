import { Auth } from 'aws-amplify'

const esFacebookSignIn = () => doLoginIntoCognito()

export const esFacebookCreateScript = key => {
    window.fbAsyncInit = () => fbAsyncInit(key)
    const script = document.createElement('script')
    script.src = 'https://connect.facebook.net/en_US/sdk.js'
    script.async = true
    script.onload = initFB
    document.body.appendChild(script)
}

// Allows you to determine if a user is logged in to Facebook
//and has authenticated your app.
const getLoginStatus = () => {
    const fb = window.FB

    return new Promise((resolve, reject) => {
        fb.getLoginStatus(response => {
            resolve(response)
        })
    })
}

const getFacebookUserData = response => {
    return new Promise(resolve => {
        const { accessToken, expiresIn } = response.authResponse
        const date = new Date()
        const expires_at = expiresIn * 1000 + date.getTime()

        if (!accessToken) {
            return
        }

        const fb = window.FB
        fb.api('/me', { fields: 'name,email' }, response => {
            const user = {
                name: response.name,
                email: response.email
            }

            resolve({ user, accessToken, expires_at })
        })
    })
}

// Prompts the user to authenticate your app using the Login Dialog.
const requestFacebookLogin = () => {
    const fb = window.FB
    return new Promise(resolve => {
        fb.login(resolve)
    })
}

const doLoginIntoCognito = () =>
    Auth.federatedSignIn({ provider: 'Facebook' }).catch(err =>
        console.log(err)
    )

const fbAsyncInit = key => {
    const fb = window.FB
    fb.init({
        appId: key,
        cookie: true,
        xfbml: true,
        version: 'v2.11'
    })
}

const initFB = () => {
    const fb = window.FB
}

export default esFacebookSignIn
