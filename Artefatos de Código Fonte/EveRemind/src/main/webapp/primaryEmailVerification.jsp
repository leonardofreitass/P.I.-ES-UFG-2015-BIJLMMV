<%-- 
    Document   : primaryVerification
    Created on : 22/05/2015, 19:58:17
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:layout pageID="primaryEmailVerification">
    <div class="container">
        <div class="row">
            </br>
            </br>
            <div class="col-md-8 col-md-offset-2">
                <div class="jumbotron custom-secondary-background-color" ng-if="!data.verified">
                    <div class="page-header">
                        <h3>{{'verifyEmail.primary.title' | translate}}<br></h3>
                    </div>
                    <form>
                        <div class="form-group">
                            <label>{{'verifyEmail.primary.email' | translate}}</label>
                            <input ng-model="data.email" type="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>{{'verifyEmail.token' | translate}}</label>
                            <input ng-model="data.token" type="text" class="form-control">
                        </div>
                        <button class="btn btn-warning" ng-click="verify()">{{'verifyEmail.verify' | translate}}</button>
                    </form>
                </div>
                <div class="jumbotron custom-secondary-background-color" ng-if="data.verified">
                    <div class="page-header">
                        <h3><small>{{'verifyEmail.finishedVerify' | translate}}</small><br></h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</t:layout>