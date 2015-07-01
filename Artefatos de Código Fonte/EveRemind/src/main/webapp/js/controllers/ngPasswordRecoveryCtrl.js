/* 
 * The MIT License
 *
 * Copyright 2015 Igor.
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

angular.module('everemindApp').controller('ngPasswordRecoveryCtrl', function ($scope, ngNotifier, $localStorage) {
    $scope.$storage = $localStorage;
    
    $scope.data = {
        email: "",
        token: "",
        newPassword: "",
        repeatNewPassword: "",
        verified: false
    };

    $scope.recover = function () {
        if ($scope.data.email === "" || $scope.data.token === "") {
            ngNotifier.error("passwordRecover.empty");
            return;
        }
        $.getJSON("ServletCheckToken?email=" + $scope.data.email +
                "&token=" + $scope.data.token +
                "&type=Recover", {}, function (data) {
            if (!data.binded) {
                ngNotifier.error("passwordRecover.checkError");
                return;
            }
            proceedRecover();
        });
    };
    
    $scope.updatePassword = function () {
        if ($scope.data.newPassword !== $scope.data.repeatNewPassword) {
            ngNotifier.error("signup.errors.notMatch");
            return;
        }
        var onlyLN = /^([a-zA-Z0-9]+)$/;
        var hasL = /[A-Z]/i;
        var hasN = /\d/;
        if ($scope.data.newPassword.length < 8 || !onlyLN.test($scope.data.newPassword) || !hasL.test($scope.data.newPassword) || !hasN.test($scope.data.newPassword)) {
            ngNotifier.error("signup.errors.passwordRegex");
            return;
        }
        $.ajax({
            dataType: "text",
            url: "ServletRecoverPassword?email=" + $scope.data.email + "&password=" + $scope.data.newPassword,
            success: function () {
                $scope.$storage.pendingMessage = {msg: "account.passwordSuccess", msgType: "notify"};
                $scope.$storage.$save();
                window.location.href = "index.jsp";
            }
        });
    };

    var proceedRecover = function () {
        $.ajax({
            dataType: "text",
            url: "ServletRecoverPassword?email=" + $scope.data.email,
            success: function () {
                finishVerify();
            }
        });
    };

    var finishVerify = function () {
        $scope.data.verified = true;
        $scope.$apply();
    };
});
