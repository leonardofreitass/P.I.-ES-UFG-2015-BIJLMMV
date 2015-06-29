<%-- 
    Document   : index.jsp
    Created on : 14/05/2015, 01:34:51
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:layout pageID="index">
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img class="main-logo-img" src="img/eveRemindLogo(800).png"/>
            </div>
            <div class="col-md-6">
                <div class="page-header">
                    <h3>{{'home.mainTitle' | translate}}<br><small>{{'home.mainText' | translate}}<br><br>{{'home.createAccount' | translate}}<br><a type="submit" class="btn btn-warning" href="signup.jsp" role="button">{{'home.register' | translate}}</a></small></h3>
                    <br>
                    <a class="cursor-pointer" data-toggle="modal" data-target="#modalRecovery"><small>{{'home.forgot' | translate}}</small></a>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalRecovery" tabindex="-1" role="dialog" aria-labelledby="modalRecovery" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modalDeleteLabel" ng-bind-html="'home.modalTitle' | translate | html"></h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>{{'home.secondaryEmail' | translate}}<sup>*</sup>:</label>
                        <input name="inputSecondaryEmail" ng-model="data.secondaryEmail" type="email" class="form-control" required>
                    </div>
                    <label ng-bind-html="'home.obs' | translate | html"></label>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{'dashboard.deleteCategory.cancel'| translate}}</button>
                    <button type="button" class="btn btn-warning" ng-click="recover()">{{'home.send' | translate}}</button>
                </div>
            </div>
        </div>
    </div>
</t:layout>