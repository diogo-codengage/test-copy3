// import Auth from '@aws-amplify/auth'
// import Amplify from 'aws-amplify'
import { isLocalhost } from './environment'

// Amplify.configure({
//     Auth: {
//         userPoolId: 'us-east-1_EJnJD6R02',
//         userPoolWebClientId: '2uk58uan46uqeqct7lm6osnlck'
//     }
// })

export const getUserToken = async () => {
    if (isLocalhost()) {
        // const user = await Auth.signIn('testesanar@gmail.com', 'sanar123')
        // return user.signInUserSession.idToken.jwtToken
        return 'tlKsaWrqNKLoZfJBqmrdSX7NbNqrESjBkAaewB9NpRB0wdH53zkVEtA691RsGViX'
    } else {

        const goToLogin = () => {
            window.open('/#/entrar', '_self')
        }

        const localValue = localStorage.getItem('persist:sanar-course-v1')
        if (!localValue) {
            goToLogin()
        }

        const authorization = JSON.parse(JSON.parse(localStorage.getItem('persist:sanar-course-v1')).auth).authorization

        if (!authorization) {
            goToLogin()
        }

        return JSON.parse(JSON.parse(localStorage.getItem('persist:sanar-course-v1')).auth).authorization
    }
}


