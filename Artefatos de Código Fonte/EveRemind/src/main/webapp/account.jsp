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
                        <h3>Editar informações da conta</h3>
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
                        <button class="btn btn-warning" ng-click="update()">Salvar Modificações</button>
                        <hr class="custom-primary-hr">
                        <div class="form-group">
                            <label>Senha</label>
                            <input ng-model="data.password" type="password" class="form-control" disabled>
                        </div>
                        <button class="btn btn-dark" data-toggle="modal" data-target="#modalPassword">Mudar Senha</button>
                        <hr class="custom-primary-hr">
                        <button class="btn btn-danger" data-toggle="modal" data-target="#modalDelete">Deletar Conta</button>
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
                    <h4 class="modal-title" id="myModalLabel">Modificar Senha</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Senha Atual</label>
                        <input ng-model="data.currentPassword" type="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Nova Senha</label>
                        <input ng-model="data.newPassword" type="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Repita a Nova Senha</label>
                        <input ng-model="data.repeatNewPassword" type="password" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-dark" ng-click="updatePassword()">Salvar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">Excluir Conta</h4>
                </div>
                <div class="modal-body">
                    <h4>Ao excluir sua conta, todas as informações vinculadas à ela serão excluidas também. Se deseja continuar, informe seu email e sua senha abaixo.</h4>
                    <br>
                    <div class="form-group">
                        <label>Email</label>
                        <input ng-model="data.delete.email" type="email" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Senha</label>
                        <input ng-model="data.delete.password" type="password" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" ng-click="deleteUser()">Excluir Conta</button>
                </div>
            </div>
        </div>
    </div>
</t:layout>