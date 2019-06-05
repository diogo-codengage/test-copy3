export default {
    global: {
        filter: 'Filtrar'
    },
    mainMenu: {
        leftOff: 'Continuar onde parei'
    },
    cardSelectFilter: {
        selectAll: 'Selecionar todos',
        clearSelect: 'Limpar seleção'
    },
    formValidateMessages: {
        default: 'Erro de validação no campo %s',
        required: '%s é obrigatório',
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
            email: '%s não é valido %s',
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
    practiceCompleted: {
        title: 'Prática finalizada',
        elapsedTime: 'Tempo decorrido na sessão',
        averageQuestionTime: 'Tempo médio de resposta',
        sawQuestions: 'questões visualizadas',
        correct: 'Corretas:',
        wrong: 'Erradas:',
        skipped: 'Puladas:'
    }
}
