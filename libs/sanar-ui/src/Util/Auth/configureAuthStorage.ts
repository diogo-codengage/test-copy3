import CustomSessionStorage from './customSessionStorage'
import CustomLocalStorage from './customLocalStorage'

const esConfigureAuthStorage = () => {
    const item = JSON.parse(localStorage.getItem('es-keep-me-logged-in'))
    let storage
    if (!item) {
        storage = CustomSessionStorage
    } else {
        storage = CustomLocalStorage
    }
    return storage;
}

export default esConfigureAuthStorage
