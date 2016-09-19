/**
 * Created by akilon on 4/15/16.
 */
angular.module("WorkerModule")
.controller("EditController", EditController);

EditController.$inject = ['$scope', '$timeout', 'WorkerService', '$window', 'ValidationService'];

function EditController($scope, $timeout, WorkerService, $window, ValidationService){

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

    function bindView(data){
        $scope.worker = data;
    }
    
    function run(){
        WorkerService.getItembyId(WorkerService.getIdFromEndPoint())
            .success(function(data){
                if (data && data.worker && data.worker.length > 0){
                    bindView(data.worker[0]);
                }
            });
    }

    run();

    $scope.saveForm = function (worker) {
        var validationMessages = ValidationService.getValidationErrorMessage([
                { name : $scope.worker.firstname || "", errorMessage : 'please enter man power\n'},
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
            $scope.validationResult.containsValidationError = false;
            WorkerService.update(worker)
                .success(function (data) {
                    if (data.status && data.status == 'successful') {
                        $window.location.href = '/worker/' + worker.job_id;
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

