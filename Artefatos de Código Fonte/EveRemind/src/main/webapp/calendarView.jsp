<%-- 
    Document   : calendarView
    Created on : 22/06/2015, 00:12:20
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<%@taglib uri='http://ur6lad.co.ua/markdown-taglib' prefix ='md' %>
<t:layout pageID="calendarView">
    <div class="list-table" ng-init="refreshCategories()">
        <div class="list-row" ng-init="initWeeks()">
            <div class="list-column-thin">
                <h3 class='no-margin-bottom'>{{'listView.categories'| translate}}</h3>
                <hr class="custom-primary-hr">
                <br>
                <div class="colored-btn-box" ng-repeat="category in data.categories">
                    <button class="btn btn-lg btn-colored" ng-click="data.loadCat = category.name" ng-style="makeBtnStyle(category.color)">
                        <div class="activity-date-time">
                            <span class="activity-date">{{category.name}}</span> 
                            <span class="activity-time">
                                <span class="badge">{{category.badge}}</span>
                            </span>
                        </div>
                        <br>
                    </button>
                </div>
            </div>
            <div class="list-calendar">
                <div class="list-table">
                    <div class="calendar-header-row">
                        <div class="full-cell">
                            <h4>
                                <span class="calendar-title" ng-repeat="m in months">
                                    <span>{{('calendarView.months.' + m) | translate}}</span>
                                    <span ng-if="!$last"> / </span>
                                </span>
                            </h4>
                            <h4>
                                <span class="calendar-title" ng-repeat="y in years">
                                    <span>{{y}}</span>
                                    <span ng-if="!$last"> / </span>
                                </span>
                            </h4>
                        </div>
                    </div>
                    <div class="calendar-weeks-row">
                        <div class="full-cell padding-bot">
                            <div class="list-table-calendar">
                                <div class="calendar-name-week-row">
                                    <div class="day-name-cell">
                                        <h4>{{'calendarView.days.sun' | translate}}</h4>
                                    </div>
                                    <div class="day-name-cell">
                                        <h4>{{'calendarView.days.mon' | translate}}</h4>
                                    </div>
                                    <div class="day-name-cell">
                                        <h4>{{'calendarView.days.tue' | translate}}</h4>
                                    </div>
                                    <div class="day-name-cell">
                                        <h4>{{'calendarView.days.wed' | translate}}</h4>
                                    </div>
                                    <div class="day-name-cell">
                                        <h4>{{'calendarView.days.thu' | translate}}</h4>
                                    </div>
                                    <div class="day-name-cell">
                                        <h4>{{'calendarView.days.fri' | translate}}</h4>
                                    </div>
                                    <div class="day-name-cell">
                                        <h4>{{'calendarView.days.sat' | translate}}</h4>
                                    </div>
                                </div>
                                <div ng-repeat="week in data.weeks" class="calendar-week-row">
                                    <div ng-repeat="day in week" ng-style="getDayStyle(day.day)" class="day-cell">
                                        <h4>{{dateUtils.onlyDay(day.day)}}</h4>
                                        <span ng-repeat="activity in day.activities" ng-style="makeSquareColor(activity)" ng-show="canShow(activity)" bs-dynamic-tooltip="{title: activity.name, placement: 'top'}" class="small-square">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-navigation">
                <div class="list-table">
                    <div class="placeholder-row">
                        <div class="placeholder-cell">
                            placeholder
                        </div>
                    </div>
                    <div class="buttons-row">
                        <div class="buttons-cell">
                            <div class="close float-none close-color-override navigation-button previous-week-button" ng-click="previousWeek()" bs-dynamic-tooltip="{title: 'calendarView.previous', placement: 'left'}">
                                <span class="glyphicon glyphicon-chevron-up"></span>
                            </div>
                            <div class="close float-none close-color-override navigation-button" ng-click="initWeeks()" bs-dynamic-tooltip="{title: 'calendarView.today', placement: 'left'}">
                                <span class="glyphicon glyphicon-record"></span>
                            </div>
                            <div class="close float-none close-color-override navigation-button next-week-button" ng-click="nextWeek()" bs-dynamic-tooltip="{title: 'calendarView.next', placement: 'left'}">
                                <span class="glyphicon glyphicon-chevron-down"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</t:layout>
