import * as jwtDecode from 'jwt-decode'

interface IdTokenPayload {
    aud: string
    sub: string
}

interface IAutoLoginParams {
    idToken: string
    refreshToken: string
}

export const autoLoginSetToken = ({
    idToken,
    refreshToken
}: IAutoLoginParams) => {
    const idTokenPayload = jwtDecode(idToken) as IdTokenPayload

    localStorage.setItem(
        `CognitoIdentityServiceProvider.${idTokenPayload.aud}.LastAuthUser`,
        idTokenPayload.sub
    )
    localStorage.setItem(
        `CognitoIdentityServiceProvider.${idTokenPayload.aud}.${idTokenPayload.sub}.idToken`,
        idToken
    )
    localStorage.setItem(
        `CognitoIdentityServiceProvider.${idTokenPayload.aud}.${idTokenPayload.sub}.refreshToken`,
        refreshToken
    )
}

export const trySetTokenAutoLoginFromLocationSearch = params => {
    return new Promise((resolve, reject) => {
        try {
            const idToken = params.get('idToken')
            const refreshToken = params.get('refreshToken')
            if (idToken && refreshToken) {
                localStorage.clear()
                autoLoginSetToken({ idToken, refreshToken })
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
