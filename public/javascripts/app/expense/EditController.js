/**
 * Created by akilon on 4/15/16.
 */
angular.module("ProgressModule")
.controller("EditController", EditController);

EditController.$inject = ['$scope', '$timeout', 'ProgressService', '$window', 'ValidationService'];

function EditController($scope, $timeout, ProgressService, $window, ValidationService){

    $scope.progress = {
        total_manpower : "",
        total_paint : "",
        total_metresquare : "",
        remarks : "",
        progressId : ProgressService.getIdFromEndPoint()
    };

    $scope.job_id = ProgressService.getIdFromEndPoint(2);

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
    function bindView(progress){
        $scope.progress.total_manpower = progress.total_manpower;
        $scope.progress.total_paint = progress.total_paint;
        $scope.progress.total_metresquare = progress.total_metresquare;
        $scope.progress.remarks = progress.remarks;
        $scope.progress.project_id = progress.project_id;
    }
    
    function getItembyId(){
        ProgressService.getItembyId(ProgressService.getIdFromEndPoint())
            .success(function(data){
                if (data && data.progress && data.progress.length > 0){
                    bindView(data.progress[0]);

                    console.log(data.progress[0])
                }
            });
    }

    getItembyId();

    $scope.saveForm = function (progress) {
        var validationMessages = ValidationService.getValidationErrorMessage([
                { name : $scope.progress.total_manpower || "", errorMessage : 'please enter man power\n'},
                { name : $scope.progress.total_paint || "", errorMessage : 'please enter total paint\n'},
                { name : $scope.progress.total_metresquare || "", errorMessage : 'please enter total metresquare\n'},
                { name : $scope.progress.remarks || "", errorMessage : 'please enter remarks\n'}
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
            ProgressService.update(ProgressService.getIdFromEndPoint(),progress)
                .success(function (data) {
                    if (data.status && data.status == 'successful') {
                        $window.location.href = '/progress/main/' + $scope.job_id + '/' + progress.project_id;
                    }
                    $timeout(
                        function afterTimeOut() {
                            clearMessage();
                            //clearprogress();
                        }
                    , 5000);
                });
        }
    }
}

