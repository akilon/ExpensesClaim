/**
 * Created by akilon on 4/15/16.
 */
angular.module("projectProgressModule")
.controller("yoDisplayController", yoDisplayController);

yoDisplayController.$inject = ['$scope', '$timeout', 'yoService'];

function yoDisplayController($scope, $timeout, yoService){

    $scope.projectProgress = {
        categoryName : "",
        categoryDetails : "",
        categoryID : yoService.getIdFromEndPoint()
    };
    
    getItembyId();

    function bindView(projectProgress){
        $scope.projectProgress.categoryName = projectProgress.CategoryName;
        $scope.projectProgress.categoryDetails = projectProgress.Details;

    }
    
    function getItembyId(){
        yoService.getItembyId(yoService.getIdFromEndPoint())
            .success(function(data){

                if (data && data.projectProgress && data.projectProgress.length > 0){
                    bindView(data.projectProgress[0]);
                }
            });
    }

}

