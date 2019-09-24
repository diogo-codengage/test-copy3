export default {
    global: {
        theme: 'Tema',
        courseProgress: 'Progresso do Curso',
        goToBegin: 'Voltar para o início'
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
        save: 'Salvar alterações',
        tab1: {
            title: 'Dados pessoais',
            name: 'Nome',
            document: 'CPF',
            phone: 'Celular',
            college: 'Faculdade',
            semester: 'Semestre'
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
            state: 'Estado'
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
    }
}
