const { NODE_ENV } = process.env;

export const isLocalhost = () => {
    return window.location.href.startsWith('http://localhost')
}

export const isDevEnvironment = () => {
    return NODE_ENV === 'development'
}

export const isProdEnvironment = () => {
    return NODE_ENV === 'production'
}


