/**
 * Created by Akilon on 4/15/16.
 */
angular.module("EstimationModule")
.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
})
.controller("GridController", GridController);

GridController.$inject = ['$window', '$scope', '$timeout', 'EstimationService'];

function GridController($window, $scope, $timeout, EstimationService) {

    $scope.projectEstimation = [];
    $scope.projectId = EstimationService.getIdFromEndPoint();

   // $scope.list = data;
    $scope.currentPage = 1; //current page
    $scope.entryLimit = 5; //max no of items to display in a page
    $scope.filteredItems = $scope.projectEstimation.length; //Initially for no filter
    $scope.totalItems = $scope.projectEstimation.length;

    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() {
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };

    function run() {
        EstimationService.getAll(EstimationService.getIdFromEndPoint())
            .success(function(data){
                if(data && data.projectEstimation && data.projectEstimation.length > 0){
                    $scope.projectEstimation = data.projectEstimation;
                    $scope.totalItems = data.projectEstimation.length;
                    $scope.filteredItems = data.projectEstimation.length;

                    $scope.totalDFT = 0;
                    $scope.totalPaintCost = 0;
                    for (var i in data.projectEstimation){
                        $scope.totalDFT += parseInt(data.projectEstimation[i].dft, 10);
                        $scope.totalPaintCost += parseInt(data.projectEstimation[i].totalCost, 10);
                    }
                }
            });
    }

    run();
    
    $scope.removeItem = function (projectProgressId, projectId) {

        if (confirm("Are you sure to delete?")) {

            EstimationService.remove(projectProgressId)
                .success(function (data) {
                    if (data.status && data.status == 'successful') {
                        $window.location.href = '/estimation/main/' + projectId;
                    }
                    $timeout(
                        function afterTimeOut() {
                            clearMessage();
                            //clearprojectProgress();
                        }
                        , 5000);
                });
        }
    }
}