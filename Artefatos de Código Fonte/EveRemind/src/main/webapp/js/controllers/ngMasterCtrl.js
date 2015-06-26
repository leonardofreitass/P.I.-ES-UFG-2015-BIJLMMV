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

/* global angular, pagesConfig, pageID */

angular.module('everemindApp').controller('ngMasterCtrl', function ($scope, ngNotifier, $localStorage) {
    $scope.$storage = $localStorage;
    
    var display = true;
    
    var pendingMessages = function(){
        if ($scope.$storage.pendingMessage){
            var msg = $scope.$storage.pendingMessage;
            ngNotifier[msg.msgType](msg.msg, msg.param);
            $scope.$storage.pendingMessage = null;
        }
    };
    
    var checkAuth = function(){
        if (pagesConfig[pageID].access === "auth" && !$scope.$storage.sessionUser){
            $scope.$storage.pendingMessage = {msg: "general.notifications.notAuthorized", msgType: "error"};
            $scope.$storage.$save();
            display = false;
            window.location.href = "index.jsp";
        }
        if ($scope.$storage.exiting){
            $scope.$storage.exiting = null;
            $scope.$storage.sessionUser = null;
        }
    };
    
    var checkPublic = function(){
        if (pagesConfig[pageID].access === "public" && $scope.$storage.sessionUser){
            display = false;
            window.location.href = "dashboard.jsp";
        }
    };
    
    var displayPage = function(){
        if (display)
            $("html").removeClass("hidden-html");
    };
    
    $scope.$watch(
        function() { 
            return $scope.$storage.sessionUser; 
        }, 
        function() {
            checkAuth();
            checkPublic();
        }
    );
    
    checkAuth();
    checkPublic();
    displayPage();
    pendingMessages();
   
});