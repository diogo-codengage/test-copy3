export default {
    global: {
        percentOf: '{{done}} de {{final}}',
        you: 'Você',
        back: 'Voltar',
        leave: 'Sair',
        loadMore: 'Carregar mais'
    },
    logout: {
        message: 'Tem certeza que deseja sair da conta agora?'
    },
    mainMenu: {
        back: 'Voltar ao menu principal',
        title: {
            menu: 'Menu',
            notifications: 'Notificações',
            studying: 'Estou estudando',
            myAccount: 'Minha conta',
            search: 'Busca'
        },
        initial: {
            init: 'Início',
            notifications: 'Notificações',
            schedule: 'Cronograma',
            saved: 'Salvos',
            performace: 'Desempenho',
            questions: 'Questões',
            changeCourse: 'Trocar de curso',
            myAccount: 'Minha conta'
        },
        myAccount: {
            management: 'Gerenciamento',
            myData: 'Meus dados',
            changePassword: 'Trocar minha senha',
            help: 'Ajuda',
            sendFeedback: 'Enviar feedback',
            helpCenter: 'Central de ajuda',
            otherLinks: 'Outros links',
            termsOfUse: 'Termos de Uso',
            privacyPolicy: 'Política de Privacidade',
            leaveAccount: 'Sair da conta'
        },
        changeCourse: {
            changeCourse: 'Trocar de curso',
            message:
                'Você tem <strong>{{courses}}</strong> cursos em “{{filter}}”'
        },
        notifications: {
            notRead: 'Não lidas',
            read: 'Já lidas',
            markAllRead: 'Marcar todas como lidas',
            alreadyRead: 'Já lidos',
            excludeRlreadyRead: 'Excluir já lidos',
            markRead: 'Marcar como lida',
            markUnread: 'Marcar como não lida'
        }
    },
    courseDetails: {
        viewMyPerformance: 'Ver meu desempenho',
        myDevelopment: 'Meu desenvolvimento',
        myDevelopmentSubtitle:
            'Vejas as indicações de como você está se saindo no seu aprendizado com seu curso',

        cardCommitmentTitle: 'NÍVEL DE COMPROMETIMENTO',
        cardCommitmentDoubt:
            'Mede seu comprometimento em relação aos outros alunos',
        cardCommitmentDescription: 'melhor do que outros estudantes',
        cardCommitmentLow: 'Baixo',
        cardCommitmentMid: 'Médio',
        cardCommitmentNice: 'Incrível',

        cardConsistencyTitle: 'Consistência',
        cardConsistencyDoubt:
            'Indica se você está estudando, pela plataforma, a mesma quantidade de horas semanais informada no início do curso',
        cardConsistencyDescription: 'Horas estudadas na semana',

        cardProgressTitle: 'Progresso',
        cardProgressDoubt:
            'Indica a quantidade de aulas assistidas em relação às aulas que você já deveria ter assistido nessa altura do curso',
        cardProgressDescription: 'Aulas assistidas no total',

        cardPracticeTitle: 'PRÁTICA REGULAR',
        cardPracticeDoubt:
            'Indica a quantidade de questões respondidas em relação às questões de aula que você já deveria ter respondido nessa altura do curso',
        cardPracticeDescription: 'Atividades respondidas',

        cardInteractionTitle: 'INTERAÇÃO',
        cardInteractionDoubt:
            'Indica o número de interações (pergunta, resposta ou comentário) que você fez na última semana. Interações auxiliam na construção de significados aos conceitos, melhorando a fixação do assunto',
        cardInteractionDescription: 'Perguntas e repostas realizadas',

        recentCommentsTitle: 'Perguntas e Respostas Recentes',
        recentCommentsSubtitle:
            'Vejas as últimas perguntas feitas por seus colegas de curso',
        recentCommentsDays: 'Há {{days}} dias',
        recentCommentsButton: 'Ver todas as perguntas',
        recentCommentsOneComment: 'Participe da comunidade do curso!',
        recentCommentsOneCommentAction: 'PERGUNTAR',
        recentCommentsNoComments: 'Seja o primeiro a fazer uma pergunta!',
        recentCommentsNoCommentsAction: 'QUERO PERGUNTAR',
        recentlySavedTitle: 'Salvos Recentemente',
        recentlySavedSubtitle: 'Veja os dois últimos itens salvos recentemente',
        recentlySavedButton: 'Ver todos os itens salvos',
        recentlySavedOneItem:
            'Continue salvando mais itens para a sua coleção de conteúdos!',
        recentlySavedNoItems: 'Comece a salvar seus conteúdos favoritos!',
        recentlySavedNoItemsAction: 'ADICIONAR EXEMPLO',

        seePreviousLives: 'Ver lives anteriores',
        livesTitle: 'Lives',
        livesSubtitle:
            'Veja as lives que ainda vão acontecer e as que já rolaram',
        nextLivesTitle: 'Próximas lives',
        remembered: 'Lembrado',
        remember: 'Lembrar',
        viewLive: 'Ver live',

        certified: 'Certificado',
        progressbarTitle: 'Progresso do curso',
        downloadTooltip:
            'Complete {{percent}} do curso para disponibilizar o seu certificado.',
        tabGeneral: 'Visão Geral',
        tabContent: {
            title: 'Conteúdo',
            cardModuleAction: 'Ver aulas',
            continue: {
                whereStopped: 'Onde você parou',
                nextModule: 'Próximo módulo'
            },
            professors: {
                title: 'Professores',
                subtitle:
                    'Conheça os especialistas que vão te ajudar no seu aprendizado',
                buttonLoadMore: 'Carregar mais'
            },
            modules: {
                pluralName: 'módulos',
                singularName: 'Módulo',
                whatCourseHas: 'O que esse curso possui',
                whatCourseHasSubtitle:
                    'Tudo o que você tem acesso na plataforma',
                status: {
                    done: 'Concluídas',
                    all: 'Todas',
                    incomplete: 'Incompleto'
                }
            }
        },
        tabQuestions: {
            title: 'Perguntas e Respostas',
            interact: {
                button: 'Fazer nova pergunta',
                subtitle:
                    'Pergunte e ajude seus colegas a tirar suas dúvidas sobre o curso',
                title: 'Interaja com seus colegas'
            },
            search: {
                input: 'Encontre sua pergunta',
                noAnswers: 'Perguntas sem respostas',
                participate: 'Perguntas que participo'
            },
            list: {
                questions: 'Perguntas',
                participate: 'Perguntas que participo',
                orderBy: {
                    title: 'Ordenar por',
                    best: 'Melhores perguntas',
                    first: 'Mais recentes primeiro'
                }
            }
        }
    },
    footer: {
        helpButton: 'Precisa de ajuda?',
        phone: '71 3052-4831',
        email: 'atendimento@e-sanar.com.b',
        attendance: 'Atendimento de Seg. a Sex. das 09h às 18h',
        copyright: 'Copyright © E-sanar. Todos os direitos reservados.',
        termsOfUse: 'Termos de Uso',
        privacyPolicy: 'Política de Privacidade'
    }
}