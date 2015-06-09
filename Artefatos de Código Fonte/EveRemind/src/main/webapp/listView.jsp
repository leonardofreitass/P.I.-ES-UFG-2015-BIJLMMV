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
                <h3>{{'listView.categories'| translate}}</h3>
                <br>
                <div class="colored-btn-box">
                    <button class="btn btn-lg btn-colored btn-default" ng-click="data.loadCat = 'all'">{{'listView.allCategory'| translate}}</button>
                </div>
                <div class="colored-btn-box" ng-repeat="category in data.categories">
                    <button class="btn btn-lg btn-colored" ng-click="data.loadCat = category.name" ng-style="makeBtnStyle(category.color)">{{category.name}}</button>
                </div>
            </div>
            <div ng-class="{'hidden-element': !data.showActivities}" class="list-column">
                <div class="dropdown">
                    <button class="btn btn-default dropdown-sort dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-expanded="true">
                        {{'listView.sortBy.label' | translate }}
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-sort" role="menu" aria-labelledby="dropdownMenu1">
                        <li ng-click="data.sortBy = 'date'" role="presentation"><a ng-class="{'bold': data.sortBy === 'date'}" role="menuitem" tabindex="-1" href="#">{{'listView.sortBy.date'| translate }}</a></li>
                        <li ng-click="data.sortBy = 'priority'" role="presentation"><a ng-class="{'bold': data.sortBy === 'priority'}" role="menuitem" tabindex="-1" href="#">{{'listView.sortBy.priority'| translate }}</a></li>
                    </ul>
                </div>
                <br><br>
                <div class="activity-box" ng-repeat="activity in data.activities" ng-style="getPriorityColor(activity.priority, activity.idCategory)" role="button" data-toggle="modal" data-target="#modalShowActivity">
                    <span class="activity-name">{{activity.name}}</span>
                    <div class="activity-date-time"><span class="activity-date">{{activity.date}}</span> <span class="activity-time">{{activity.time}}</span></div>
                    <br>
                </div>
            </div>
            <div ng-class="{'hidden-element': !data.showOneActivity}" class="list-activity">
                AAAAA
            </div>
        </div>
    </div>

    <div class="loading" ng-if="data.loadingCategories"></div>
</t:layout>
