<%-- 
    Document   : dashboard
    Created on : 17/05/2015, 04:29:29
    Author     : Leonardo
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="t" tagdir="/WEB-INF/tags" %>
<t:layout pageID="dashboard">
    <div class="dashboard" ng-init='getUserCategories()' ng-hide="data.hideDash">
        <div class="table-row">
            <div ng-repeat="category in data.categories" ng-click="clickCategory($index)" ng-mouseenter="enterCategory($index)" ng-mouseleave="leaveCategory($index)" class="dashboard-column category-column cursor-pointer" ng-class="{'minimized-column': !isMaximized($index), 'maximized-column': isMaximized($index)}">
                <div class="table-div">    
                    <div class="category-title-row">
                        <div class="category-title" ng-class="{'minimized-column': !isMaximized($index), 'maximized-column': isMaximized($index)}">
                            <label class="cursor-pointer">{{category.name}}</label>
                        </div>
                    </div>
                    <div class="full-height-row">
                        <div class="full-height" ng-style="getCategoryColor($index)">
                            <div ng-show="isMaximized($index)">
                                <div ng-show="data.editing !== $index" class="row">
                                    <div class="col-md-4">
                                        <button bs-dynamic-tooltip="{title: 'dashboard.tooltips.editCategory'}" type="button" class="btn btn-dark full-button" ng-click="openEditing($index)">
                                            <span class="glyphicon glyphicon-pencil"></span>
                                        </button>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="close float-none close-color-override add-activity" ng-click="openAddActivity($index)" bs-dynamic-tooltip="{title: 'dashboard.tooltips.addActivity'}" data-toggle="modal" data-target="#modalAddActivity">
                                            <span class="add-activity-button glyphicon glyphicon-plus"></span>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <button bs-dynamic-tooltip="{title: 'dashboard.tooltips.deleteCategory'}" type="button" class="btn btn-dark full-button" ng-click="openDeleting($index)" data-toggle="modal" data-target="#modalDelete">
                                            <span class="glyphicon glyphicon-trash"></span>
                                        </button>
                                    </div>
                                </div>
                                <div ng-show="data.editing === $index">
                                    <div class="form-group">
                                        <label class="bordered-text">{{'dashboard.editCategory.name'| translate }}</label>
                                        <input ng-model="data.edit.name" type="text" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <label class="bordered-text">{{'dashboard.editCategory.color'| translate }}</label>
                                        <br>
                                        <input sp-palette ng-attr-id="{{'editColor' + $index}}" class="spectrum-palette" ng-model="data.edit.color" type="text" class="form-control">
                                    </div>
                                    <button type="button" class="btn btn-default" ng-click="openEditing($index)">{{'dashboard.editCategory.cancel'| translate }}</button>
                                    <button type="button" class="btn btn-dark float-right" ng-click="editCategory($index)">{{'dashboard.editCategory.save'| translate }}</button>
                                </div>
                                <br> 
                            </div>
                            <div class="activity-box" ng-repeat="activity in category.activities" ng-click="showActivity($parent.$index, $index)" ng-style="getPriorityColor(activity.priority)" role="button" data-toggle="modal" data-target="#modalShowActivity">
                                <span class="activity-name">{{activity.name}}</span>
                                <div ng-if="isMaximized($parent.$index)" class="activity-date-time"><span class="activity-date">{{activity.date}}</span> <span class="activity-time">{{activity.time}}</span></div>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ng-show="!data.adding" class="add-category-column">
                <div class="close close-color-override add-category" ng-click="addCategory()" bs-dynamic-tooltip="{title: 'dashboard.tooltips.addCategory', placement: 'right'}">
                    <span class="add-category-button glyphicon glyphicon-plus"></span>
                </div>
            </div>
            <div ng-show="data.adding" class="dashboard-column new-category-column" ng-style="data.add.style">
                <div class="padding-box">
                    <div class="form-group">
                        <label>{{'dashboard.newCategory.name'| translate }}</label>
                        <input ng-model="data.add.name" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>{{'dashboard.newCategory.color'| translate }}</label>
                        <br>
                        <input sp-palette class="spectrum-palette add-palette" ng-model="data.add.color" type="text" class="form-control">
                    </div>
                    <button type="button" class="btn btn-default" ng-click="cancelAddCategory()">{{'dashboard.newCategory.cancel'| translate }}</button>
                    <button type="button" class="btn btn-dark float-right" ng-click="saveAddCategory()">{{'dashboard.newCategory.save'| translate }}</button>
                </div>
            </div>
        </div>
    </div>
    <div class="loading" ng-if="data.hideDash">
    </div>
    <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="modalDeleteLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modalDeleteLabel" ng-bind-html="'dashboard.deleteCategory.modalTitle' | translate:data.modalData | html"></h4>
                </div>
                <div class="modal-body">
                    <h4 ng-bind-html="'dashboard.deleteCategory.modalText' | translate:data.modalData | html"></h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{'dashboard.deleteCategory.cancel'| translate}}</button>
                    <button type="button" class="btn btn-danger" ng-click="deleteCategory()">{{'dashboard.deleteCategory.doDelete'| translate}}</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalAddActivity" tabindex="-1" role="dialog" aria-labelledby="modalAddActivityLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modalAddActivityLabel" ng-bind-html="'dashboard.addActivity.modalTitle' | translate:data.modalData | html"></h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>{{'dashboard.addActivity.title'| translate }}</label>
                        <input class='form-control' type='text' ng-model="data.newActivity.name">
                    </div>
                    <div class="form-group">
                        <label>{{'dashboard.addActivity.description'| translate }}</label>
                        <textarea class='form-control no-resize-textarea' rows="2" type='text' ng-model="data.newActivity.description"></textarea>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-3">
                                <label>{{'dashboard.addActivity.date'| translate }}</label>
                                <input bs-datepicker class='form-control' type='text'ng-model="data.newActivity.date">
                            </div>
                            <div class="col-md-2">
                                <label>{{'dashboard.addActivity.time'| translate }}</label>
                                <input bs-timepicker="'#modalAddActivity'" class='form-control' type='text'ng-model="data.newActivity.time">
                            </div>
                            <div class="col-md-3">
                                <label class="inline-blocker">{{'dashboard.addActivity.priority'| translate }}</label>
                                <div class="close float-none close-color-override inline-blocker priority-help" ng-click="popover($event)" bs-dynamic-popover="{title: 'dashboard.tooltips.priorityHelpTitle', content: 'dashboard.tooltips.priorityHelp', placement: 'right'}">
                                    <span class="glyphicon glyphicon-question-sign"></span>
                                </div>
                                <select class='form-control selectpicker new-activity' ng-model="data.newActivity.priority" data-style="{{getSelectStyle()}}">
                                    <option class="option-primary" value="0">{{'dashboard.addActivity.priorities.low'| translate }}</option>
                                    <option class="option-success" value="1">{{'dashboard.addActivity.priorities.mid'| translate }}</option>
                                    <option class="option-warning" value="2">{{'dashboard.addActivity.priorities.high'| translate }}</option>
                                    <option class="option-danger" value="3">{{'dashboard.addActivity.priorities.critical'| translate }}</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label>{{'dashboard.addActivity.notify'| translate }}</label>
                                <br>
                                <input class='form-control create-switch' data-base-class="bootstrap-switch" bs-dynamic-switch="{onColor: 'info', onText: 'dashboard.addActivity.on', offText: 'dashboard.addActivity.off'}" type='checkbox' ng-model="data.newActivity.notification">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">{{'dashboard.addActivity.cancel'| translate}}</button>
                    <button type="button" class="btn btn-dark" ng-click="createActivity()">{{'dashboard.addActivity.create'| translate}}</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalShowActivity" tabindex="-1" role="dialog" aria-labelledby="modalShowActivityLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="modalAddActivityLabel" ng-bind-html="'dashboard.showActivity.modalTitle' | translate:data.modalData | html"></h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>{{'dashboard.addActivity.title'| translate }}</label>
                        <input ng-disabled="data.updateActivity.disabled" class='form-control' type='text' ng-model="data.updateActivity.name">
                    </div>
                    <div class="form-group">
                        <label>{{'dashboard.addActivity.description'| translate }}</label>
                        <textarea ng-disabled="data.updateActivity.disabled" class='form-control no-resize-textarea' rows="2" type='text' ng-model="data.updateActivity.description"></textarea>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-3">
                                <label>{{'dashboard.addActivity.date'| translate }}</label>
                                <input ng-disabled="data.updateActivity.disabled" bs-datepicker class='form-control' type='text'ng-model="data.updateActivity.date">
                            </div>
                            <div class="col-md-2">
                                <label>{{'dashboard.addActivity.time'| translate }}</label>
                                <input ng-disabled="data.updateActivity.disabled" bs-timepicker="'#modalShowActivity'" class='form-control' type='text'ng-model="data.updateActivity.time">
                            </div>
                            <div class="col-md-3">
                                <label class="inline-blocker">{{'dashboard.addActivity.priority'| translate }}</label>
                                <div class="close float-none close-color-override inline-blocker priority-help" ng-click="popover($event)" bs-dynamic-popover="{title: 'dashboard.tooltips.priorityHelpTitle', content: 'dashboard.tooltips.priorityHelp', placement: 'right'}">
                                    <span class="glyphicon glyphicon-question-sign"></span>
                                </div>
                                <select disabled="false" class='form-control selectpicker update-activity' ng-model="data.updateActivity.priority" data-style="{{getEditSelectStyle()}}">
                                    <option class="option-primary" value="0">{{'dashboard.addActivity.priorities.low'| translate }}</option>
                                    <option class="option-success" value="1">{{'dashboard.addActivity.priorities.mid'| translate }}</option>
                                    <option class="option-warning" value="2">{{'dashboard.addActivity.priorities.high'| translate }}</option>
                                    <option class="option-danger" value="3">{{'dashboard.addActivity.priorities.critical'| translate }}</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                <label>{{'dashboard.addActivity.notify'| translate }}</label>
                                <br>
                                <input class='form-control edit-switch' bs-dynamic-switch="{onColor: 'info', onText: 'dashboard.addActivity.on', offText: 'dashboard.addActivity.off'}" type='checkbox' ng-model="data.updateActivity.notification">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row">
                        <div class="col-md-2 left">
                            <button type="button" class="btn btn-danger" ng-click="deleteActivity()">{{'dashboard.showActivity.delete'| translate}}</button>
                        </div>
                        <div class="col-md-4 right">
                            <button type="button" class="btn btn-warning" bs-dynamic-tooltip="{title: 'dashboard.tooltips.markDone'}" ng-click="markDoneActivity()">{{'dashboard.showActivity.setDone'| translate}}</button>
                        </div>
                        <div class="col-md-6">
                            <button type="button" class="btn btn-default" data-dismiss="modal">{{'dashboard.showActivity.cancel'| translate}}</button>
                            <button ng-if="data.updateActivity.disabled" type="button" class="btn btn-dark" ng-click="updateActivity()">{{'dashboard.showActivity.edit'| translate}}</button>
                            <button ng-if="!data.updateActivity.disabled" type="button" class="btn btn-dark" ng-click="saveActivity()">{{'dashboard.showActivity.update'| translate}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</t:layout>