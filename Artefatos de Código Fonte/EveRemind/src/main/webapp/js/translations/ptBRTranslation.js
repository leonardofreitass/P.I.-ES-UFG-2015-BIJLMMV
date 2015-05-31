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
    $translateProvider.translations('ptBR', {
        pages: {
            titles: {
                index: "Index",
                signup: "Cadastro",
                dashboard: "Dashboard",
                account: "Conta",
                primaryEmailVerification: "Verificação de Email",
                secondaryEmailVerification: "Verificação de Email"
            }
        },
        home: {
            mainTitle: "Organize seu dia!",
            mainText: "Com o EveRemind, você nunca mais irá esquecer de suas tarefas, diminuindo sua preocupação e aumentando sua produtividade!",
            createAccount: "Crie sua conta agora!",
            register: "Registre-se"
        },
        signup: {
            title: "Cadastrar-se",
            textA: "Preencha o formulário abaixo e crie imediatamente uma conta no nosso sistema.",
            textB: "É fácil, prático e rápido!",
            fullName: "Nome Completo",
            email: "Email",
            secondaryEmail: "Email Secundário",
            password: "Senha",
            repeatPassword: "Repita a Senha",
            finish: "Finalizar Cadastro",
            confirmEmail: "A confirmação dos e-mails é necessária para aproveitar integralmente as funcionalidades do nosso sistema.",
            errors: {
                required: "Preencha todos os campos.",
                notMatch: "A duplicação de senhas não corresponde.",
                registered: "O e-mail informado já foi registrado.",
                sameEmail: "O e-mail principal e secundário devem ser diferentes.",
                passwordLength: "A senha deve possuir entre 6 e 20 caracteres.",
                notAnEmail: "O e-mail informado náo é válido.",
                notASecondaryEmail: "O e-mail secundário informado náo é válido."
            },
            success: "Usuario cadastrado com sucesso!"
        },
        navbar: {
            errors: {
                auth: "E-mail e senha informados não correspondem!",
                requiredEmail: "Informe seu e-mail.",
                requiredPassword: "Informe sua senha.",
                notAnEmail: "O e-mail informado náo é válido."
            },
            menu: {
                colapsedMenu: "Abrir Navegação",
                dashboard: "Dashboard",
                account: "Conta",
                exit: "Sair",
                email: "E-mail",
                password: "Senha",
                login: "Entrar"
            },
            verifyPrimary: "Você ainda não fez a confirmação de seu e-mail principal. Faça-a para desfruir totalmente de nossos serviços.",
            verifySecondary: "Você ainda não fez a confirmação de seu e-mail secundario. Faça-a para desfruir totalmente de nossos serviços.",
            logout: "Logout realizado!",
            login: "Login realizado!"
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
                modalText: "Ao excluir a categoria <strong>{{category}}</strong> você excluirá tambem todas as atividades cadastradas nesta categoria, deseja mesmo excluir?"
            },
            tooltips: {
                addCategory: "Adicionar categoria de atividades"
            },
            errors: {
                addCategoryName: "Insira o nome da categoria.",
                alreadyRegistered: "Uma categoria com este nome já foi cadastrada!",
                editingCategory: "Termine de editar uma categoria antes de começar a editar outra."
            },
            addCategory: "Categoria criada!",
            editCategoryMsg: "Categoria editada!",
            deleteCategoryMsg: "Categoria excluída!"
        },
        verifyEmail: {
            primary: {
                title: "Verificar email principal",
                email: "Email Principal"
            },
            secondary: {
                title: "Verificar email secundario",
                email: "Email Secundario"
            },
            token: "Código de Verificação",
            verify: "Verificar",
            empty: "Preencha todos os campos",
            checkError: "O email/token não existe ou o email já foi verificado.",
            finishedVerify: "Email verificado com sucesso!"
        },
        account: {
            success: "Usuario modificado!",
            passwordSuccess: "Senha modificada!",
            delete: "Sua conta foi excluida.",
            title: "Editar informações da conta",
            fullName: "Nome Completo",
            email: "Email",
            secondaryEmail: "E-mail Secundario",
            password: "Senha",
            save: "Salvar Modificações",
            changePassword: "Mudar Senha",
            deleteAccount: "Deletar Conta",
            cancel: "Cancelar",
            confirmEmail: "Modificar o e-mail implica em refazer a verificação.",
            modalPassword: {
                title: "Modificar Senha",
                currentPassword: "Senha Atual",
                newPassword: "Nova Senha",
                repeatNewPassword: "Repita a Nova Senha",
                save: "Salvar"
            },
            modalDelete: {
                title: "Excluir Conta",
                text: "Ao excluir sua conta, todas as informações vinculadas à ela serão excluidas também. Se deseja continuar, informe seu email e sua senha abaixo.",
                email: "Email",
                password: "Senha",
                exclude: "Excluir Conta"
            },
            errors: {
                required: "Preencha todos os campos.",
                auth: "A senha atual está incorreta!",
                authDelete: "O email e a senha não correspondem!",
                notUser: "Este não é o seu endereço de email!",
                samePassword: "A nova senha informada é a mesma que a senha atual.",
                sameEmail: "O e-mail principal e secundário devem ser diferentes.",
                notAnEmail: "O e-mail informado náo é válido.",
                notASecondaryEmail: "O e-mail secundário informado náo é válido."
            }
        },
        general: {
            notifications: {
                notAuthorized: "Você não pode acessar esta página!"
            }
        }
    });

    $translateProvider.preferredLanguage('ptBR');
}]);