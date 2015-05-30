<%-- 
    Document   : dashboard
    Created on : 17/05/2015, 04:29:29
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:layout pageID="dashboard">
    <div class="dashboard" ng-init='getUserCategories()'>
        <div class="table-row">
            <div ng-repeat="category in data.categories" ng-click="clickCategory($index)" ng-mouseenter="enterCategory($index)" ng-mouseleave="leaveCategory($index)" class="dashboard-column category-column cursor-pointer" ng-class="{'minimized-column': !isMaximized($index), 'maximized-column': isMaximized($index)}">
                <div class="category-title" ng-class="{'minimized-column': !isMaximized($index), 'maximized-column': isMaximized($index)}">
                    <label class="cursor-pointer">{{category.name}}</label>
                </div>
                <div class="full-height" ng-style="getCategoryColor($index)">
                    <div ng-show="isMaximized($index)" ng-init='loadJQuery()'>
                        <div ng-show="data.editing !== $index" class="row">
                            <div class="col-md-6 no-right-padding">
                                <button type="button" class="btn btn-dark" ng-click="openEditing($index)">
                                    <span class="glyphicon glyphicon-pencil"></span>
                                </button>
                            </div>
                            <div class="col-md-6 no-left-padding">
                                <button type="button" class="btn btn-dark" ng-click="openDeleting($index)" data-toggle="modal" data-target="#modalDelete">
                                    <span class="glyphicon glyphicon-trash"></span>
                                </button>
                            </div>
                        </div>
                        <div ng-show="data.editing === $index">
                            <div class="form-group">
                                <label class="bordered-text">{{'dashboard.editCategory.name' | translate }}</label>
                                <input ng-model="data.edit.name" type="text" class="form-control">
                            </div>
                            <div class="form-group">
                                <label class="bordered-text">{{'dashboard.editCategory.color' | translate }}</label>
                                <br>
                                <input ng-attr-id="{{'editColor' + $index}}" class="spectrum-palette" ng-model="data.edit.color" type="text" class="form-control">
                            </div>
                            <button type="button" class="btn btn-default" ng-click="openEditing($index)">{{'dashboard.editCategory.cancel' | translate }}</button>
                            <button type="button" class="btn btn-dark float-right" ng-click="editCategory($index)">{{'dashboard.editCategory.save' | translate }}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div ng-show="!data.adding" class="add-category-column">
                <div class="close close-color-override add-category" ng-click="addCategory()" data-toggle="tooltip" data-placement="right" title="{{'dashboard.tooltips.addCategory' | translate}}">
                    <span class="add-category-button glyphicon glyphicon-plus"></span>
                </div>
            </div>
            <div ng-show="data.adding" class="dashboard-column new-category-column" ng-style="data.add.style">
                <div class="form-group">
                    <label class="bordered-text">{{'dashboard.newCategory.name' | translate }}</label>
                    <input ng-model="data.add.name" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label class="bordered-text">{{'dashboard.newCategory.color' | translate }}</label>
                    <br>
                    <input ng-init="loadJQuery()" class="spectrum-palette" ng-model="data.add.color" type="text" class="form-control">
                </div>
                <button type="button" class="btn btn-default" ng-click="cancelAddCategory()">{{'dashboard.newCategory.cancel' | translate }}</button>
                <button type="button" class="btn btn-dark float-right" ng-click="saveAddCategory()">{{'dashboard.newCategory.save' | translate }}</button>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel" ng-bind-html="'dashboard.deleteCategory.modalTitle' | translate:data.modalData | html"></h4>
                </div>
                <div class="modal-body">
                    <h4 ng-bind-html="'dashboard.deleteCategory.modalText' | translate:data.modalData | html"></h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{'dashboard.deleteCategory.cancel' | translate}}</button>
                    <button type="button" class="btn btn-danger" ng-click="deleteCategory()">{{'dashboard.deleteCategory.doDelete' | translate}}</button>
                </div>
            </div>
        </div>
    </div>
</t:layout>