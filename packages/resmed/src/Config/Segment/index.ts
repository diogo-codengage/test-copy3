export type IEvents =
    | 'Login failed'
    | 'Login success'
    | 'Session started'
    | 'Logout'
    | 'Password recovered'
    | 'Question answred'
    | 'Filter used'
    | 'Terms acepted'
    | 'Terms rejected'
    | 'Terms viewed'
    | 'Course Homepage viewed'
    | 'Specialty viewed'
    | 'Subspecialty viewed'
    | 'Lesson clicked'
    | 'Video started'
    | 'Video resumed'
    | 'Video paused'
    | 'Video completed'
    | 'Question answred'
    | 'Área de Prática viewed'
    | 'Informações do Curso Viewed'
    | 'Voltar button clicked'
    | 'Precisa de Ajuda button clicked'
    | 'Continuar button clicked'
    | 'Continuar de onde parei button clicked'
    | 'Ver aulas button clicked'
    | 'Video rated'
    | 'App Banner Clicked'

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
    'User ID'?: string
    Email?: string
    'Plataform ID'?: string
    'Question ID'?: string
    Correct?: boolean
    'Filter ID'?: 'Question'
    'Specialty ID'?: string
    'Subspecialty ID'?: string
    'Tag ID'?: string
    'Institution ID'?: string
    'State ID'?: string
    'Commented by Expert'?: boolean
    'Lesson ID'?: string
    'Clicker ID'?: string
    'Video ID'?: string
    'OS Type'?: 'IOS' | 'ANDROID'
    'Rating'?: string
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
    'Question answred': {
        event: 'Question answred',
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
    'Subspecialty viewed': {
        event: 'Subspecialty viewed',
        data: {
            ProductType: 'ALL',
            Product: 'Residência Médica',
            Category: 'Subspecialty'
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
    'Question answred quiz': {
        event: 'Question answred',
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
    }
}
