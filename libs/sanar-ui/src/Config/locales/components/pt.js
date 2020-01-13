export default {
    global: {
        theme: 'Tema',
        courseProgress: 'Progresso do Curso',
        goToBegin: 'Voltar para o início'
    },
    customFormMessages: {
        passwordsMismatch: 'As senhas não conferem.',
        minPassword: 'Senha deve ter no mínimo {{min}} caracteres.'
    },
    formValidateMessages: {
        default: 'Erro de validação no campo %s',
        required: 'Este campo é obrigatório',
        enum: '%s deve ser um dos %s',
        whitespace: '%s não pode estar vazio',
        date: {
            format: '%s data %s é inválida para o formato %s',
            parse: '%s data não pôde ser analisada, %s é inválida',
            invalid: '%s data %s é inválida'
        },
        types: {
            string: '%s não é %s',
            method: '%s não é %s (função)',
            array: '%s não é %s',
            object: '%s não é %s',
            number: '%s não é %s',
            date: '%s não é %s',
            boolean: '%s não é %s',
            integer: '%s não é %s',
            float: '%s não é %s',
            regexp: '%s não é valido %s',
            email: 'Este não é um e-mail válido.',
            url: '%s não é valido %s',
            hex: '%s não é valido %s'
        },
        string: {
            len: '%s deve ser exatamente %s caracteres',
            min: '%s deve ter pelo menos %s caracteres',
            max: '%s não pode ser maior que %s caracteres',
            range: '%s deve estar entre %s and %s caracteres'
        },
        number: {
            len: '%s deve ser igual a %s',
            min: '%s não pode ser menor que %s',
            max: '%s não pode ser maior que %s',
            range: '%s deve estar entre %s e %s'
        },
        array: {
            len: '%s deve ter exatamente %s de comprimento',
            min: '%s não pode ter menos que %s de comprimento',
            max: '%s não pode ser maior que %s de comprimento',
            range: '%s deve estar entre %s e %s de comprimento'
        },
        pattern: {
            mismatch: '%s valor %s não corresponde ao padrão %s'
        }
    },
    empty: {
        title: 'Não encontramos o que você buscou.'
    },
    error: {
        leftOff:
            'Ocorreu um erro ao tentar carregar o último conteúdo acessado.'
    },
    startQuiz: {
        title: 'Olá {{name}}, tudo bem?',
        longDescription: `
            A prática de questões é essencial para reafirmar tudo que
            foi estudado na teoria. Além de ser uma excelente forma de
            conhecer melhor como o conteúdo é cobrado nas provas. Por
            isso, separamos questões das principais provas e dos
            conteúdos mais recorrentes dessa disciplina para você!`,
        shortDescription:
            'Mas antes, se liga nessas dicas para tornar a sua experiência ainda melhor:',
        question: 'Tudo pronto para começar?',
        button: 'Sim, Começar',
        start: 'Começar',
        pass1:
            'Separe um período do dia para resolvê-lo, como se fosse fazer uma prova real;',
        pass2: 'Responda as questões como se fosse resolver uma prova real;',
        pass3: 'Cronometre seu tempo;',
        pass4:
            'Confira o gabarito e faça a avaliação de como foi, analisando quais assuntos foram mais fáceis ou mais difíceis para você e onde você precisa melhorar.'
    },
    types: {
        resume: 'Resumo',
        mentalmap: 'Mapa mental',
        flowchart: 'Fluxograma',
        article: 'Artigos e Diretrizes',
        lesson: 'Aula',
        question: 'Questão',
        video: 'Video',
        course: 'Curso'
    },
    search: {
        seeMore: 'Ver mais resultados',
        cancel: 'Cancelar'
    },
    profile: {
        title: 'Meus Dados',
        subtitle: 'Atualize seus dados sempre que quiser',
        save: 'Salvar alterações',
        tab1: {
            title: 'Dados Pessoais',
            name: 'Nome',
            document: 'CPF',
            phone: 'Celular',
            college: 'Faculdade',
            semester: {
                label: 'Semestre',
                placeholder: 'Selecione o semestre'
            }
        },
        tab2: {
            title: 'Dados de Endereço',
            postalCode: 'CEP',
            address: 'Endereço',
            neighborhood: 'Bairro',
            complement: {
                label: 'Complemento',
                placeholder: 'Casa, apartamento...'
            },
            city: 'Cidade',
            state: {
                label: 'Estado',
                placeholder: 'Selecione o estado'
            }
        }
    },
    support: {
        title: 'Em que podemos ajudar?',
        email: 'Seu e-mail',
        message: {
            title: 'O que você quer nos dizer?',
            placeholder: 'Escreva aqui a sua mensagem'
        },
        check:
            'Permitir o contato da Sanar para tirar dúvidas sobre o feedback.',
        cancel: 'Cancelar',
        send: 'Enviar'
    },
    changePassword: {
        title: 'Troque sua senha',
        subtitle: 'Cadastre uma nova senha preenchendo os campos abaixo:',
        fields: {
            current: 'Digite a senha atual',
            new: 'Digite a senha nova',
            confirm: 'Confirme a senha nova'
        },
        confirm: 'Confirmar',
        forgot: 'Esqueci a senha'
    },
    error404: {
        title: 'Oops! Não encontramos o que você buscou.',
        subtitle:
            'A página que você tentou acessar está indisponível ou não existe.',
        button: 'Página principal'
    },
    error500: {
        title: 'Alguma coisa está errada…',
        subtitle:
            'Nosso time já identificou o problema e está trabalhando para resolvê-lo!Por favor, tente novamente em alguns minutos.',
        button: 'Tentar novamente'
    },
    genericError: {
        message: 'Ocorreu um erro. Tente novamente mais tarde.'
    },
    searchResult: {
        new: 'NOVO!',
        popular: 'POPULAR!',
        pages: {
            keyWithCount: '{{count}} página',
            keyWithCount_plural: '{{count}} páginas'
        },
        themes: {
            keyWithCount: '{{count}} tema',
            keyWithCount_plural: '{{count}} temas'
        }
    },
    footer: {
        helpButton: 'Precisa de ajuda?'
    },
    cardSpecialty: {
        access: 'Acessar',
        you: 'Você',
        others: 'Outros',
        comingSoon: 'Em breve'
    },
    helpCenter: {
        header: {
            title: 'Central de Ajuda',
            subtitle:
                'Encontre aqui respostas para as principais dúvidas sobre a plataforma',
            placeholder: 'Como podemos ajudar?'
        },
        platform: {
            title: 'Sobre a plataforma',
            subtitle: 'Perguntas sobre o acesso e o funcionamento da plataforma'
        },
        courses: {
            title: 'Sobre o curso e as aulas',
            subtitle: 'Perguntas relacionadas ao curso e às aulas'
        },
        cancellation: {
            title: 'Sobre cancelamento',
            subtitle: 'Perguntas sobre cancelamentos de cursos'
        },
        others: {
            title: 'Outros tipos de perguntas',
            subtitle: 'Perguntas sobre temas gerais e problemas técnicos'
        }
    },
    cardSubSpecialty: {
        you: 'Você',
        others: 'Outros',
        startWith: 'Começar por:',
        continueWith: 'Onde você parou:',
        seeClasses: 'Ver aulas',
        comingSoon: 'Em breve!'
    },
    lessonFeedback: {
        title: 'O que você achou da aula?',
        subtitle:
            'Envie-nos um feedback para que possamos avaliar a sua experiência.',
        awful: 'Péssima',
        bad: 'Ruim',
        regular: 'Regular',
        good: 'Boa',
        awesome: 'Incrível',
        next: 'Próximo',
        send: 'Enviar'
    },
    lessonResult: {
        titleSuccess: 'Você foi muito bem!',
        titleError: 'Você não foi tão bem',
        performance: {
            youRight: 'Você acertou',
            of: 'de',
            questions: 'questões.',
            resultSuccess: 'Mandou bem!',
            resultError: 'Não desanime!',
            pratice: 'Que tal praticarmos mais um pouco?'
        },
        goToPratice: 'Ir para a área de prática',
        itemSuccess: 'Mandou bem',
        itemError: 'Precisa estudar'
    },
    collection: {
        part: 'Parte'
    },
    bigCalendar: {
        more: 'Mais'
    },
    selectFilter: {
        select: 'Selecione',
        selectAll: 'Selecionar todos',
        clearSelect: 'Limpar seleção',
        close: 'Fechar'
    },
    changeCourse: {
        ends: 'Termina em:',
        finished: 'Terminou em:'
    },
    chat: {
        blocked: 'O chat está desativado.',
        writeSomething: 'Escrever algo'
    }
}
