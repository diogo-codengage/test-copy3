export type IEvents =
    | 'Login failed'
    | 'Login success'
    | 'Session started'
    | 'Logout'
    | 'Password recovered'
    | 'Question answered'
    | 'Filter used'
    | 'Terms acepted'
    | 'Terms rejected'
    | 'Terms viewed'
    | 'Course Homepage viewed'
    | 'Specialty viewed'
    | 'Lesson clicked'
    | 'Video started'
    | 'Video resumed'
    | 'Video paused'
    | 'Video completed'
    | 'Question answered'
    | 'Área de Prática viewed'
    | 'Informações do Curso Viewed'
    | 'Voltar button clicked'
    | 'Precisa de Ajuda button clicked'
    | 'Continuar button clicked'
    | 'Continuar de onde parei button clicked'
    | 'Ver aulas button clicked'
    | 'Video rated'
    | 'App Banner Clicked'
    | 'Page Viewed'
    | 'Cronograma Viewed'
    | 'Lives Area Viewed'
    | 'Ficha Complementar Area'
    | 'Trocar Curso Area'
    | 'Live Viewed'
    | 'Cronograma Adjust'
    | 'Cronograma Used'

export interface IOptions {
    ProductType?: 'ALL'
    Product?: 'Residência Médica'
    Category?:
        | 'Login'
        | 'Session'
        | 'Logout'
        | 'Recover Password'
        | 'Question'
        | 'Filter'
        | 'Terms'
        | 'Course'
        | 'Specialty'
        | 'Subspecialty'
        | 'Lesson'
        | 'Video'
        | 'Quizz'
        | 'Course Menu'
        | 'Rating'
        | 'App Banner'
        | 'Cronograma'
        | 'Account'
    'User ID'?: string
    Email?: string
    'Plataform ID'?: string
    'Question ID'?: string
    Correct?: boolean
    'Filter ID'?: 'Question'
    'Specialty ID'?: string | string[]
    'Subspecialty ID'?: string | string[]
    'Tag ID'?: string | string[]
    'Institution ID'?: string | string[]
    'State ID'?: string
    'Commented by Expert'?: boolean
    'Lesson ID'?: string
    'Clicker ID'?: string
    'Video ID'?: string
    'OS Type'?: 'IOS' | 'ANDROID'
    Rating?: string
    'Question Type'?: 'Quiz' | 'Practical Area'
    'Time in seconds'?: number
    'Source URL'?: string
    'Error code'?: string
    'Error message'?: string
    'Years'?: Number | Number[]
    'Categories'?: string | string[]
    'Only has images'?: boolean
    'Live ID'?: string
    'Live name'?: string
    'Course new'?: string
    'Course ID'?: string
    'Course name'?: string
    'Resource type'?: string
    'Resource ID'?: string
}

export const events = {
    'Login failed': {
        event: 'Login failed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Login'
        }
    },
    'Login success': {
        event: 'Login success',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Login'
        }
    },
    'Session started': {
        event: 'Session started',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Session'
        }
    },
    Logout: {
        event: 'Logout',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Logout'
        }
    },
    'Password recovered': {
        event: 'Password recovered',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Recover Password'
        }
    },
    'Question answered': {
        event: 'Question answered',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Question'
        }
    },
    'Filter used': {
        event: 'Filter used',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Filter'
        }
    },
    'Terms acepted': {
        event: 'Terms acepted',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Terms'
        }
    },
    'Terms viewed': {
        event: 'Terms viewed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Terms'
        }
    },
    'Course Homepage viewed': {
        event: 'Course Homepage viewed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Course'
        }
    },
    'Specialty viewed': {
        event: 'Specialty viewed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Specialty'
        }
    },
    'Lesson clicked': {
        event: 'Lesson clicked',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Lesson'
        }
    },
    'Video started': {
        event: 'Video started',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Video'
        }
    },
    'Video resumed': {
        event: 'Video resumed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Video'
        }
    },
    'Video paused': {
        event: 'Video paused',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Video'
        }
    },
    'Video completed': {
        event: 'Video completed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Video'
        }
    },
    'Question answered quiz': {
        event: 'Question answered',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Quiz'
        }
    },
    'Área de Prática viewed': {
        event: 'Área de Prática viewed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Course Menu'
        }
    },
    'Informações do Curso Viewed': {
        event: 'Informações do Curso Viewed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Course Menu'
        }
    },
    'Voltar button clicked': {
        event: 'Voltar button clicked',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Course Menu'
        }
    },
    'Precisa de Ajuda button clicked': {
        event: 'Precisa de Ajuda button clicked',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Course Menu'
        }
    },
    'Continuar button clicked': {
        event: 'Continuar button clicked',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Course Menu'
        }
    },
    'Continuar de onde parei button clicked': {
        event: 'Continuar de onde parei button clicked',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Course Menu'
        }
    },
    'Ver aulas button clicked': {
        event: 'Ver aulas button clicked',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Course Menu'
        }
    },
    'Video rated': {
        event: 'Video rated',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Rating'
        }
    },
    'App Banner Clicked': {
        event: 'App Banner Clicked',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'App Banner'
        }
    },
    'Page Viewed': {
        event: 'Page Viewed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Navigation'
        }
    },
    'Cronograma Viewed': {
        event: 'Cronograma Viewed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Cronograma'
        }
    },
    'Cronograma Adjust': {
        event: 'Cronograma Adjust',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Cronograma'
        }
    },
    'Cronograma Used': {
        event: 'Cronograma Used',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Cronograma'
        }
    },
    'Lives Area Viewed': {
        event: 'Lives Area Viewed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Lives'
        }
    },
    'Ficha Complementar Area': {
        event: 'Ficha Complementar Area',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Account'
        }
    },
    'Trocar Curso Area': {
        event: 'Trocar Curso Area',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Account'
        }
    },
    'Live Viewed': {
        event: 'Live Viewed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Lives'
        }
    }
}
