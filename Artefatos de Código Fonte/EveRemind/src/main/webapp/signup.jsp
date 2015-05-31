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
                        <h3>{{'signup.title' | translate}}<br><small>{{'signup.textA' | translate}}<br>{{'signup.textB' | translate}}</small></h3>
                    </div>
                    <form name="forms.signupForm" novalidate>
                        <div class="form-group">
                            <label>{{'signup.fullName' | translate}}</label>
                            <input name="inputName" ng-model="data.fullName" type="text" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>{{'signup.email' | translate}}<sup>*</sup></label>
                            <input name="inputEmail" ng-model="data.email" type="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>{{'signup.secondaryEmail' | translate}}<sup>*</sup></label>
                            <input name="inputSecondaryEmail" ng-model="data.secondaryEmail" type="email" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>{{'signup.password' | translate}}</label>
                            <input name="inputPassword" ng-minlength="6" ng-maxlength="20" ng-model="data.password" type="password" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label>{{'signup.repeatPassword' | translate}}</label>
                            <input name="inputRepeatPassword" ng-minlength="6" ng-maxlength="20" ng-model="data.passwordAgain" type="password" class="form-control" required>
                        </div>
                        <small><sup>*</sup>{{'signup.confirmEmail' | translate}}</small>
                        </br></br>
                        <button class="btn btn-warning" ng-click="signup()">{{'signup.finish' | translate}}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</t:layout>