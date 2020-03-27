export default {
    global: {
        error: 'Ocorreu um erro. Tente novamente mais tarde.',
        knowMore: 'Saiba mais',
        termsOfUse: 'Termos de Uso',
        privacyPolicy: 'Política de Privacidade',
        send: 'Enviar',
        access: 'Acessar',
        viewCourse: 'Ver curso',
        allCourses: 'Todos os cursos',
        about: 'Sobre o SanarFlix',
        copyright: 'Todos os direitos reservados',
        course: 'Curso',
        year: 'ano',
        completenessFilters: {
            all: 'Todos',
            completed: 'Concluídos',
            incomplete: 'Incompletos'
        },
        resourceTypes: {
            document: 'Documento',
            video: 'Video',
            question: 'Questão',
            quiz: 'Questão'
        },
        types: {
            resume: 'Resumo',
            mentalmap: 'Mapa mental',
            flowchart: 'Fluxograma',
            article: 'Artigos e Diretrizes',
            lesson: 'Aula',
            question: 'Questão',
            quiz: 'Questão'
        },
        search: 'Busque por cursos, aulas, resumos e muito mais',
        foundResults: ' resultados encontrados para ',
        leave: 'Sair',
        back: 'Voltar',
        all: 'Todos',
        months: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ],
        yes: 'Sim',
        no: 'Não',
        backStart: 'Voltar ao início'
    },
    logout: {
        message: 'Tem certeza que deseja sair da conta agora?',
        signOut: 'Sair da Conta'
    },
    auth: {
        accessAccount: 'Acessar conta',
        signInDescription:
            'Sua conta SANAR é a chave para você acessar todos os cursos e ferramentas para otimizar e impulsionar sua carreira médica.',
        keepMeLoggedIn: 'Manter logado',
        forgotPassword: 'Esqueci minha senha',
        login: 'Entrar',
        title: 'Ou entre com os dados abaixo',
        newPassword: 'Nova senha',
        currentPassword: 'Senha atual',
        messageChangeSuccess: 'Senha alterada com sucesso!',
        marketing: {
            title:
                'Otimizar seus estudos e impulsionar sua carreira médica: esse é o nosso propósito!',
            description:
                'Acesse seus cursos do SanarFlix ou Residência Médica e confira as milhares de questões, flashcards e artigos científicos que a Sanar Medicina separou para você!'
        },
        sendPasswordRecovery: {
            title: 'Esqueci minha senha',
            subtitle:
                'Preencha o campo abaixo e nós te enviaremos um link de recuperação alteração de senha',
            email: 'Digite seu e-mail cadastrado'
        },
        sendResetPassword: {
            title: 'Troque sua senha',
            subtitle: 'Cadastre uma nova senha preenchendo os campos abaixo:',
            confirmPassword: 'Confirme sua senha'
        },
        createNewPassword: {
            title: 'Crie uma nova senha',
            button: 'Criar senha'
        },
        passwordResetSent: {
            title: 'Enviado com sucesso!',
            subtitle: 'Um link de recuperação foi enviado para:',
            advice:
                'Fique atento a caixa de spam caso não encontre o e-mail de recuperação.'
        },
        validations: {
            passwordsMismatch: 'As senhas não conferem.',
            minPassword: 'Senha deve ter no mínimo {{min}} caracteres.'
        },
        footer: {
            onEnter: 'Ao entrar na plataforma, você concorda com nossos',
            us: 'e nossa'
        }
    },
    course: {
        continue: 'Continuar de onde parei',
        itemSuggest: 'Próximo item sugerido',
        banners: {
            questionsBase: {
                title: 'Banco de Questões',
                action: 'Acessar'
            }
        },
        description:
            'O que você irá aprender e os materiais que você tem acesso na plataforma.',
        subheader: {
            key: 'tema',
            key_plural: 'temas',
            keyWithCount: '{{count}} Tema',
            keyWithCount_plural: '{{count}} Temas'
        },
        viewCourse: 'Ver curso',
        seeLess: 'Ver menos',
        viewMore: 'Ver mais',
        whatCurseHave: 'O que esse curso possui',
        counters: {
            articles: {
                key: 'Artigos e Diretrizes',
                key_plural: 'Artigos e Diretrizes'
            },
            certificates: {
                key: 'Certificado',
                key_plural: 'Certificados'
            },
            flowcharts: {
                key: 'Fluxograma',
                key_plural: 'Fluxogramas'
            },
            lessons: {
                key: 'Aula',
                key_plural: 'Aulas'
            },
            mentalmaps: {
                key: 'Mapa mental',
                key_plural: 'Mapas mentais'
            },
            questions: {
                key: 'Questão',
                key_plural: 'Questões'
            },
            resumes: {
                key: 'Resumo',
                key_plural: 'Resumos'
            }
        }
    },
    exams: {
        title: 'Provas',

        subtitle:
            'Acesse à provas completas e comentadas de diversas universidades do Brasil',
        practice: {
            questionMap: {
                corrects: 'Corretas',
                wrong: 'Erradas',
                skipped: 'Puladas'
            },

            title: 'Provas',
            subtitle:
                'Acesse à provas completas e comentadas de diversas universidades do Brasil',
            questionMap: 'Mapa de questões',
            finished: {
                noActiveExam: 'Primeiro é necessário que você realize um prova',
                backToExams: 'Escolher outra prova',
                title: 'Prova finalizada'
            }
        },
        onBoarding: {
            first: {
                title: 'Passe na prova da sua faculdade!',
                text:
                    'Aqui você tem acesso às provas da sua faculdade e de diversas universidades do país. Fique por dentro de como são cobrados todos os assuntos da graduação e saia preparado(a) para tirar nota 10!',
                bottom:
                    'Encontre a prova ideal para seu estudo por faculdade, disciplina, temas, ano, semestre e metodologia.'
            },
            second: {
                title: 'Encontre as provas já realizadas na sua faculdade!',
                text:
                    'Para encontrar a prova que mais se encaixa nas suas necessidades, informe a sua faculdade, o semestre em que você ingressou e sua metodologia de aprendizado.'
            },
            form: {
                button: 'Começar',
                selectCollegeLabel: 'Informe a sua faculdade',
                selectSemesterLabel: 'Informe o seu semestre de ingresso',
                selectMethodologyLabel: 'Informe a sua metodologia'
            }
        },
        list: {
            title: 'Provas de ',
            subtitle: 'Estas são as provas disponíveis da sua faculdade:',
            emptySubtitle: 'Não há provas disponíveis.',
            train: 'Treinar',
            exams: ' prova(s)',
            questions: ' questões',
            loadMore: 'Carregar mais'
        }
    },
    courses: {
        title: 'Todos os Cursos',
        subtitle: 'Encontre aqui todos os cursos',
        subheader: {
            key: 'curso',
            key_plural: 'disciplinas',
            keyWithCount: '{{count}} cursos',
            keyWithCount_plural: '{{count}} cursos'
        },
        viewCourse: 'Ver curso'
    },
    home: {
        viewedCourses: {
            title: 'Cursos Visualizados',
            subtitle: 'Continue assistindo de onde você parou'
        },
        addedContents: {
            title: 'Adicionados',
            subtitle:
                'Conteúdos adicionados toda semana! Aulas, resumos e outros materiais que acabaram de chegar'
        },
        banners: {
            allCourses: {
                title: 'Todos os Cursos',
                subtitle: 'Conteúdo completo com diversos recursos',
                action: 'Acessar'
            },
            questionsBase: {
                title: 'Banco de Questões',
                subtitle: 'Aprimore seus conhecimentos',
                action: 'Acessar'
            },
            indicate: {
                title: 'Indique e Ganhe',
                subtitle:
                    'Indique o SanarFlix para os seus amigos. A cada indicação válida você ganha R$20!',
                action: 'Em breve'
            }
        }
    },
    mainMenu: {
        back: 'Voltar ao menu principal',
        initial: {
            begin: 'Início',
            allCourses: 'Todos os cursos',
            added: 'Adicionados',
            exams: 'Provas',
            questionBase: 'Banco de questões',
            bookmarks: 'Favoritos',
            invites: 'Indique e ganhe',
            account: 'Minha conta',
            questions: 'Banco de questões'
        },
        account: {
            title: 'Minha Conta',
            management: 'Gerenciamento',
            myData: 'Meus dados',
            changePassword: 'Trocar minha senha',
            signature: 'Assinatura',
            myPlan: 'Meu plano',
            paymentMethods: 'Formas de pagamento',
            unsubscribe: 'Cancelar assinatura',
            otherLinks: 'Outros links',
            signOut: 'Sair da conta',
            plan: {
                month: 'Plano Mensal',
                semiannual: 'Plano Semestral',
                yearly: 'Plano Anual'
            },
            support: {
                title: 'Suporte',
                success: 'Mensagem enviada com sucesso',
                error: 'Falha ao enviar mensagem'
            }
        }
    },
    classroom: {
        document: {
            bookmark: 'Favoritar Material'
        },
        video: {
            rate: 'Avaliar aula:'
        },
        quiz: {
            bookmark: 'Favoritar Questão',
            questionMap: 'Mapa de questões',
            question: 'Questão'
        }
    },
    questionsDatabase: {
        filter: {
            header: {
                title: 'Banco de Questões',
                subtitle: 'Preencha os filtros de sua preferência',
                actions: {
                    start: 'Iniciar prática',
                    historic: 'Histórico'
                }
            },
            subheader: 'Preencha os filtros de sua preferência',
            course: {
                labelSelecteds: 'Cursos',
                placeholder: 'Escolher curso',
                filterName: 'Curso'
            },
            theme: {
                labelSelecteds: 'Temas',
                placeholder: 'Escolher tema',
                filterName: 'Tema',
                selectCourses: 'Escolha primeiro um curso'
            }
        },
        question: {
            saveQuestion: 'Favoritar Questão',
            seeFilters: 'Ver filtros',
            corrects: 'Corretas',
            wrong: 'Erradas',
            skipped: 'Puladas',
            continue: 'Continuar',
            failHandleBookmark: 'Ocorreu um erro ao favoritar questão.',
            failReplyQuestion: 'Ocorreu um erro ao responder questão.',
            failLoadQuestions: 'Ocorreu um erro ao carregar questões.',
            empty:
                'Ops, não foram encontradas questões com os filtros atuais. Clique em "Ver Filtros" e tente novamente utilizando novos',
            endPractice: {
                button: 'Encerrar prática',
                modal: {
                    title: 'Ops! Nenhuma questão foi respondida.',
                    subtitle:
                        'Que tal aprimorar seus conhecimentos reiniciando a prática?',
                    close: 'Encerrar',
                    restart: 'Reiniciar prática'
                }
            },
            exit: {
                title: 'Ops! Você está saindo da prática.',
                subtitle: 'Deseja realmente encerrar a prática?'
            },
            title: 'Questão'
        },
        finished: {
            title: 'Resultado',
            questionsDatabase: 'Banco de questões'
        }
    },
    search: {
        title: 'Olá, {{name}}. Bem-vindo ao SanarFlix!',
        subtitle:
            'Nós temos milhares de conteúdos de medicina que se encaixam no seu perfil. O que você quer aprender hoje?'
    },
    searchResult: {
        title: 'Resultado da busca',
        subtitle: 'Acesse a todos os resultados ou faça uma nova busca'
    },
    sigmentManagement: {
        email: 'Escreva aqui o seu e-mail pessoal',
        nameLabel: 'Nome completo',
        name: 'Escreva aqui o seu nome completo',
        selectReason: 'Selecione o motivo',
        writeReasonLabel: 'Qual o motivo você escolheu a nota acima?',
        writeReason: 'Escreva seu motivo aqui',
        writeReasonToPauseLabel: 'Por que você quer pausar a sua assinatura?',
        writeReasonToPause: 'Selecione o motivo',
        typePasswordLabel: 'Confirme a sua senha',
        typePassword: 'Digite aqui a sua senha',
        selectPeriodLabel: 'Qual é o seu período na graduação?',
        selectPeriod: 'Selecione aqui o período',
        selectCancelReasonLabel: 'Qual o motivo do cancelamento?',
        selectCancelReason: 'Selecione o motivo',
        selectCancelReasonRM:
            'A <strong>Sanar Residência Médica</strong> tem os cursos preparatórios perfeitos para você médica dos seus sonhos.',
        causeObservation: 'Escreva seu motivo aqui',
        recommend: 'Quanto você recomendaria o SanarFlix a um amigo?',
        howMuchTimeLabel: 'Por quanto tempo você quer pausar?',
        formedResident: 'Formado (Residente)',
        formedActing: 'Formado (Atuando)',
        howMuchTime: {
            key: 'howMuchTime',
            keyWithCount: '{{count}} mês',
            keyWithCount_plural: '{{count}} meses'
        },
        confirmPause: 'Confirmar pausa',
        confirmCancel: 'Confirmar cancelamento',
        cancelPage: {
            header: 'Cancelar Assinatura',
            subtitle: 'Formulário de cancelamento',
            doYouWant: 'Quer mesmo cancelar?',
            doYouWantSubtitle1: 'No Sanarflix você pode pausar sua assinatura!',
            doYouWantSubtitle2:
                'Com a pausa você não paga por até 3 meses e volta quando quiser!',
            doYouWantExtra: 'Pausar',
            modal: {
                title: 'Cancelamento confirmado',
                description1:
                    'Seu pedido está sendo processado e sua assinatura será cancelada dentro de algumas horas.',
                description2:
                    'Esperamos que sua experiência SanarFlix tenha sido proveitosa.',
                ok: 'Certo, entendi'
            },
            notice: {
                header: 'Fique atento às seguintes informações:',
                item1:
                    ' O seu acesso será suspenso e as cobranças futuras serão canceladas em até 48h.',
                item2:
                    ' Se você possui um plano semestral ou anual, será cobrada uma taxa rescisória de 25% sobre as cobranças futuras caso solicite o cancelamento após os 7 dias de período gratuito.',
                knowMore: 'Saiba mais'
            }
        },
        pausePage: {
            header: 'Pausar Assinatura',
            subtitle: 'Preencha o formulário para pausar',
            completeFields: 'Preencha os campos abaixo para continuar:',
            toComplete:
                'Para completar sua solicitação de pausa responda nossa pesquisa.',
            completeAll: 'Todos os campos de preenchimento são obrigatórios.',
            notice: {
                header: 'Fique atento às seguintes informações:',
                item1:
                    ' A pausa é permitida apenas para assinantes do Plano Mensal.',
                item2:
                    'Dentro de 48h pausaremos sua assinatura por até 3 meses. Sua assinatura voltará a ser cobrada após esse período, assim como seu acesso ao SanarFlix.'
            },
            modal: {
                title: 'Pausa confirmada',
                description1:
                    'Seu pedido está sendo processado e sua assinatura será pausada dentro de algumas horas.',
                description2:
                    'Esperamos que sua experiência SanarFlix tenha sido proveitosa!',
                ok: 'Certo, entendi'
            }
        }
    },
    paymentMethods: {
        title: 'Formas de pagamento',
        subtitle: 'Atualizar sua forma de pagamento',
        creditCard: {
            title: 'Atualizar forma de pagamento',
            subtitle: 'Cartão de Crédito',
            number: 'Número do Cartão',
            cvv: {
                title: 'CVV',
                tooltip:
                    '3 ou 4 números impressos no cartão de crédito. O CVV é um código de segurança contra fraudes em transações feitas na Internet.'
            },
            expiration: 'Data de Validade',
            month: 'Mês',
            year: 'Ano',
            name: 'Nome do Titular',
            confirm: 'Confirmar'
        }
    },
    account: {
        myData: {
            success: 'Dados salvos com sucesso',
            error: 'Falha ao salvar dados'
        },
        creditCard: {
            success: 'Dados salvos com sucesso',
            error: 'Falha ao salvar dados'
        }
    },
    changePassword: {
        feedback: {
            success: 'A sua senha foi atualizada com sucesso!'
        }
    },
    added: {
        title: 'Adicionados',
        totalItems: {
            key: 'totalItems',
            key_0: '0 itens adicionados recentemente',
            keyWithCount: '{{count}} item adicionado recentemente',
            keyWithCount_plural: '{{count}} itens adicionados recentemente'
        }
    },
    examFilter: {
        next: 'Próximo',
        back: 'Voltar',
        title: 'Filtros avançados',
        subtitle: 'Encontre outras provas utilizando os filtros avançados',
        submit: 'Buscar prova',
        college: {
            title: 'Faculdade',
            description:
                'Busque pela faculdade das provas que você quer treinar.',
            checkbox: 'Usar minha faculdade',
            select: 'Buscar outra faculdade'
        },
        subject: {
            title: 'Disciplina',
            description: 'Escolha as disciplinas que deseja se aprofundar',
            select: 'Buscar disciplina'
        },
        theme: {
            title: 'Tema',
            description:
                'Selecione os temas que mais correspondem com sua busca',
            select: 'Buscar tema'
        },
        semester: {
            title: 'Semestre',
            description:
                'Selecione o ano e semestre da prova que deseja estudar',
            select: 'Selecione o ano/semestre',
            checkbox: 'Selecionar todos'
        },
        simple: {
            title: 'Filtros selecionados',
            subtitle:
                'Aqui você pode editar os filtros escolhidos anteriormente',
            seeFilters: 'Ver filtros',
            closeFilters: 'Fechar filtros',
            saveFilter: 'Aplicar filtros'
        }
    }
}
