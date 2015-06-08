/* 
 * The MIT License
 *
 * Copyright 2015 Leonardo.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/* global angular */

angular.module('everemindApp').controller('ngDashboardCtrl', function ($scope, ngNotifier, $localStorage) {
    $scope.$storage = $localStorage;

    $scope.data = {
        hideDash: true,
        adding: false,
        editing: -1,
        deleting: -1,
        creating: -1,
        editActivityA: -1,
        editActivityC: -1,
        modalData: {},
        add: {
            name: "",
            color: "rgb(255, 255, 255)",
            style: {
                'background-color': '#FFFFFF'
            }
        },
        edit: {
            name: "",
            color: "",
            style: {
                'background-color': ""
            }
        },
        newActivity: {
            name: "",
            description: "",
            date: "",
            time: "",
            priority: "0",
            notification: true
        },
        updateActivity: {
            name: "",
            description: "",
            date: "",
            time: "",
            priority: "0",
            notification: true,
            disabled: true
        },
        categories: []
    };

    $scope.createStyle = function (color) {
        return {'background-color': color};
    };

    $scope.getCategoryColor = function (index) {
        if ($scope.data.editing !== index)
            return {'background-color': $scope.data.categories[index].color};
        else
            return {'background-color': $scope.data.edit.color};
    };

    $scope.$watch(
            function () {
                return $scope.data.add.color;
            },
            function () {
                $scope.data.add.style = {'background-color': $scope.data.add.color};
            }
    );

    $scope.$watch(
            function () {
                return $scope.data.edit.color;
            },
            function () {
                $scope.data.edit.style = {'background-color': $scope.data.edit.color};
            }
    );

    $scope.getUserName = function () {
        return $scope.$storage.sessionUser.fullName;
    };

    $scope.cancelAddCategory = function () {
        $scope.data.add = {
            name: "",
            color: "rgb(255, 255, 255)",
            style: {
                'background-color': 'rgb(255, 255, 255)'
            }
        };
        $(".spectrum-palette.add-palette").spectrum("set", "rgb(255, 255, 255)");
        $scope.data.adding = false;
    };

    $scope.getUserCategories = function () {
        $.getJSON("ServletGetUserCategories?idUser=" + $scope.$storage.sessionUser._id, {}, function (data) {
            updateCategories(data);
        });
    };


    $scope.$watch(
            function (scope) {
                return scope.$storage.refreshCategories;
            },
            function () {
                if ($scope.$storage.refreshCategories) {
                    $scope.data.hideDash = true;
                    $scope.$apply();
                    $scope.$storage.refreshCategories = null;
                    $scope.$storage.$save();
                    $scope.getUserCategories();
                    $scope.$apply();
                }
            }
    );


    $scope.saveAddCategory = function () {
        var name = $scope.data.add.name, color = $scope.data.add.color, id = $scope.$storage.sessionUser._id;
        if ($scope.data.add.name === "") {
            ngNotifier.warning("dashboard.errors.addCategoryName");
            return;
        }
        if ($scope.data.add.name.length > 20) {
            ngNotifier.warning("dashboard.errors.addCategoryLength");
            return;
        }
        $.getJSON("ServletCheckCategory?name=" + name + "&idUser=" + id, {}, function (data) {
            if (data.registered) {
                ngNotifier.warning("dashboard.errors.alreadyRegistered");
                return;
            }
            setNewCategory(name, color, id);
        });
    };

    var setNewCategory = function (name, color, id) {
        $.ajax({
            dataType: "text",
            url: "ServletCreateCategory?name=" + name + "&color=" + color + "&idUser=" + id,
            success: function () {
                $scope.$storage.refreshCategories = true;
                $scope.$storage.$save();
                $scope.$apply();
                $scope.cancelAddCategory();
                ngNotifier.notify("dashboard.addCategory");
            }
        });
    };

    $scope.editCategory = function (index) {
        var name = $scope.data.edit.name, color = $scope.data.edit.color, id = $scope.$storage.sessionUser._id;
        if ($scope.data.edit.name === "") {
            ngNotifier.warning("dashboard.errors.addCategoryName");
            return;
        }
        if ($scope.data.edit.name.length > 20) {
            ngNotifier.warning("dashboard.errors.addCategoryLength");
            return;
        }
        if ($scope.data.edit.name === $scope.data.categories[index].name && $scope.data.edit.color === $scope.data.categories[index].color){
            ngNotifier.warning("dashboard.errors.change");
            return;
        }
        if ($scope.data.categories[index].name !== name) {
            $.getJSON("ServletCheckCategory?name=" + name + "&idUser=" + id, {}, function (data) {
                if (data.registered) {
                    ngNotifier.warning("dashboard.errors.alreadyRegistered");
                    return;
                }
                updateCategory(index, name, color, id);
            });
        }
        else {
            updateCategory(index, name, color, id);
        }
    };

    var updateCategory = function (index, name, color, id) {
        var originalName = $scope.data.categories[index].name;
        $.ajax({
            dataType: "text",
            url: "ServletUpdateCategory?originalName=" + originalName + "&name=" + name + "&color=" + color + "&idUser=" + id,
            success: function () {
                $scope.$storage.refreshCategories = true;
                $scope.$storage.$save();
                $scope.$apply();
                ngNotifier.notify("dashboard.editCategoryMsg");
            }
        });
    };

    $scope.deleteCategory = function () {
        var name = $scope.data.categories[$scope.data.deleting].name, id = $scope.$storage.sessionUser._id;
        $.ajax({
            dataType: "text",
            url: "ServletDeleteCategory?&name=" + name + "&idUser=" + id,
            success: function () {
                $scope.$storage.refreshCategories = true;
                $scope.$storage.$save();
                $scope.$apply();
                $('#modalDelete').modal('hide');
                ngNotifier.notify("dashboard.deleteCategoryMsg");
            }
        });
    };

    $scope.createActivity = function () {
        var name = $scope.data.newActivity.name;
        var description = $scope.data.newActivity.description;
        var date = $scope.data.newActivity.date;
        var time = $scope.data.newActivity.time;
        var priority = $scope.data.newActivity.priority;
        var notification = $scope.data.newActivity.notification;
        var idCategory = $scope.data.categories[$scope.data.creating].id;
        if (name === "" || description === "" || date === "" || time === "" || priority === "" || notification === "") {
            ngNotifier.warning("dashboard.errors.addActivityInput");
            return;
        }
        if (time.indexOf(":") === 0 || time.indexOf(":") === time.length -1 || time.indexOf(":") === -1){
            ngNotifier.warning("dashboard.errors.invalidTime");
            return;
        }
        if (name.length > 80) {
            ngNotifier.warning("dashboard.errors.addActivityLength");
            return;
        }
        var dateTime = inputToDate(date, time);
        var now = new Date();
        var minSpace = 1000 * 60 * 60; // One hour
        var minDateTime = (new Date(now.getTime() + minSpace).toLocaleString()).substring(0, (new Date(now.getTime() + minSpace).toLocaleString()).lastIndexOf(":"));
        if ((dateTime.getTime() - now.getTime()) < minSpace) {
            ngNotifier.warning("dashboard.errors.minSpace", {minDateTime: minDateTime});
            return;
        }
        $.ajax({
            dataType: "text",
            url: "ServletCreateActivity?name=" + name +
                    "&description=" + description +
                    "&date=" + date +
                    "&time=" + time +
                    "&priority=" + priority + 
                    "&notification=" + notification +
                    "&idCategory=" + idCategory ,
            success: function () {
                $scope.$storage.refreshCategories = true;
                $scope.$storage.$save();
                $scope.$apply();
                $('#modalAddActivity').modal('hide');
                ngNotifier.notify("dashboard.createdActivity");
            }
        });
    };

    $scope.isMaximized = function (index) {
        if (!$scope.data.categories[index].minimized)
            return true;

        if ($scope.data.categories[index].hovering) {
            return true;
        }

        if ($scope.data.editing === index) {
            return true;
        }

        return false;
    };

    $scope.clickCategory = function (index) {
        $scope.data.categories[index].minimized = !$scope.data.categories[index].minimized;
    };
    $scope.enterCategory = function (index) {
        $scope.data.categories[index].hovering = true;
    };

    $scope.leaveCategory = function (index) {
        $scope.data.categories[index].hovering = false;
    };

    $scope.openEditing = function (index) {
        if ($scope.data.editing === index) {
            $scope.data.editing = -1;
        }
        else if ($scope.data.editing === -1) {
            $scope.data.editing = index;
            $scope.data.edit.name = $scope.data.categories[index].name;
            $scope.data.edit.color = $scope.data.categories[index].color;
            $("#editColor" + index).spectrum("set", $scope.data.categories[index].color);
        }
        else {
            ngNotifier.error("dashboard.errors.editingCategory");
        }
    };

    $scope.openDeleting = function (index) {
        $scope.data.deleting = index;
        $scope.data.modalData = {category: $scope.data.categories[index].name};
    };

    $scope.openAddActivity = function (index) {
        $scope.data.creating = index;
        cleanModalActivity();
        $scope.data.modalData = {category: $scope.data.categories[index].name};
    };
    
    $scope.showActivity = function(categoryIndex, activityIndex){
        var category = $scope.data.categories[categoryIndex];
        var activity = category.activities[activityIndex];
        $scope.data.modalData = {
            category: category.name,
            activity: activity.name
        };
        $scope.data.updateActivity.disabled = true;
        $scope.data.updateActivity.name = activity.name;
        $scope.data.updateActivity.description = activity.description;
        $scope.data.updateActivity.date = activity.date;
        $scope.data.updateActivity.time = activity.time;
        $scope.data.updateActivity.priority = activity.priority;
        $(".selectpicker.update-activity").selectpicker('val', activity.priority);
        $(".edit-switch").bootstrapSwitch('disabled', false);
        $scope.data.updateActivity.notification = activity.notification;
        $(".edit-switch").bootstrapSwitch('state', activity.notification);
        $(".edit-switch").bootstrapSwitch('disabled', true);
        $scope.data.editActivityA = activityIndex;
        $scope.data.editActivityC = categoryIndex;
        $(".selectpicker.update-activity").attr("disabled", true);
        $('.selectpicker.update-activity').selectpicker('refresh');
    };
    
    $scope.updateActivity = function () {
        $scope.data.updateActivity.disabled = false;
        $(".edit-switch").bootstrapSwitch('disabled', false);
        $(".selectpicker.update-activity").attr("disabled", false);
        $('.selectpicker.update-activity').selectpicker('refresh');
    };
    
    $scope.saveActivity = function () {
        var name = $scope.data.updateActivity.name;
        var description = $scope.data.updateActivity.description;
        var date = $scope.data.updateActivity.date;
        var time = $scope.data.updateActivity.time;
        var priority = $scope.data.updateActivity.priority;
        var notification = $scope.data.updateActivity.notification;
        var idCategory = $scope.data.categories[$scope.data.editActivityC].id;
        var oriActivity = $scope.data.categories[$scope.data.editActivityC].activities[$scope.data.editActivityA];
        var id = $scope.data.categories[$scope.data.editActivityC].activities[$scope.data.editActivityA].id;
        if (name === "" || description === "" || date === "" || time === "" || priority === "" || notification === "") {
            ngNotifier.warning("dashboard.errors.addActivityInput");
            return;
        }
        if (
            name === oriActivity.name && 
            description === oriActivity.description && 
            date === oriActivity.date && 
            time === oriActivity.time &&
            priority === oriActivity.priority &&
            notification === oriActivity.notification
            ){
            ngNotifier.warning("dashboard.errors.change");
            return;      
        }
        if (time.indexOf(":") === 0 || time.indexOf(":") === time.length -1 || time.indexOf(":") === -1){
            ngNotifier.warning("dashboard.errors.invalidTime");
            return;
        }
        if (name.length > 80) {
            ngNotifier.warning("dashboard.errors.addActivityLength");
            return;
        }
        var dateTime = inputToDate(date, time);
        var now = new Date();
        var minSpace = 1000 * 60 * 60; // One hour
        var minDateTime = (new Date(now.getTime() + minSpace).toLocaleString()).substring(0, (new Date(now.getTime() + minSpace).toLocaleString()).lastIndexOf(":"));
        if ((dateTime.getTime() - now.getTime()) < minSpace) {
            ngNotifier.warning("dashboard.errors.minSpace", {minDateTime: minDateTime});
            return;
        }
        $.ajax({
            dataType: "text",
            url: "ServletUpdateActivity?name=" + name +
                    "&description=" + description +
                    "&date=" + date +
                    "&time=" + time +
                    "&priority=" + priority + 
                    "&notification=" + notification +
                    "&idCategory=" + idCategory +
                    "&id=" + id,
            success: function () {
                $scope.$storage.refreshCategories = true;
                $scope.$storage.$save();
                $scope.$apply();
                $('#modalShowActivity').modal('hide');
                ngNotifier.notify("dashboard.updatedActivity");
            }
        });
    };
    
    $scope.deleteActivity = function () {
        var id = $scope.data.categories[$scope.data.editActivityC].activities[$scope.data.editActivityA].id;
        $.ajax({
            dataType: "text",
            url: "ServletDeleteActivity?id=" + id,
            success: function () {
                $scope.$storage.refreshCategories = true;
                $scope.$storage.$save();
                $scope.$apply();
                $('#modalDeleteActivity').modal('hide');
                $('#modalShowActivity').modal('hide');
                ngNotifier.notify("dashboard.deleteActivityMsg");
            }
        });
    };
    
    $scope.markDoneActivity = function () {
        var id = $scope.data.categories[$scope.data.editActivityC].activities[$scope.data.editActivityA].id;
        $.ajax({
            dataType: "text",
            url: "ServletUpdateDone?id=" + id,
            success: function () {
                $scope.$storage.refreshCategories = true;
                $scope.$storage.$save();
                $scope.$apply();
                $('#modalDeleteActivity').modal('hide');
                $('#modalShowActivity').modal('hide');
                ngNotifier.notify("dashboard.markDoneActivityMsg");
            }
        });
    };

    $scope.addCategory = function () {
        $scope.data.adding = true;
    };

    $scope.popover = function (event) {
        event.target.popover('toggle');
    };
    
    $scope.getPriorityColor = function(priority){
        var priorities = {
            "0": {border: '1px solid #337AB7', 'border-top': '5px solid #337AB7'},
            "1": {border: '1px solid #5CB85C', 'border-top': '5px solid #5CB85C'},
            "2": {border: '1px solid #F0AD4E', 'border-top': '5px solid #F0AD4E'},
            "3": {border: '1px solid #D9534F', 'border-top': '5px solid #D9534F'}
        };
        if (!priorities[priority])
            return {border: '1px solid black'};
        
        return priorities[priority];
    };
    
    var styles = {
        "0": "btn-primary",
        "1": "btn-success",
        "2": "btn-warning",
        "3": "btn-danger"
    };
    
    $scope.getSelectStyle = function(){
        
        return styles[$scope.data.newActivity.priority];
    };
    
    $scope.getEditSelectStyle = function(){
        
        return styles[$scope.data.updateActivity.priority];
    };
    
    $scope.$watch(
            function (scope) {
                return scope.data.newActivity.priority;
            },
            function (newValue, oldValue) {
                if (oldValue != newValue){
                    for (var i = 0; i <= parseInt(oldValue); i++){
                        $('.selectpicker.new-activity').selectpicker('setStyle', styles[i], 'remove');
                    }
                    $('.selectpicker.new-activity').selectpicker('setStyle', $scope.getSelectStyle(), 'add');
                }
            }
    );
    
    $scope.$watch(
        function (scope) {
            return scope.data.updateActivity.priority;
        },
        function (newValue, oldValue) {
            if (oldValue != newValue){
                for (var i = 0; i <= parseInt(oldValue); i++){
                    $('.selectpicker.update-activity').selectpicker('setStyle', styles[i], 'remove');
                }
                $('.selectpicker.update-activity').selectpicker('setStyle', $scope.getEditSelectStyle(), 'add');
            }
        }
    );
    
    var cleanModalActivity = function(){
        $scope.data.newActivity.name = "";
        $scope.data.newActivity.description = "";
        $scope.data.newActivity.date = "";
        $scope.data.newActivity.time = "";
        $scope.data.newActivity.priority = "0";
        $(".selectpicker.new-activity").selectpicker('val', "0");
        $scope.data.newActivity.notification = true;
        $(".create-switch").bootstrapSwitch('state', true);
    };

    var updateCategories = function (data) {
        $scope.data.categories = data;
        $scope.data.editing = -1;
        $scope.data.hideDash = false;
        $scope.$apply();
    };
    
    var inputToDate = function(date, time){
        var d = parseInt(date.substr(0, 2));
        var m = parseInt(date.substr(3, 2));
        var y = parseInt(date.substr(6, 4));
        var h = parseInt(time.substr(0, 2));
        var min = parseInt(time.substr(3, 2));
        return new Date(y, m - 1, d, h, min);
    };
});