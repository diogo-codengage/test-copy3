import { Auth } from 'aws-amplify'
import CustomSessionStorage from './customSessionStorage'
import CustomLocalStorage from './customLocalStorage'

const esConfigureAuthStorage = () => {
    const item = JSON.parse(localStorage.getItem('es-keep-me-logged-in'))

    if (!item) {
        Auth.configure({
            storage: CustomSessionStorage
        })
    } else {
        Auth.configure({
            storage: CustomLocalStorage
        })
    }
}

export default esConfigureAuthStorage
