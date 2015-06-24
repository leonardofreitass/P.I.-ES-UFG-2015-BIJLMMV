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
                <br>
                <div class="activity-label-action">
                    <span class="activity-label">
                       {{'listView.categories'| translate}}
                    </span>
                    <span class="activity-action">
                        <div class="dropdown inline-blocker">
                            <a id="dLabel" role="button" data-toggle="dropdown" class="btn btn-default" data-target="#" href="/page.html">
                                {{'listView.actions'| translate }} <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu multi-level" role="menu" aria-labelledby="dropdownMenu">
                                <li class="dropdown-submenu">
                                    <a tabindex="-1" href="#">{{'calendarView.colorBy'| translate }}</a>
                                    <ul class="dropdown-menu">
                                        <li ng-click="data.colorMode = 'category'" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'calendarView.category'| translate }}</a></li>
                                        <li ng-click="data.colorMode = 'priority'" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'calendarView.priority'| translate }}</a></li>
                                    </ul>
                                </li>
                                <li ng-if="!data.showDone" ng-click="data.showDone = true" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'listView.showDone'| translate }}</a></li>
                                <li ng-if="data.showDone" ng-click="data.showDone = false" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'listView.notShowDone'| translate }}</a></li>
                                <li ng-if="!data.showExpired" ng-click="data.showExpired = true" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'listView.showExpired'| translate }}</a></li>
                                <li ng-if="data.showExpired" ng-click="data.showExpired = false" role="presentation"><a role="menuitem" tabindex="-1" href="#">{{'listView.notShowExpired'| translate }}</a></li>
                            </ul>
                        </div>
                    </span> 
                </div>
                <br>
                <hr class="custom-primary-hr">
                <br>
                <div class="colored-btn-box" ng-repeat="category in data.categories">
                    <button class="btn btn-lg btn-colored" ng-click="toggleBlock($index)" ng-mouseenter="hover($index)" ng-mouseleave="deHover($index)" ng-style="makeBtnStyle(category)">
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
                <div class="list-table-cal-overview">
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
                        <div class="full-cell">
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
                                        <span ng-repeat="activity in day.activities" ng-style="makeSquareColor(activity)" ng-show="canShow(activity)" bs-dynamic-tooltip="{title: activity.name, placement: 'top'}" class="activity-in-calendar">
                                            <span class="glyph-calendar" ng-class="{'glyphicon glyphicon-unchecked': !activity.done, 'glyphicon glyphicon-check': activity.done}"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <span class='glyphicon glyphicon-unchecked only-view'>&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                        <strong>{{'listView.status.inTime' | translate}}</strong>
                    </div>
                    <div class="col-md-3">
                        <span class='glyphicon glyphicon-check only-view'>&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                        <strong>{{'listView.status.done' | translate}}</strong>
                    </div>
                    <div class="col-md-5 right">
                        <strong>{{'calendarView.showingBy' | translate}} {{('calendarView.' + data.colorMode) | translate}}</strong>
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
