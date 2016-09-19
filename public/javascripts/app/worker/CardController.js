/**
 * Created by akilon on 4/15/16.
 */
angular.module("WorkerModule")
.controller("CardController", CardController);

CardController.$inject = ['$scope', '$timeout', 'WorkerService'];

function CardController($scope, $timeout, WorkerService){

    $scope.worker_id = 123;

}

