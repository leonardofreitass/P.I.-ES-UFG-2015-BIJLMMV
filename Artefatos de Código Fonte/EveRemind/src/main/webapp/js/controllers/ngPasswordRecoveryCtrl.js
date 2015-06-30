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

angular.module('everemindApp').controller('ngPasswordRecoveryCtrl', function ($scope, ngNotifier, $location) {
    $scope.data = {
        email: "",
        token: "",
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
