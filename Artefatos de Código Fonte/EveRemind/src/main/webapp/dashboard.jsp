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
                <div class="full-height" ng-style="createStyle(category.color)"></div>
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
                    <input class="spectrum-palette" ng-model="data.add.color" type="text" class="form-control">
                </div>
                <button type="button" class="btn btn-default" ng-click="cancelAddCategory()">{{'dashboard.newCategory.cancel' | translate }}</button>
                <button type="button" class="btn btn-dark float-right" ng-click="saveAddCategory()">{{'dashboard.newCategory.save' | translate }}</button>
            </div>
        </div>
    </div>
</t:layout>