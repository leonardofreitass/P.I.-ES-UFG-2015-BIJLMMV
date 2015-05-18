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
        signup: {
            errors: {
                blank: "Preencha todos os campos!",
                notMatch: "As senhas informadas não são iguais!",
                registered: "O e-mail informado já foi registrado!"
            },
            success: "Usuario cadastrado com sucesso!"
        },
        navbar: {
            errors: {
                auth: "E-mail e senha informados não correspondem!"
            },
            logout: "Logout realizado!",
            login: "Login realizado!"
        },
        dashboard: {
            tooltips: {
                addCategory: "Adicionar categoria de atividades"
            },
            errors: {
                addCategoryName: "Insira o nome da categoria."
            },
            addCategory: "Categoria criada!"
        },
        account: {
            success: "Usuario modificado!",
            passwordSuccess: "Senha modificada!",
            delete: "Sua conta foi excluida.",
            errors: {
                auth: "A senha atual está incorreta!",
                authDelete: "O email e a senha não correspondem!",
                notUser: "Este não é o seu endereço de email!"
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