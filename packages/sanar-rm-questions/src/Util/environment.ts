const { NODE_ENV } = process.env;

export const isLocalhost = () => {
    return window.location.href.startsWith('http://localhost')
}

export const isDevEnvironment = () => {
    // return NODE_ENV === 'development'
    return window.location.href.indexOf('plataforma-cursos-residencia-dev') > -1;
}

export const isProdEnvironment = () => {
    return window.location.href.indexOf('aluno.sanarresidenciamedica.com.br') > -1;
}


