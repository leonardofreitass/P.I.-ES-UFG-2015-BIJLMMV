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

angular.module('everemindApp').directive('bsDynamicPopover', function(translateFilter, $compile) {
    return {
        scope: {
            config: '=bsDynamicPopover'
        },
        link: function (scope, elem) {
            var placement = scope.config.placement;
            if(!placement)
                placement = "bottom";
            elem.popover({title: translateFilter(scope.config.title), content: translateFilter(scope.config.content), placement: placement, html: true, trigger: "hover"});
        }
    };
}).
directive('bsDynamicTooltip', function (translateFilter) {
    return {
        scope: {
            config: '=bsDynamicTooltip'
        },
        link: function (scope, elem) {
            var placement = scope.config.placement;
            if(!placement)
                placement = "bottom";
            elem.tooltip({title: translateFilter(scope.config.title), placement: placement});
        }
    };
}).
directive('spPalette', function () {
    return {
        require: "ngModel",
        link: function (scope, elem, attrs, ngModel) {
            elem.spectrum({
                showPaletteOnly: true,
                showPalette: true,
                color: 'rgb(255, 255, 255)',
                palette: [
                    ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc", "#fff"],
                    ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd", "#eee"],
                    ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0", "#ccc"]
                ],
                move: function(color){
                    ngModel.$setViewValue("" + color);
                }
            });
        }
    };
}).
directive('bsDatepicker', function () {
    return {
        link: function (scope, elem) {
            elem.datepicker({
                startDate: "today",
                language: "pt-BR",
                format: "dd/mm/yyyy",
                toggleActive: true
            });
        }
    };
}).
directive('bsTimepicker', function () {
    return {
        scope: {
            appendTo: "=bsTimepicker"
        },
        link: function (scope, elem) {
            elem.timepicker({
                minuteStep: 1,
                appendWidgetTo: scope.appendTo,
                showMeridian: false,
                defaultTime: false,
                modalBackdrop: true
            });
        }
    };
}).
directive('bsDynamicSwitch', function (translateFilter) {
    return {
        scope: {
            config: '=bsDynamicSwitch'
        },
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.bootstrapSwitch({
                onColor: scope.config.onColor,
                offColor: scope.config.offColor,
                onText: translateFilter(scope.config.onText),
                offText: translateFilter(scope.config.offText)
            });
            
            element.on('switchChange.bootstrapSwitch', function(event, state) {
                if (ngModel) {
                    scope.$apply(function() {
                        ngModel.$setViewValue(state);
                    });
                }
            });

            scope.$watch(attrs.ngModel, function(newValue, oldValue) {
                if (newValue) {
                    element.bootstrapSwitch('state', true, true);
                } else {
                    element.bootstrapSwitch('state', false, true);
                }
            });

        }
    };
});