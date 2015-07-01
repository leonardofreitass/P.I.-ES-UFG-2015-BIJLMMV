/* 
 * The MIT License
 *
 * Copyright 2015 Leonardo.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* global angular */

angular.module('everemindApp').config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('pt-BR', {
            pages: {
                titles: {
                    index: "Index",
                    signup: "Cadastro",
                    dashboard: "Início",
                    listView: "Lista",
                    calendarView: "Calendario",
                    account: "Conta",
                    passwordRecovery: "Recuperação de Senha",
                    emailVerification: "Verificação de Email"
                }
            },
            home: {
                mainTitle: "Organize sua rotina.",
                mainText: "Com o EveRemind, suas tarefas e responsabilidades são sempre rastreadas, " +
                        " eliminando suas preocupações em esquecê-las e aumentando sua produtividade.",
                createAccount: "Comece a lembrar criando sua conta abaixo.",
                register: "Registre-se",
                forgot: "Esqueceu sua senha?",
                modalTitle: "Solicitar Recuperação de Senha",
                email: "Email",
                obs: "*Seu email deve estar verificado para que você possa recuperar sua senha.",
                send: "Recuperar",
                sucessfulSend: "Uma mensagem com instruções para a redefinição de sua senha foi enviada para email informado.",
                errorSend: "O email informado não pertence a uma conta ou não está verificado."
            },
            signup: {
                title: "Nova Conta",
                textA: "Por favor preencha o formulário abaixo para registrar uma nova conta para usar o EveRemind.",
                textB: "É fácil, prático e rápido!",
                name: "Nome",
                email: "Email",
                password: "Senha",
                repeatPassword: "Repita a Senha",
                finish: "Obter Minha Conta",
                confirmEmail: "Uma mensagem de verificação será enviada para o email informado. Verificar seu email" +
                        " habilita as funcionalidades de notificação de tarefa e recuperação de senha",
                errors: {
                    required: "Por favor preencha todos os campos.",
                    notMatch: "As senhas informadas não são iguais.",
                    registered: "O e-mail informado já foi registrado em outra conta.",
                    passwordRegex: "Uma senha válida possui um mínimo de 8 caracteres entre" +
                            " letras e números com pelo menos uma letra e um número.",
                    notAnEmail: "O e-mail informado náo é válido."
                },
                success: "Ótimo! Sua nova conta está pronta para uso."
            },
            navbar: {
                errors: {
                    auth: "E-mail e senha informados não são correspondentes ou não são registrados.",
                    requiredEmail: "Informe seu e-mail.",
                    requiredPassword: "Informe sua senha.",
                    notAnEmail: "O e-mail informado náo é válido."
                },
                menu: {
                    colapsedMenu: "Abrir Navegação",
                    dashboard: "Início",
                    view: "Visualizar",
                    listView: "Lista",
                    calendarView: "Calendario",
                    account: "Conta",
                    exit: "Sair",
                    email: "E-mail",
                    password: "Senha",
                    login: "Entrar"
                },
                verifyEmail: "Seu email ainda não foi verificado. Verifique-o seguindo as instruções contidas" +
                        " na mensagem enviada para ele para utilizar os serviços de notificação de atividade e redefinição de senha.",
                logout1: "Tchau, {{name}}",
                logout2: "Até breve, {{name}}",
                logout3: "Tenha um bom dia, {{name}}",
                login1: "Olá, {{name}}",
                login2: "Como vai, {{name}}?",
                login3: "Bem vindo, {{name}}"
            },
            dashboard: {
                newCategory: {
                    name: "Nome da Categoria",
                    color: "Cor da Categoria",
                    cancel: "Cancelar",
                    save: "Salvar"
                },
                editCategory: {
                    name: "Novo Nome da Categoria",
                    color: "Nova Cor da Categoria",
                    cancel: "Cancelar",
                    save: "Salvar"
                },
                deleteCategory: {
                    cancel: "Cancelar",
                    doDelete: "Excluir",
                    modalTitle: "Excluindo a categoria <strong>{{category}}</strong>",
                    modalText: "Excluir a categoria <strong>{{category}}</strong> também exclui" +
                            " todas as atividades relacionadas. Deseja prosseguir?"
                },
                addActivity: {
                    modalTitle: "Nova atividade na categoria <strong>{{category}}</strong>",
                    title: "Nome",
                    description: "Descrição",
                    priority: "Prioridade",
                    priorities: {
                        low: "Baixa",
                        mid: "Média",
                        high: "Alta",
                        critical: "Crítico"
                    },
                    date: "Data",
                    time: "Hora",
                    notify: "Notificação por e-mail",
                    on: "Ligado",
                    off: "Desligado",
                    cancel: "Cancelar",
                    create: "Criar"
                },
                showActivity: {
                    modalTitle: "<strong>{{category}}</strong> | {{activity}}",
                    cancel: "Cancelar",
                    delete: "Excluir",
                    edit: "Editar",
                    update: "Salvar Alterações",
                    setDone: "Marcar como Feito"
                },
                tooltips: {
                    markDone: "Marcar como feito é irreversível. Isto irá desativar as" +
                            " notificações por email desta atividade e ela não estará mais disponível na dashboard.",
                    addCategory: "Adicionar categoria de atividades",
                    editCategory: "Editar categoria",
                    deleteCategory: "Excluir categoria",
                    addActivity: "Adicionar uma nova atividade",
                    priorityHelpTitle: "<p align='justify'>A escolha de prioridade afeta o comportamento da notificação por email da seguinte forma:</p>",
                    priorityHelp: "<p align='left'><strong class='span-primary'>Baixa:</strong> Emails enviados semanalmente, a 1 dia e a 1 hora da data/hora.<br>" +
                            "<strong class='span-success'>Média:</strong> Emails enviados a cada 3 dias, 1 dia, a 6 e a 1 da data/hora.<br>" +
                            "<strong class='span-warning'>Alta:</strong> Emails enviados diariamente, a 6, a 3 e a 1 hora da data/hora.<br>" +
                            "<strong class='span-danger'>Crítico:</strong> Emails enviados a cada 12 horas, a 6, a 3 e a 1 hora da data/hora.</p>"
                },
                errors: {
                    change: "Nenhuma alteração foi realizada.",
                    invalidTime: "Hora inválida.",
                    minSpace: "A ocorrência de uma atividade deve ser a pelo menos 1 hora do instante atual," +
                            " ou seja, {{minDateTime}}.",
                    addCategoryName: "O nome da categoria está vazio.",
                    alreadyRegistered: "Este nome esté em uso por outra categoria.",
                    editingCategory: "Por favor termine de editar uma categoria antes de começar a editar outra.",
                    addActivityInput: "Por favor preencha todos os campos.",
                    addActivityLength: "O nome da atividade é limitado em 80 caracteres.",
                    addCategoryLength: "O nome da categoria é limitado em 20 caracteres."
                },
                addCategory: "Categoria criada.",
                editCategoryMsg: "Categoria modificada.",
                deleteCategoryMsg: "Categoria excluída.",
                createdActivity: "Atividade criada.",
                updatedActivity: "Atividade modificada.",
                deleteActivityMsg: "Atividade excluída.",
                markDoneActivityMsg: "Atividade foi marcada como feita."
            },
            listView: {
                categories: "Categorias",
                activities: "Atividades",
                allCategory: "Todas as categorias",
                actions: "Ações",
                orderingBy: "Ordenando por ",
                dateTime: "Data/Hora",
                at: "as",
                stat: "Status",
                sortBy: {
                    label: "Ordernar por ",
                    date: "Data",
                    priority: "Prioridade"
                },
                status: {
                    done: "Atividade concluida",
                    expired: "Atividade expirada",
                    inTime: "Atividade em andamento"
                },
                showDone: "Mostrar atividades concluidas",
                notShowDone: "Esconder atividades concluidas",
                showExpired: "Mostrar atividades expiradas",
                notShowExpired: "Esconder atividades expiradas"
            },
            calendarView: {
                months: {
                    jan: "Janeiro",
                    feb: "Fevereiro",
                    mar: "Março",
                    apr: "Abril",
                    may: "Maio",
                    jun: "Junho",
                    jul: "Julho",
                    aug: "Agosto",
                    sep: "Setembro",
                    oct: "Outubro",
                    nov: "Novembro",
                    dec: "Dezembro"
                },
                days: {
                    sun: "Domingo",
                    mon: "Segunda",
                    tue: "Terça",
                    wed: "Quarta",
                    thu: "Quinta",
                    fri: "Sexta",
                    sat: "Sábado"
                },
                colorBy: "Mostrar cor da atividade por",
                showingBy: "Mostrando atividades por cor da",
                category: "Categoria",
                priority: "Prioridade",
                previous: "Semana Anterior",
                today: "Visualizar Hoje",
                next: "Próxima Semana",
                activity: "<p align='left'><b>Hora:</b> {{hour}}<br><b>Prioridade:</b> {{priority}}<br><b>Descrição:</b> {{description}}</p>"
            },
            verifyEmail: {
                title: "Verificar email",
                email: "Email",
                token: "Código de Verificação",
                verify: "Verificar",
                empty: "Por favor preencha todos os campos.",
                checkError: "O email/token não existe ou o email já foi verificado.",
                finishedVerify: "Email verificado com sucesso."
            },
            passwordRecover: {
                title: "Recuperar Senha",
                email: "Email",
                token: "Código de Recuperação",
                proceed: "Prosseguir",
                empty: "Por favor preencha todos os campos.",
                checkError: "Email/código não existente ou já foi usado.",
                newPassword: "Nova Senha",
                repeatNewPassword: "Repita a Nova Senha",
                reset: "Redefinir Senha",
                finishedVerify: "Senha atualizada com sucesso."
            },
            account: {
                success: "Os dados da conta foram atualizados.",
                passwordSuccess: "A senha foi atualizada.",
                delete: "Sua conta foi excluida. Espero que volte algum dia, amigo.",
                title: "Editar informações da conta",
                name: "Nome",
                email: "Email",
                password: "Senha",
                save: "Salvar Modificações",
                changePassword: "Mudar Senha",
                deleteAccount: "Deletar Conta",
                cancel: "Cancelar",
                confirmEmail: "Modificar o e-mail implica em refazer a verificação.",
                confirmed: "E-mail verificado.",
                notConfirmed: "Verificação pendente. Clique para reenviar o email de verificação.",
                resentToken: "O código foi reenviado para o seu email.",
                modalPassword: {
                    title: "Modificar Senha",
                    currentPassword: "Senha Atual",
                    newPassword: "Nova Senha",
                    repeatNewPassword: "Repita a Nova Senha",
                    save: "Salvar"
                },
                modalDelete: {
                    title: "Excluir Conta",
                    text: "Ao excluir sua conta, todas as informações vinculadas à ela" +
                            " serão excluidas também. Se deseja continuar, informe seu email e sua senha abaixo.",
                    email: "Email",
                    password: "Senha",
                    exclude: "Excluir Conta"
                },
                errors: {
                    required: "Por favor preencha todos os campos.",
                    change: "Nenhuma alteração foi realizada.",
                    auth: "A senha atual está incorreta.",
                    authDelete: "O email e a senha não correspondem.",
                    notUser: "Este não é o seu endereço de email.",
                    samePassword: "A nova senha informada é a mesma que a senha atual.",
                    notAnEmail: "O e-mail informado náo é válido.",
                    resendToken: "Não foi possível reenviar o código de verificação pois o email já foi verificado."
                }
            },
            general: {
                notifications: {
                    notAuthorized: "Você precisa entrar em uma conta para acessar essa página."
                }
            }
        });
    }]);