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
        adding: false,
        editing: -1,
        deleting: -1,
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
        categories: []
    };
    
    $scope.createStyle = function(color){
        return {'background-color': color};
    };
    
    $scope.getCategoryColor = function(index){
        if ($scope.data.editing !== index)
            return {'background-color': $scope.data.categories[index].color};
        else
            return {'background-color': $scope.data.edit.color};
    };
    
    $scope.$watch(
        function() { 
            return $scope.data.add.color; 
        }, 
        function() {
            $scope.data.add.style = {'background-color': $scope.data.add.color};
        }
    );
    
    $scope.$watch(
        function() { 
            return $scope.data.edit.color; 
        }, 
        function() {
            $scope.data.edit.style = {'background-color': $scope.data.edit.color};
        }
    );

    $scope.getUserName = function () {
        return $scope.$storage.sessionUser.fullName;
    };
    
    $scope.cancelAddCategory = function(){
        $scope.data.add = {
            name: "",
            color: "rgb(255, 255, 255)",
            style: {
                'background-color': 'rgb(255, 255, 255)'
            }
        };
        $scope.data.adding = false;
    };
    
    $scope.getUserCategories = function(){
        $.getJSON("ServletGetUserCategories?idUser=" + $scope.$storage.sessionUser._id, {}, function (data) {
            updateCategories(data);
        });
    };
    
    
    $scope.$watch(
        function(scope) { 
            return scope.$storage.refreshCategories; 
        }, 
        function() {
            if ($scope.$storage.refreshCategories){
                $scope.$storage.refreshCategories = null;
                $scope.$storage.$save();
                $scope.getUserCategories();
                $scope.$apply();
            }
        }
    );
    
    
    $scope.saveAddCategory = function(){
        var name = $scope.data.add.name, color = $scope.data.add.color, id = $scope.$storage.sessionUser._id;
        if ($scope.data.add.name === ""){
            ngNotifier.warning("dashboard.errors.addCategoryName");
            return;
        }
        $.getJSON("ServletCheckCategory?name=" + name + "&idUser=" + id, {}, function (data) {
            if (data.registered){
                ngNotifier.warning("dashboard.errors.alreadyRegistered");
                return;
            }
            setNewCategory(name, color, id);
        });
    };
    
    var setNewCategory = function(name, color, id){
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
    
    $scope.editCategory = function(index){
        var name = $scope.data.edit.name, color = $scope.data.edit.color, id = $scope.$storage.sessionUser._id;
        if ($scope.data.edit.name === ""){
            ngNotifier.warning("dashboard.errors.addCategoryName");
            return;
        }
        if ($scope.data.categories[index].name !== name){
            $.getJSON("ServletCheckCategory?name=" + name + "&idUser=" + id, {}, function (data) {
                if (data.registered){
                    ngNotifier.warning("dashboard.errors.alreadyRegistered");
                    return;
                }
                updateCategory(index, name, color, id);
            });
        }
        else{
            updateCategory(index, name, color, id);
        }
    };
    
    var updateCategory = function(index, name, color, id){
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
    
    $scope.deleteCategory = function(){
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
    
    $scope.isMaximized = function(index){
        if (!$scope.data.categories[index].minimized)
            return true;
        
        if ($scope.data.categories[index].hovering){
            return true;
        }
        
        if ($scope.data.editing === index){
            return true;
        }
        
        return false;
    };
    
    $scope.clickCategory = function(index){
        $scope.data.categories[index].minimized = !$scope.data.categories[index].minimized;
    };
    $scope.enterCategory = function(index){
        $scope.data.categories[index].hovering = true;
    };
    
    $scope.leaveCategory = function(index){
        $scope.data.categories[index].hovering = false;
    };
    
    $scope.openEditing = function(index){
        if ($scope.data.editing === index){
            $scope.data.editing = -1;
        }
        else if ($scope.data.editing === -1){
            $scope.data.editing = index;
            $scope.data.edit.name = $scope.data.categories[index].name;
            $scope.data.edit.color = $scope.data.categories[index].color;
            $("#editColor" + index).spectrum("set", $scope.data.categories[index].color);
        }
        else{
            ngNotifier.error("dashboard.errors.editingCategory");
        }
    };
    
    $scope.openDeleting = function(index){
        $scope.data.deleting = index;
        $scope.data.modalData = {category: $scope.data.categories[index].name}
    };

    $scope.addCategory = function () {
        $scope.data.adding = true;
    };
    
    $scope.loadJQuery = function(){
        loadJQuery();
    };
    
    var updateCategories = function(data){
        $scope.data.categories = data;
        $scope.data.editing = -1;
        $scope.$apply();
    };
});