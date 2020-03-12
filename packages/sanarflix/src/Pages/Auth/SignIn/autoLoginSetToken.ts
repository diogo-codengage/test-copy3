
import { parseJWTToken } from '../../../Config/AWSCognito';

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
    const idTokenPayload = parseJWTToken(idToken) as IdTokenPayload

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
        autoLoginSetToken({ idToken, refreshToken }) }
}
