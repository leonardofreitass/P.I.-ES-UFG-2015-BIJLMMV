<%-- 
    Document   : account
    Created on : 17/05/2015, 17:04:53
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:layout pageID="account">
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="jumbotron custom-secondary-background-color">
                    <div class="page-header">
                        <h3>{{'account.title' | translate}}</h3>
                    </div>
                    <form>
                        <div class="form-group">
                            <label>{{'account.fullName' | translate}}</label>
                            <input ng-model="data.fullName" type="text" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>{{'account.email' | translate}}</label>
                            <input ng-model="data.email" type="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>{{'account.secondaryEmail' | translate}}</label>
                            <input ng-model="data.secondaryEmail" type="email" class="form-control">
                        </div>
                        <button class="btn btn-warning" ng-click="update()">{{'account.save' | translate}}</button>
                        <hr class="custom-primary-hr">
                        <div class="form-group">
                            <label>{{'account.password' | translate}}</label>
                            <input ng-model="data.password" type="password" class="form-control" disabled>
                        </div>
                        <button class="btn btn-dark" data-toggle="modal" data-target="#modalPassword">{{'account.changePassword' | translate}}</button>
                        <hr class="custom-primary-hr">
                        <button class="btn btn-danger" data-toggle="modal" data-target="#modalDelete">{{'account.deleteAccount' | translate}}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalPassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">{{'account.modalPassword.title' | translate}}</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>{{'account.modalPassword.currentPassword' | translate}}</label>
                        <input ng-model="data.currentPassword" type="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>{{'account.modalPassword.newPassword' | translate}}</label>
                        <input ng-model="data.newPassword" type="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>{{'account.modalPassword.repeatNewPassword' | translate}}</label>
                        <input ng-model="data.repeatNewPassword" type="password" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{'account.cancel' | translate}}</button>
                    <button type="button" class="btn btn-dark" ng-click="updatePassword()">{{'account.modalPassword.save' | translate}}</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">{{'account.modalDelete.title' | translate}}</h4>
                </div>
                <div class="modal-body">
                    <h4>{{'account.modalDelete.text' | translate}}</h4>
                    <br>
                    <div class="form-group">
                        <label>{{'account.modalDelete.email' | translate}}</label>
                        <input ng-model="data.delete.email" type="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>{{'account.modalDelete.password' | translate}}</label>
                        <input ng-model="data.delete.password" type="password" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{'account.cancel' | translate}}</button>
                    <button type="button" class="btn btn-danger" ng-click="deleteUser()">{{'account.modalDelete.exclude' | translate}}</button>
                </div>
            </div>
        </div>
    </div>
</t:layout>