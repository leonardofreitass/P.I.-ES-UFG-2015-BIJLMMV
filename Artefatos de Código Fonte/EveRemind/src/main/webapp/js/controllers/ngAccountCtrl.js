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
    var secondaryEmail = $scope.$storage.sessionUser.secondaryEmail;
    var newEmail = "";

    $scope.data = {
        email: $scope.$storage.sessionUser.email,
        secondaryEmail: $scope.$storage.sessionUser.secondaryEmail,
        password: "password",
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
        fullName: $scope.$storage.sessionUser.fullName,
        delete: {
            email: "",
            password: ""
        }
    };
    
    
    $scope.forms = {
        
    };

    $scope.update = function () {
        newEmail = $scope.data.email;
        if ($scope.data.email === "" || $scope.data.secondaryEmail === "" || $scope.data.fullName === "") {
            ngNotifier.error("account.errors.required");
            return;
        }
        if ($scope.data.email === $scope.$storage.sessionUser.email && $scope.data.secondaryEmail === $scope.$storage.sessionUser.secondaryEmail && $scope.data.fullName === $scope.$storage.sessionUser.fullName) {
            ngNotifier.error("account.errors.change");
            return;
        }
        if ($scope.forms.accountForm.inputEmail.$error.email){
            ngNotifier.error("account.errors.notAnEmail");
            return;
        }
        if ($scope.forms.accountForm.inputSecondaryEmail.$error.email){
            ngNotifier.error("account.errors.notASecondaryEmail");
            return;
        }
        if ($scope.data.email === $scope.data.secondaryEmail){
            ngNotifier.error("account.errors.sameEmail");
            return;
        }
        $.ajax({
            dataType: "text",
            url: "ServletUpdateUser?originalEmail=" + email + "&originalSecondaryEmail=" + secondaryEmail + "&email=" + $scope.data.email + "&fullName=" + $scope.data.fullName + "&secondaryEmail=" + $scope.data.secondaryEmail,
            success: function () {
                modifyUserSession();

            }
        });
    };
    
    $scope.deleteUser = function(){
        if ($scope.data.delete.email === "" || $scope.data.delete.password === ""){
            ngNotifier.error("account.errors.required");
            return;
        }
        if ($scope.data.delete.email !== email){
            ngNotifier.error("account.errors.notUser");
            return;
        }
        $.getJSON("ServletAuthenticate?email=" + $scope.data.delete.email + "&password=" + $scope.data.delete.password, {}, function (data) {
            if (!data.auth) {
                ngNotifier.error("account.errors.authDelete");
                return;
            }
            excludeAccount();
        });
    };


    $scope.updatePassword = function () {
        if ($scope.data.newPassword === "" || $scope.data.repeatNewPassword === "" || $scope.data.currentPassword === ""){
            ngNotifier.error("account.errors.required");
            return;
        }
        if ($scope.data.newPassword !== $scope.data.repeatNewPassword) {
            ngNotifier.error("signup.errors.notMatch");
            return;
        }
        if ($scope.data.newPassword === $scope.data.currentPassword) {
            ngNotifier.error("account.errors.samePassword");
            return;
        }
        $.getJSON("ServletAuthenticate?email=" + email + "&password=" + $scope.data.currentPassword, {}, function (data) {
            if (!data.auth) {
                ngNotifier.error("account.errors.auth");
                return;
            }
            setNewPassword();
        });
    };
    
    var excludeAccount = function(){
        $.ajax({
            dataType: "text",
            url: "ServletDeleteUser?email=" + email,
            success: function () {
                $('#modalDelete').modal('hide');
                $scope.$storage.exiting = true;
                $scope.$storage.pendingMessage = {msg: "account.delete", msgType: "warning"};
                $scope.$storage.$save();
                window.location.href = "index.jsp";
            }
        });
    };
    
    var setNewPassword = function(){
        $.ajax({
            dataType: "text",
            url: "ServletUpdatePassword?email=" + email + "&password=" + $scope.data.newPassword,
            success: function () {
                ngNotifier.notify("account.passwordSuccess");
                $scope.data.currentPassword = "";
                $scope.data.newPassword = "";
                $scope.data.repeatNewPassword = "";
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