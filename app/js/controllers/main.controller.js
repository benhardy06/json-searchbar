app.controller("mainController", ['$scope', 'searchJson', 'mainService','$location',
    function($scope, searchJson, mainService, $location){
        $scope.data;
        $scope.searchTerm='';
        $scope.results = searchJson.results;
        $scope.tool = false;
        mainService.then(function(response) {
            $scope.data = response;
        })
        $scope.searchThis=function(term, data){
            
            
                searchJson.results = $scope.results = searchJson.search(term, data)
    //            $scope.results = searchJson.search(term, data)
                if(searchJson.results.data.length >0){
                    $location.url('/results');
                }else{
                    $scope.tool = true;
                }
            
        }
        $scope.$watch('searchTerm', function(newV) {
            if($location.url() != "/results") {
                 $scope.tool = false;
                $scope.results = searchJson.search(newV, $scope.data);   
                console.log($scope.results)
            }
        })
        
    }]);


