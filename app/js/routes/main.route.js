app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl:'pages/home.html',
        controller:'mainController'
    })
    .when("/results", {
        templateUrl:'pages/results.html',
        controller:'mainController'
    })
})