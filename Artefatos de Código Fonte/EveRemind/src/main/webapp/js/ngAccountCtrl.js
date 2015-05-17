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

angular.module('everemindApp').controller('ngAccountCtrl', function ($scope, ngNotifier, $localStorage) {
    $scope.$storage = $localStorage;

    var email = $scope.$storage.sessionUser.email;
    var newEmail = "";

    $scope.data = {
        email: $scope.$storage.sessionUser.email,
        secondaryEmail: $scope.$storage.sessionUser.secondaryEmail,
        password: "password",
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
        fullName: $scope.$storage.sessionUser.fullName
    };

    $scope.update = function () {
        newEmail = $scope.data.email;
        if ($scope.data.email === "" || $scope.data.secondaryEmail === "" || $scope.data.fullName === "") {
            ngNotifier.error("signup.errors.blank");
            return;
        }
        $.ajax({
            dataType: "text",
            url: "ServletUpdateUser?originalEmail=" + email + "&email=" + $scope.data.email + "&fullName=" + $scope.data.fullName + "&secondaryEmail=" + $scope.data.secondaryEmail,
            success: function () {
                modifyUserSession();

            }
        });
    };

    $scope.updatePassword = function () {
        if ($scope.data.newPassword !== $scope.data.repeatNewPassword) {
            ngNotifier.error("signup.errors.notMatch");
            return;
        }
        $.getJSON("ServletLogin?email=" + email + "&password=" + $scope.data.currentPassword, {}, function (data) {
            if (!data.auth) {
                ngNotifier.error("account.errors.auth");
                return;
            }
            setNewPassword();
        });
    };
    
    var setNewPassword = function(){
        $.ajax({
            dataType: "text",
            url: "ServletUpdatePassword?email=" + email + "&password=" + $scope.data.newPassword,
            success: function () {
                ngNotifier.notify("account.passwordSuccess");
                $('#modalPassword').modal('hide');
            }
        });
    };

    var modifyUserSession = function () {
        $.getJSON("ServletGetUserJSON?email=" + newEmail, {}, function (data) {
            setUserSession(data);
        });
    };

    var setUserSession = function (json) {
        $scope.$storage.sessionUser = json;
        $scope.$storage.pendingMessage = {msg: "account.success", msgType: "notify"};
        $scope.$storage.$save();
        window.location.href = "dashboard.jsp";
    };
});