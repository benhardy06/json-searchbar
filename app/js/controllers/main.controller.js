app.controller("mainController", ['$scope', 'searchJson', 'mainService','$location',
    function($scope, searchJson, mainService, $location){
        $scope.data;
        $scope.searchTerm='';
        $scope.results = searchJson.results;
        mainService.then(function(response) {
            $scope.data = response;
        })
        $scope.searchThis=function(term, data){
            searchJson.results = $scope.results = searchJson.search(term, data)
//            $scope.results = searchJson.search(term, data)
            $location.url('/results');
        }
        $scope.$watch('searchTerm', function(newV) {
            if($location.url() != "/results") {
                $scope.results = searchJson.search(newV, $scope.data);   
                console.log($scope.results)
            }
        })
    }]);


