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
                <h3 class='no-margin-bottom'>{{'listView.categories'| translate}}</h3>
                <hr>
                <br>
                <div class="colored-btn-box">
                    <button class="btn btn-lg btn-colored btn-default" ng-click="data.loadCat = 'all'">{{'listView.allCategory'| translate}}</button>
                </div>
                <div class="colored-btn-box" ng-repeat="category in data.categories">
                    <button class="btn btn-lg btn-colored" ng-click="data.loadCat = category.name" ng-style="makeBtnStyle(category.color)">{{category.name}}</button>
                </div>
            </div>
            <div ng-class="{'hidden-element': !data.showActivities}" class="list-column">
                <div class="activity-label-action">
                    <span class="activity-label">
                       {{'listView.activities'| translate}}
                    </span>
                    <span class="activity-action">
                        <div class="dropdown inline-blocker">
                            <a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-default" data-target="#" href="/page.html">
                                {{'listView.actions'| translate }} <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                                <li class="dropdown-submenu">
                                    <a tabindex="-1" href="#">{{'listView.sortBy.label'| translate }}</a>
                                    <ul class="dropdown-menu">
                                        <li ng-click="data.sortBy = 'date'" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'listView.sortBy.date'| translate }}</a></li>
                                        <li ng-click="data.sortBy = 'priority'" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'listView.sortBy.priority'| translate }}</a></li>
                                    </ul>
                                </li>
                                <li ng-if="!data.showDone" ng-click="data.showDone = true" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'listView.showDone'| translate }}</a></li>
                                <li ng-if="data.showDone" ng-click="data.showDone = false" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'listView.notShowDone'| translate }}</a></li>
                                <li ng-if="!data.showOutOfDate" ng-click="data.showOutOfDate = true" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'listView.showExpired'| translate }}</a></li>
                                <li ng-if="data.showOutOfDate" ng-click="data.showOutOfDate = false" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'listView.notShowExpired'| translate }}</a></li>
                            </ul>
                        </div>
                    </span> 
                </div>
                <br>
                <hr>
                <div class="activity-date-time"><strong class="activity-time">{{'listView.orderingBy' | translate}}{{('listView.sortBy.' + data.sortBy) | translate}}</strong></div>
                <br>
                <div class="activity-box" ng-repeat="activity in data.activities"  ng-style="getPriorityColor(activity.priority, activity.idCategory, activity.done || activity.expired)" bs-dynamic-tooltip="getActivityTooltip(activity.done, activity.expired)" role="button">
                    <div class="activity-date-time">
                        <span class="activity-name">{{activity.name}}</span> 
                        <span ng-if="activity.done" class="activity-time glyphicon glyphicon-ok"></span>
                        <span ng-if="activity.expired && !activity.done" class="activity-time glyphicon glyphicon-warning-sign"></span>
                        <span ng-if="!activity.done && !activity.expired" class="activity-time glyphicon glyphicon-time"></span>
                    </div>
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
