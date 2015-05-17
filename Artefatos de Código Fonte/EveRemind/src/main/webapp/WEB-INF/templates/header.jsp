
<%-- 
    Document   : header
    Created on : 14/05/2015, 01:45:47
    Author     : Leonardo

 /* global data */
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<nav class="navbar navbar-default navbar-fixed-top">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.jsp">EveRemind</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav" ng-if="isLogged()">
                <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                <li><a href="#">Link</a></li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="#">Action</a></li>
                        <li><a href="#">Another action</a></li>
                        <li><a href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li><a href="#">Separated link</a></li>
                        <li class="divider"></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown" ng-if="isLogged()">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{getUserName()}} <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li><a href="">Conta</a></li>
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
                    <button type="submit" class="btn btn-success" ng-click="login()">Entrar</button>
                </form>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>