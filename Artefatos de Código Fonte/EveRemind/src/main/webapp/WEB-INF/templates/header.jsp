
<%-- 
    Document   : header
    Created on : 14/05/2015, 01:45:47
    Author     : Leonardo

 /* global data */
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<nav class="navbar navbar-custom navbar-fixed-top">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand brand-top" ng-href="{{home}}"><img class="navbar-logo" src="img/eveRemind-navbar.png"/></a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav" ng-if="isLogged()">
                <li ng-class="{'active' : pageID == 'dashboard'}"><a href="dashboard.jsp">Dashboard <span class="sr-only">(current)</span></a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown" ng-if="isLogged()">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{getUserName()}} <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="account.jsp">Conta</a></li>
                        <li class="divider"></li>
                        <li><a ng-click="logout()" href="">Sair</a></li>
                    </ul>
                </li>
                <form class="navbar-form navbar-righ" ng-if="!isLogged()">
                    <div class="form-group">
                        <label for="nameLogin">E-mail</label>
                        <input ng-model="data.email" type="email" class="form-control" id="nameLogin">
                    </div>
                    <div class="form-group">
                        <label for="passwordLogin">Senha</label>
                        <input ng-model="data.password" type="password" class="form-control" id="passwordLogin">
                    </div>
                    <button type="submit" class="btn btn-dark" ng-click="login()">Entrar</button>
                </form>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>