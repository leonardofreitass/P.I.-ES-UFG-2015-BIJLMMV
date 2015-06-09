<%-- 
    Document   : listView
    Created on : 08/06/2015, 20:01:15
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:layout pageID="listView">
    <div ng-init="refreshCategories()" ng-hide="data.loadingCategories" class="list-table">
        <div class="list-row">
            <div class="list-column">
                <h4>{{'listView.categories' | translate}}</h4>
                <div class="colored-btn-box" ng-repeat="category in data.categories">
                    <button class="btn btn-lg btn-colored" ng-style="makeBtnStyle(category.color)">{{category.name}}</button>
                </div>
            </div>
            <div ng-class="{'hidden-element': !data.showActivities}" class="list-column">
                AEEEE
            </div>
            <div ng-class="{'hidden-element': !data.showOneActivity}" class="list-activity">
                AAAAA
            </div>
        </div>
    </div>
    
    <div class="loading" ng-if="data.loadingCategories">
</t:layout>
