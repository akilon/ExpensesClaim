/**
 * Created by akilon on 4/14/16.
 */

angular.module("WorkerModule")
.controller("CreateController", CreateController);

CreateController.$inject = ['$window', '$scope', '$timeout', 'WorkerService', 'ValidationService'];

function CreateController($window, $scope, $timeout, WorkerService, ValidationService){
    
    $scope.worker = {
        firstname : "",
        lastname : "",
        nationality : "",
        work_permit : "",
        account_no : "",
        barcode : ""
    };

    $scope.message = {
        containsSuccessfulMessage : false,
        successfulMessage : ""
    };

    $scope.validationResult = {
        containsValidationError : false,
        validationSummary : ""
    };

    function clearMessage(){
        $scope.message.containsSuccessfulMessage = false;
        $scope.message.successfulMessage = "";
    }

    function displayMessage(){
        $scope.message.containsSuccessfulMessage = true;
        $scope.message.successfulMessage = "A Record added successfully"
    }
    
    $scope.saveForm = function (worker) {

        var validationMessages = ValidationService.getValidationErrorMessage([
                { name : $scope.worker.firstname || "", errorMessage : 'please enter first name\n'},
                { name : $scope.worker.lastname || "", errorMessage : 'please enter last name\n'}
            ]);

        if (validationMessages.length > 0) {
            $scope.validationResult.containsValidationError = true;
            angular.element("#validationErrorMessage").empty();
            validationMessages.forEach(function(errorMessage) {
                angular.element("<i></i>")
                    .html(errorMessage)
                    .appendTo("#validationErrorMessage");
            });

        } else {

            worker.job_id = WorkerService.getIdFromEndPoint();

            $scope.validationResult.containsValidationError = false;
            WorkerService.create(WorkerService.getIdFromEndPoint(), worker)
                .success(function (data) {
                    if (data.status && data.status == 'successful') displayMessage();
                    //$location.path('/projectEstimation/main' + WorkerService.getIdFromEndPoint());
                    $window.location.href = '/#j' + WorkerService.getIdFromEndPoint();
                    //$http.get('/projectEstimation/main/' + WorkerService.getIdFromEndPoint());

                    $timeout(
                        function afterTimeOut() {
                            clearMessage();
                            clearprojectEstimation();
                        }
                    , 5000);
                });

        }

    }
}