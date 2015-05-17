<%-- 
    Document   : signup
    Created on : 15/05/2015, 23:02:33
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:layout pageID="signup">
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="jumbotron custom-secondary-background-color">
                    <div class="page-header">
                        <h3>Cadastrar-se<br><small>Preencha o formulário abaixo e crie imediatamente uma conta no nosso sistema.<br>É fácil, prático e rápido!</small></h3>
                    </div>
                    <form>
                        <div class="form-group">
                            <label>Nome Completo</label>
                            <input ng-model="data.fullName" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input ng-model="data.email" type="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Email Secundario</label>
                            <input ng-model="data.secondaryEmail" type="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Senha</label>
                            <input ng-model="data.password" type="password" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Senha</label>
                            <input ng-model="data.passwordAgain" type="password" class="form-control">
                        </div>
                        <button class="btn btn-warning" ng-click="signup()">Finalizar Cadastro</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</t:layout>