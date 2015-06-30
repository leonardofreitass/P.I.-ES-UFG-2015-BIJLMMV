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

/* global angular, pageID */

angular.module('everemindApp').controller('ngNavbarCtrl', function ($scope, ngNotifier, $localStorage, ngLanguage) {
    $scope.$storage = $localStorage;

    $scope.pageID = pageID;

    $scope.home = "index.jsp";

    $scope.lang = ngLanguage;

    $scope.data = {
        email: "",
        password: ""
    };

    $scope.forms = {
    };

    var email = "";

    $scope.isLogged = function () {
        return $scope.$storage.sessionUser;
    };

    if ($scope.isLogged())
        $scope.home = "dashboard.jsp";

    $scope.getUserName = function () {
        return $scope.$storage.sessionUser.name;
    };

    $scope.login = function () {
        email = $scope.data.email;
        if ($scope.forms.loginForm.inputLogin.$error.required) {
            ngNotifier.error("navbar.errors.requiredEmail");
            return;
        }
        if ($scope.forms.loginForm.inputLogin.$error.email) {
            ngNotifier.error("navbar.errors.notAnEmail");
            return;
        }
        if ($scope.forms.loginForm.inputPassword.$error.required) {
            ngNotifier.error("navbar.errors.requiredPassword");
            return;
        }
        $.getJSON("ServletAuthenticate?email=" + $scope.data.email + "&password=" + $scope.data.password, {}, function (data) {
            if (!data.auth) {
                ngNotifier.error("navbar.errors.auth");
                return;
            }
            startUserSession(true);
        });
    };

    $scope.logout = function () {
        $scope.$storage.exiting = true;
        $scope.$storage.pendingMessage = {msg: "navbar.logout" + randomMsg(3), msgType: "notify", param: {name: $scope.getUserName()}};
        $scope.$storage.$save();
        window.location.href = "index.jsp";
    };

    var randomMsg = function (max) {
        return Math.floor((Math.random() * max) + 1).toString();
    };

    var startUserSession = function (refresh) {
        $.getJSON("ServletGetUserJSON?email=" + email, {}, function (data) {
            setUserSession(data, refresh);
        });
    };

    var setUserSession = function (json, refresh) {
        if (refresh) {
            if (!json.verifiedEmail)
                $scope.$storage.pendingMessage = {msg: "navbar.verifyEmail", msgType: "warning"};
            else
                $scope.$storage.pendingMessage = {msg: "navbar.login" + randomMsg(3), msgType: "notify", param: {name: json.fullName}};

            $scope.$storage.login = true;
            $scope.$storage.futureSessionUser = json;
            $scope.$storage.$save();
            $scope.$apply();
            window.location.href = "dashboard.jsp";
        }
        else {
            $scope.$storage.sessionUser = json;
            $scope.$storage.$save();
            $scope.$apply();
        }
    };

    if (!!$scope.$storage.sessionUser) {
        email = $scope.$storage.sessionUser.email;
        startUserSession(false);
    }
});