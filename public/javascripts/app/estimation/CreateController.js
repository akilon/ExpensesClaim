/**
 * Created by akilon on 4/14/16.
 */

angular.module("EstimationModule")
.controller("CreateController", CreateController);

CreateController.$inject = ['$window', '$scope', '$timeout', 'EstimationService', 'ValidationService'];

function CreateController($window, $scope, $timeout, EstimationService, ValidationService){
    
    $scope.projectEstimation = {
        coatNo : "",
        coatName : "",
        vs : 0,
        dft : 0,
        theoCoverage : 0,
        wastageP : 0,
        wastageMS : 0,
        areaMS : 0,
        paintMS : 0,
        paintLTR : 0,
        paintTotal : 0,
        thinnerMS : 0,
        thinnerLTR : 0,
        thinnerTotal : 0,
        totalCostMS : 0,
        totalCost : 0
    };
    //Theo Coverage => =(C10*10/D10)
    $scope.theoCoverage = function() {
        $scope.projectEstimation.theoCoverage = ($scope.projectEstimation.vs * 10) / $scope.projectEstimation.dft;
        $scope.projectEstimation.theoCoverage = $scope.projectEstimation.theoCoverage ? $scope.projectEstimation.theoCoverage.toFixed(2) : 0;
        return $scope.projectEstimation.theoCoverage;
    };

    //Wastage M2/ltr => =E10*(1-F10)
    $scope.wastageMS = function() {
        $scope.projectEstimation.wastageMS = $scope.projectEstimation.theoCoverage * (1 - ($scope.projectEstimation.wastageP / 100));
        $scope.projectEstimation.wastageMS = $scope.projectEstimation.wastageMS ? $scope.projectEstimation.wastageMS.toFixed(2) : 0;
        return $scope.projectEstimation.wastageMS;
    };

    //Paint Cost M2/ltr => =E10*(1-F10)
    $scope.paintMS = function() {
        $scope.projectEstimation.paintMS = 1 / $scope.projectEstimation.wastageMS;
        $scope.projectEstimation.paintMS = ($scope.projectEstimation.paintMS && isFinite($scope.projectEstimation.paintMS)) ? $scope.projectEstimation.paintMS.toFixed(2) : 0;

        return $scope.projectEstimation.paintMS;
    };

    //Paint Cost LTR => =H10*I10
    $scope.paintLTR = function() {
        $scope.projectEstimation.paintLTR = $scope.projectEstimation.paintMS * $scope.projectEstimation.areaMS;
        $scope.projectEstimation.paintLTR = $scope.projectEstimation.paintLTR ? $scope.projectEstimation.paintLTR.toFixed(2) : 0;
        return $scope.projectEstimation.paintLTR;
    };

    //Thinner Cost MS => =I10*0.1
    $scope.thinnerMS = function() {
        $scope.projectEstimation.thinnerMS = $scope.projectEstimation.paintMS * 0.1;
        $scope.projectEstimation.thinnerMS = $scope.projectEstimation.thinnerMS ? $scope.projectEstimation.thinnerMS.toFixed(2) : 0;
        return $scope.projectEstimation.thinnerMS;
    };

    //Thinner Cost LTR => =L10*H10
    $scope.thinnerLTR = function() {
        $scope.projectEstimation.thinnerLTR = $scope.projectEstimation.thinnerMS * $scope.projectEstimation.areaMS;
        $scope.projectEstimation.thinnerLTR = $scope.projectEstimation.thinnerLTR ? $scope.projectEstimation.thinnerLTR.toFixed(2) : 0;
        return $scope.projectEstimation.thinnerLTR;
    };

    //Total Cost MS => =I10*K10+L10*N10
    $scope.totalCostMS = function() {
        $scope.projectEstimation.totalCostMS = ($scope.projectEstimation.paintMS * $scope.projectEstimation.paintTotal) + ($scope.projectEstimation.thinnerMS * $scope.projectEstimation.thinnerTotal);
        $scope.projectEstimation.totalCostMS = $scope.projectEstimation.totalCostMS ? $scope.projectEstimation.totalCostMS.toFixed(2) : 0;
        return $scope.projectEstimation.totalCostMS;
    };

    //Total Cost => =I10*K10+L10*N10
    $scope.totalCost = function() {
        $scope.projectEstimation.totalCost = $scope.projectEstimation.areaMS * $scope.projectEstimation.totalCostMS;
        $scope.projectEstimation.totalCost = $scope.projectEstimation.totalCost ? $scope.projectEstimation.totalCost.toFixed(2) : 0;
        return $scope.projectEstimation.totalCost;
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
    

    $scope.saveForm = function (projectEstimation) {

        var validationMessages = ValidationService.getValidationErrorMessage(
            [
                { name : $scope.projectEstimation.coatNo || "", errorMessage : 'please enter coat no\n'},
                { name : $scope.projectEstimation.coatName || "", errorMessage : 'please enter coat name\n'}
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

            console.log(projectEstimation);
            EstimationService.create(EstimationService.getIdFromEndPoint(), projectEstimation)
                .success(function (data) {
                    if (data.status && data.status == 'successful') displayMessage();
                    //$location.path('/projectEstimation/main' + EstimationService.getIdFromEndPoint());
                    $window.location.href = '/estimation/' + EstimationService.getIdFromEndPoint();
                    //$http.get('/projectEstimation/main/' + EstimationService.getIdFromEndPoint());

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