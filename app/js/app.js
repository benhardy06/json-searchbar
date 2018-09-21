var app = angular.module('app', ['ngRoute', 'ngSanitize'])

app.factory('_', ['$window', function ($window) {
    return $window._;
}]);