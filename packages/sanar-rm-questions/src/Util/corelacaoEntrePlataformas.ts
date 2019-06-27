interface ICorelacao {
    idPlataforma: string,
    nomePataform: string,
    nomeCorrelacao: string,
}

const items: Array<ICorelacao> = [
    {
        idPlataforma: '5c7ade16dce10b001ec805f7',
        nomePataform: 'Abcesso pulmonar',
        nomeCorrelacao: 'Pneumonia Nosocomial e Abscesso'
    },
    {
        idPlataforma: '5c5dbaefcd4c04001dab3f56',
        nomePataform: 'Anemia fisiológica e anemia ferropriva',
        nomeCorrelacao: 'Anemias hipoproliferativas'
    },

    {
        idPlataforma: '5c5d8bf0cd4c04001dab3f01',
        nomePataform: 'Artrite idiopática juvenil',
        nomeCorrelacao: 'Artrite reumatóide juvenil'
    },

    {
        idPlataforma: '5ca3ee0bd73a12001eabb8d0',
        nomePataform: 'ATLS - Atendimento inicial ao politraumatizado',
        nomeCorrelacao: 'Atendimento inicial ao politraumatizado'
    },

    {
        idPlataforma: '5c5d8af6cd4c04001dab3e77',
        nomePataform: 'ATLS - Choque',
        nomeCorrelacao: 'Choque'
    },

    {
        idPlataforma: '5c5d8af5cd4c04001dab3e76',
        nomePataform: 'ATLS - Manejo de vias aéreas',
        nomeCorrelacao: 'Manejo de vias aéreas'
    },

    {
        idPlataforma: '5ca3eded7c427f001e417e47',
        nomePataform: 'ATLS - Queimaduras',
        nomeCorrelacao: 'Queimaduras'
    },

    {
        idPlataforma: '5c5d8af6cd4c04001dab3e78',
        nomePataform: 'ATLS - Trauma Cranioencefálico',
        nomeCorrelacao: 'Trauma Craioencefálico'
    },

    {
        idPlataforma: '5ca3ee277c427f001e417e4a',
        nomePataform: 'ATLS - Trauma Abdominal - Geral',
        nomeCorrelacao: 'Trauma Abdominal - Geral'
    },

    {
        idPlataforma: '5ca3ee2b7c427f001e417e4b',
        nomePataform: 'ATLS - Trauma Abdominal - Orgãos específicos',
        nomeCorrelacao: 'Trauma Abdominal - Orgãos específicos'
    },

    {
        idPlataforma: '5c5d8b69cd4c04001dab3ea7',
        nomePataform: 'Tireóide - Tireoidites',
        nomeCorrelacao: 'Tireóide - Tireoiditites'
    },

    {
        idPlataforma: '5ca3ee257c427f001e417e49',
        nomePataform: 'ATLS - Trauma Pélvico',
        nomeCorrelacao: 'Trauma Pélvico'
    },

    {
        idPlataforma: '5ca3ee0f7c427f001e417e48',
        nomePataform: 'ATLS - Trauma Torácico',
        nomeCorrelacao: 'Trauma Torácico'
    },

    {
        idPlataforma: '5c5d8b84cd4c04001dab3ebe',
        nomePataform: 'Síndrome do intestino irritável',
        nomeCorrelacao: 'Síndrome do intestino irritável '
    },

    {
        idPlataforma: '5c5d8b8acd4c04001dab3ec8',
        nomePataform: 'Complicações oncológicas',
        nomeCorrelacao: 'Complicações oncológicas '
    },

    {
        idPlataforma: '5c5d8b9fcd4c04001dab3ed6',
        nomePataform: 'Hanseníase',
        nomeCorrelacao: 'Hanseniase'
    },

    {
        idPlataforma: '5c5d8ba8cd4c04001dab3ede',
        nomePataform: '"Distúrbios hidroeletrolíticos: Potássio, sódio e Calcio"',
        nomeCorrelacao: '"Distúrbio hidroeletrolíticos: Potássio, sódio e Calcio"'
    },

    {
        idPlataforma: '5c5d8af3cd4c04001dab3e72',
        nomePataform: 'Câncer de Esôfago',
        nomeCorrelacao: 'Neoplasia do esôfago e esofagectomia'
    },

    {
        idPlataforma: '5c5d8af3cd4c04001dab3e73',
        nomePataform: 'Câncer do Pâncreas',
        nomeCorrelacao: 'Neoplasia do pâncreas'
    },

    {
        idPlataforma: '5c5d8aeacd4c04001dab3e70',
        nomePataform: 'Câncer Gástrico',
        nomeCorrelacao: 'Neoplasia gástrica e gastrectomias'
    },

    {
        idPlataforma: '5c5d8bb8cd4c04001dab3ee7',
        nomePataform: 'Cefaleias',
        nomeCorrelacao: 'Cefaléias '
    },

    {
        idPlataforma: '5c5d8b1ecd4c04001dab3e94',
        nomePataform: 'Cirurgia vascular',
        nomeCorrelacao: ''
    },

    {
        idPlataforma: '5c5d8af3cd4c04001dab3e74',
        nomePataform: 'Colelitíase',
        nomeCorrelacao: 'Litíase biliar e suas complicações'
    },

    {
        idPlataforma: '5c5d8bc2cd4c04001dab3eee',
        nomePataform: 'Derrame Pleural',
        nomeCorrelacao: 'Derrame Pleural '
    },

    {
        idPlataforma: '5c5d8b78cd4c04001dab3eab',
        nomePataform: 'Diabetes mellitus - Complicações cronicas',
        nomeCorrelacao: 'Diabetes mellitus - Complicações crônicas'
    },

    {
        idPlataforma: '5c5d8bddcd4c04001dab3efe',
        nomePataform: 'Artrite reumatóide',
        nomeCorrelacao: 'Artrite reumatóide '
    },

    {
        idPlataforma: '5c5d8b82cd4c04001dab3eb9',
        nomePataform: 'Diarreias Agudas',
        nomeCorrelacao: 'Diarréias Agudas'
    },

    {
        idPlataforma: '5c5d8bffcd4c04001dab3f05',
        nomePataform: 'Osteoartrite e doenças microcristalinas',
        nomeCorrelacao: 'Osteoartrite e doenças microcristalinas '
    },

    {
        idPlataforma: '5c5d8af4cd4c04001dab3e75',
        nomePataform: 'Doença Ulcerosa Péptica',
        nomeCorrelacao: 'Dispesia e Helicobacter pylori'
    },

    {
        idPlataforma: '5c5d8c3acd4c04001dab3f17',
        nomePataform: 'Fisiologia Mestrual',
        nomeCorrelacao: 'Fisiologia Menstrual'
    },

    {
        idPlataforma: '5c5da081cd4c04001dab3f32',
        nomePataform: 'Infecções de vias aéreas superiores',
        nomeCorrelacao: 'Infecções de vias aéreas superiores '
    },

    {
        idPlataforma: '5c5dbaefcd4c04001dab3f57',
        nomePataform: 'Doenças exantemáticas',
        nomeCorrelacao: 'Doenças exantemáticas e linfonodomegalias'
    },

    {
        idPlataforma: '5c5d8bc1cd4c04001dab3eed',
        nomePataform: 'Doenças Neurológicas Autoimunes e Esclerose Lateral Amiotrófica',
        nomeCorrelacao: 'Doenças Desmielinizantes e da Substância Branca'
    },

    {
        idPlataforma: '5c5d8ba9cd4c04001dab3ee0',
        nomePataform: 'Envolvimento Renal em doenças sistêmicas',
        nomeCorrelacao: 'Envolvimento Renal em doenças crônicas'
    },

    {
        idPlataforma: '5c5d8bbecd4c04001dab3ee8',
        nomePataform: 'Epilepsia',
        nomeCorrelacao: 'Epilepsia e crises convulsivas'
    },

    {
        idPlataforma: '5c5d8b48cd4c04001dab3e98',
        nomePataform: 'Hipertensão Arterial Sistêmica Primária',
        nomeCorrelacao: 'Hipertensão Arterial Sistêmica (Primária e Secundária)'
    },

    {
        idPlataforma: '5ca4e92ed73a12001eabb8d2',
        nomePataform: 'Hipertensão Arterial Sistêmica Secundária',
        nomeCorrelacao: 'Hipertensão Arterial Sistêmica (Primária e Secundária)'
    },

    {
        idPlataforma: '5ca4e93634c627001e3b4eaf',
        nomePataform: 'IC descompensada e Edema Agudo de pulmão',
        nomeCorrelacao: 'Edema Agudo pulmonar'
    },

    {
        idPlataforma: '5c5dbaedcd4c04001dab3f54',
        nomePataform: 'Imunizações',
        nomeCorrelacao: 'Imunizações e calendário vacinal'
    },

    {
        idPlataforma: '5ca3d1f3d73a12001eabb8cf',
        nomePataform: 'Introdução à Neonatologia',
        nomeCorrelacao: 'Aspectos Básicos da Neonatologia'
    },

    {
        idPlataforma: '5c8969a48adffa001e14694a',
        nomePataform: 'Meningites',
        nomeCorrelacao: 'Meningite e Infecções do SNC'
    },

    {
        idPlataforma: '5c82ecb68adffa001e146949',
        nomePataform: 'Neoplasias de pele',
        nomeCorrelacao: 'Melanoma '
    },

    {
        idPlataforma: '5c5d8bc9cd4c04001dab3ef0',
        nomePataform: 'Pneumonia Nosocomial',
        nomeCorrelacao: 'Pneumonia Nosocomial e Abscesso'
    },

    {
        idPlataforma: '5c5da564cd4c04001dab3f3b',
        nomePataform: 'Prevenção da transmissão vertical do HIV',
        nomeCorrelacao: 'Prevenção da transmissão vertical / '
    },

    {
        idPlataforma: '5c5dbbd5cd4c04001dab3f5e',
        nomePataform: 'Processos Endêmico e Epidêmico',
        nomeCorrelacao: 'Epidemias'
    },

    {
        idPlataforma: '5c5d8bbfcd4c04001dab3ee9',
        nomePataform: 'Síndromes Demenciais',
        nomeCorrelacao: 'Demências'
    },

    {
        idPlataforma: '5c5d8bc0cd4c04001dab3eeb',
        nomePataform: 'Transtornos do Movimento',
        nomeCorrelacao: 'Distúrbios do Movimento'
    },

    {
        idPlataforma: '5ca3ee33d73a12001eabb8d1',
        nomePataform: 'Trauma Raquimedular',
        nomeCorrelacao: 'Trauma da Coluna Vertebral'
    },

    {
        idPlataforma: '5ca4fb94e2b400001ecfbea6',
        nomePataform: 'Transtornos de ansiedade e dissociativo',
        nomeCorrelacao: 'Transtornos da ansiedade e dissociativos'
    },

    {
        idPlataforma: '5ca4fb96e2b400001ecfbea7',
        nomePataform: 'Transtornos de personalidade',
        nomeCorrelacao: 'Transtornos da personalidade'
    },

    {
        idPlataforma: '5c5d8c2bcd4c04001dab3f0c',
        nomePataform: 'Vulvovaginites',
        nomeCorrelacao: 'Vulvogaginites e Cervicite'
    }
]

export const toCorrelacaoTagName = (str: string) => {
    const item = items.find(i => i.nomePataform === str)

    if (!!item) {
        return item.nomeCorrelacao
    }

    return str
}
