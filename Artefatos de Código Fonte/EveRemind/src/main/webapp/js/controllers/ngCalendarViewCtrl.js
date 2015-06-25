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

angular.module('everemindApp').controller('ngCalendarViewCtrl', function ($scope, ngNotifier, translateFilter, ngDateUtils, $localStorage) {
    
    $scope.monthsTranslations = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
    $scope.weeksLoad = 4;
    $scope.daysPerWeek = 7;
    $scope.months = [];
    $scope.years = [];
    
    $scope.$storage = $localStorage;
    
    $scope.dateUtils = ngDateUtils;
    
    $scope.data = {
        weeks: [],
        showDone: true,
        showExpired: true,
        colorMode: "category",
        categories: [],
        hovering: false
        
    };
    
    $scope.initWeeks = function () {
        $.getJSON("ServletGetWeeklyActivities?action=start&weeks=" + $scope.weeksLoad, {}, function (data) {
            $scope.data.weeks = data;
            $scope.$apply();
            updateInfo();
        });
    };
    
    $scope.nextWeek = function () {
        $.getJSON("ServletGetWeeklyActivities?action=next&last=" + $scope.data.weeks[$scope.weeksLoad - 1][$scope.daysPerWeek - 1].day, {}, function (data) {
            $scope.data.weeks.splice(0, 1);
            $scope.data.weeks.push(data);
            $scope.$apply();
            updateInfo();
        });
    };
    
    $scope.previousWeek = function () {
        $.getJSON("ServletGetWeeklyActivities?action=previous&first=" + $scope.data.weeks[0][0].day, {}, function (data) {
            $scope.data.weeks.splice($scope.weeksLoad - 1, 1);
            $scope.data.weeks.unshift(data);
            $scope.$apply();
            updateInfo();
        });
    };
    
    $scope.refreshCategories = function () {
        $.getJSON("ServletGetUserCategories?idUser=" + $scope.$storage.sessionUser._id + "&activities=false", {}, function (data) {
            updateCategories(data);
        });
    };
    
    $scope.getDayStyle = function(day){
        var returnJson = {};
        var dayJson = ngDateUtils.jsonfyDate(day);
        
        if (dayJson.m % 2 === 0)
            returnJson['border-color'] = "#EEEEEE";
        else
            returnJson['border-color'] = "#CCCCCC";
        
        if (ngDateUtils.isToday(day))
            returnJson['border-color'] = "#E67D23";
        
        if (ngDateUtils.isBeforeToday(day))
            returnJson['background-color'] = "#f4f4f4";
        
        return returnJson;
    };
    
    $scope.makeBtnStyle = function(category){
        if (category.blocked)
            return {
                'background-color': "#DDDDDD",
                'border-color': "#AAAAAA"
            };
        return {
            'background-color': category.color, 
            'border-color': category.color
        };
    };
    
    $scope.makeSquareColor = function(activity){
        var styleJson = {};
        for (var i = 0; i < $scope.data.categories.length; i++){
            if ($scope.data.categories[i].id === activity.idCategory){
                if ($scope.data.hovering && !$scope.data.categories[i].hovering){
                    styleJson.opacity = "0.175";
                }
                if ($scope.data.colorMode === "category")
                    styleJson['background-color'] = $scope.data.categories[i].color;
                else if ($scope.data.colorMode === "priority"){
                    var priorities = {
                        "0": '#337AB7',
                        "1": '#5CB85C',
                        "2": '#F0AD4E',
                        "3": '#D9534F'
                    };
                    styleJson['background-color'] = priorities[activity.priority];
                }
                break;
            }
        }
        
        return styleJson;
    };
    
    $scope.categoryName = function(id){
        for (var i = 0; i < $scope.data.categories.length; i++){
            if ($scope.data.categories[i].id === id){
                return $scope.data.categories[i].name;
            }
        }
        return "";
    };
    
    $scope.canShow = function(activity){
        if (!$scope.data.showDone && activity.done)
            return false;
        
        if (!$scope.data.showExpired && activity.expired)
            return false;
        
        for (var i = 0; i < $scope.data.categories.length; i++){
            if (activity.idCategory === $scope.data.categories[i].id && $scope.data.categories[i].blocked)
                return false;
        }
        
        return true;
    };
    
    $scope.hover = function(index){
        if (!$scope.data.categories[index].blocked){
            $scope.data.categories[index].hovering = true;
            $scope.data.hovering = true;
        }
    };
    
    $scope.deHover = function(index){
        $scope.data.categories[index].hovering = false;
        $scope.data.hovering = false;
    };
    
    $scope.toggleBlock = function(index){
        $scope.data.categories[index].blocked = !$scope.data.categories[index].blocked;
        if ($scope.data.categories[index].blocked){
            $scope.data.categories[index].hovering = false;
            $scope.data.hovering = false;
        }
        else{
            $scope.data.categories[index].hovering = true;
            $scope.data.hovering = true;
        }
            
    };
    
    var updateCategories = function(data){
        $scope.data.categories = data;
        for (var i = 0; i < $scope.data.categories.length; i++){
            $scope.data.categories[i].badge = 0;
            $scope.data.blocked = false;
            $scope.data.hovering = false;
        }
        
        $scope.$apply();
    };
    
    var updateInfo = function(){
        $scope.months = new Array();
        $scope.years = new Array();
        for (var catI = 0; catI < $scope.data.categories.length; catI++){
            $scope.data.categories[catI].badge = 0;
        }
        for (var week = 0; week < $scope.data.weeks.length; week++){
            for (var dayI = 0; dayI < $scope.data.weeks[week].length; dayI++){
                var day = $scope.data.weeks[week][dayI];
                var y = parseInt(day.day.substring(day.day.lastIndexOf("/") + 1));
                var m = parseInt(day.day.substring(day.day.indexOf("/") + 1, day.day.lastIndexOf("/")));
                if ($scope.years.indexOf(y) === -1)
                    $scope.years.push(y);
                
                if ($scope.months.indexOf($scope.monthsTranslations[m - 1]) === -1)
                    $scope.months.push($scope.monthsTranslations[m - 1]);
                
                for (var actI = 0; actI < day.activities.length; actI++){
                    for (var catI = 0; catI < $scope.data.categories.length; catI++){
                        if ($scope.data.categories[catI].id === day.activities[actI].idCategory)
                            $scope.data.categories[catI].badge++;
                    }
                }
            }
        }
        $scope.$apply();
    };
});