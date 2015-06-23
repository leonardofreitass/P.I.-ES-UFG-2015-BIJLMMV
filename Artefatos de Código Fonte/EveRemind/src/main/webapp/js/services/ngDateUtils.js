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

angular.module('everemindApp').factory('ngDateUtils', function () {
    return {
        onlyDay: function(day){
            return this.jsonfyDate(day).d;
        },
        jsonfyDate: function(date){
            var y = parseInt(date.substring(date.lastIndexOf("/") + 1));
            var m = parseInt(date.substring(date.indexOf("/") + 1, date.lastIndexOf("/")));
            var d = parseInt(date.substring(0, date.indexOf("/")));
            return {
                d: d,
                m: m,
                y: y
            };
        },
        getTodayJson: function(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
            var yyyy = today.getFullYear();
            return {
                d: dd,
                m: mm,
                y: yyyy
            };
        },
        isBeforeToday: function(date){
            var jsonDate = this.jsonfyDate(date);
            var todayJson = this.getTodayJson();
            var dateA = new Date(jsonDate.y, jsonDate.m - 1, jsonDate.d).getTime();
            var dateB = new Date(todayJson.y, todayJson.m - 1, todayJson.d).getTime();
            return dateA < dateB;
        },
        isToday: function(date){
            var jsonDate = this.jsonfyDate(date);
            var todayJson = this.getTodayJson();
            return (jsonDate.d === todayJson.d && jsonDate.m === todayJson.m && jsonDate.y === todayJson.y);
        }
    };
});