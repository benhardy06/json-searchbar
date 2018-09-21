app.service('mainService', ['$http', function($http) {
    return $http.get('js/services/data.json')
        .then(function(response) {
            console.log('200') 
            var data = response;
            return data;
        })

}]);