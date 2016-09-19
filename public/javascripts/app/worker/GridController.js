/**
 * Created by Akilon on 4/15/16.
 */
angular.module("WorkerModule")
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

GridController.$inject = ['$window', '$scope', '$timeout', 'WorkerService'];

function GridController($window, $scope, $timeout, WorkerService) {

    $scope.worker = [];

    $scope.jobId = WorkerService.getIdFromEndPoint();

    $scope.currentPage = 1; //current page
    $scope.entryLimit = 5; //max no of items to display in a page
    $scope.filteredItems = $scope.worker.length; //Initially for no filter
    $scope.totalItems = $scope.worker.length;

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
        WorkerService.getAll(WorkerService.getIdFromEndPoint())
            .success(function(data){
                if(data && data.worker && data.worker.length > 0){
                    $scope.worker = data.worker;
                    $scope.totalItems = data.worker.length;
                    $scope.filteredItems = data.worker.length;
                }
                console.log(data);
            });
    }

    run();

    $scope.removeItem = function (projectProgressId, jobId) {
        if (confirm("Are you sure to delete?")) {
            WorkerService.remove(projectProgressId)
                .success(function (data) {
                    if (data.status && data.status == 'successful') {
                        $window.location.href = '/estimation/main/' + jobId;
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