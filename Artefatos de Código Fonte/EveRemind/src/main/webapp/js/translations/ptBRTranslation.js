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
                account: "Conta"
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
            secondaryEmail: "Email Secundario",
            password: "Senha",
            repeatPassword: "Repita a Senha",
            finish: "Finalizar Cadastro",
            errors: {
                blank: "Preencha todos os campos!",
                notMatch: "As senhas informadas não são iguais!",
                registered: "O e-mail informado já foi registrado!",
                sameEmail: "O e-mail principal e secundário devem ser diferentes."
            },
            success: "Usuario cadastrado com sucesso!"
        },
        navbar: {
            errors: {
                auth: "E-mail e senha informados não correspondem!"
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
            tooltips: {
                addCategory: "Adicionar categoria de atividades"
            },
            errors: {
                addCategoryName: "Insira o nome da categoria.",
                alreadyRegistered: "Uma categoria com este nome já foi cadastrada!"
            },
            addCategory: "Categoria criada!"
        },
        account: {
            success: "Usuario modificado!",
            passwordSuccess: "Senha modificada!",
            delete: "Sua conta foi excluida.",
            title: "Editar informações da conta",
            fullName: "Nome Completo",
            email: "Email",
            secondaryEmail: "mail Secundario",
            password: "Senha",
            save: "Salvar Modificações",
            changePassword: "Mudar Senha",
            deleteAccount: "Deletar Conta",
            cancel: "Cancelar",
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
                auth: "A senha atual está incorreta!",
                authDelete: "O email e a senha não correspondem!",
                notUser: "Este não é o seu endereço de email!",
                samePassword: "A nova senha informada é a mesma que a senha atual."
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