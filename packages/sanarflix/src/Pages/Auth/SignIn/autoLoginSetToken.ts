interface IdTokenPayload {
    aud: string
    sub: string
}

const getIdTokenPayload = (idToken: string): IdTokenPayload => {
    const payloadBase64 = idToken.split('.')[1]
    const payloadString = atob(payloadBase64)
    return JSON.parse(payloadString)
}

interface IAutoLoginParams {
    idToken: string
    refreshToken: string
}

export const autoLoginSetToken = ({
    idToken,
    refreshToken
}: IAutoLoginParams) => {
    const idTokenPayload = getIdTokenPayload(idToken)

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
    const idToken = params.get('idToken')
    const refreshToken = params.get('refreshToken')

    if (idToken && refreshToken) {
        localStorage.clear()
        autoLoginSetToken({ idToken, refreshToken })
    }
}
