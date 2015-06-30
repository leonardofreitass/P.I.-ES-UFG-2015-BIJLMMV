<%-- 
    Document   : passwordRecovery
    Created on : 29/06/2015, 11:00:09
    Author     : Igor
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:layout pageID="passwordRecovery">
    <div class="container">
        <div class="row">
            </br>
            </br>
            <div class="col-md-8 col-md-offset-2">
                <div class="jumbotron custom-secondary-background-color" ng-if="!data.verified">
                    <div class="page-header">
                        <h3>{{'passwordRecover.title'| translate}}<br></h3>
                    </div>
                    <form>
                        <div class="form-group">
                            <label>{{'passwordRecover.email'| translate}}</label>
                            <input ng-model="data.email" type="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>{{'passwordRecover.token'| translate}}</label>
                            <input ng-model="data.token" type="text" class="form-control">
                        </div>
                        <button class="btn btn-warning" ng-click="recover()">{{'passwordRecover.proceed'| translate}}</button>
                    </form>
                </div>
                <div class="jumbotron custom-secondary-background-color" ng-if="data.verified">
                    MODAL PARA INSERIR NOVA SENHA.
                </div>
            </div>
        </div>
    </div>
</t:layout>
