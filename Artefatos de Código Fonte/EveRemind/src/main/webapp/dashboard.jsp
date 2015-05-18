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
            <div ng-repeat="category in data.categories" class="dashboard-column category-column" ng-style="createStyle(category.color)">
                {{category.name}}
            </div>
            <div ng-if="!data.adding" class="dashboard-column add-category-column">
                <div class="close add-category" ng-click="addCategory()" data-toggle="tooltip" data-placement="right" title="{{'dashboard.tooltips.addCategory' | translate}}">
                    <span class="add-category-button glyphicon glyphicon-plus"></span>
                </div>
            </div>
            <div ng-if="data.adding" ng-init="loadJQuery()" class="dashboard-column new-category-column" ng-style="data.add.style">
                <div class="form-group">
                    <label>Nome da Categoria</label>
                    <input ng-model="data.add.name" type="text" class="form-control">
                </div>
                <div class="form-group">
                    <label>Cor da Categoria</label>
                    <br>
                    <input class="spectrum-palette" ng-model="data.add.color" type="text" class="form-control">
                </div>
                <button type="button" class="btn btn-default" ng-click="cancelAddCategory()">Cancelar</button>
                <button type="button" class="btn btn-dark float-right" ng-click="saveAddCategory()">Salvar</button>
            </div>
        </div>
    </div>
</t:layout>