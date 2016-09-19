/**
 * Created by akilon on 4/14/16.
 */

angular.module("EstimationModule")
.controller("EditController", EditController);

EditController.$inject = ['$window', '$scope', '$timeout', 'EstimationService', 'ValidationService'];

function EditController($window, $scope, $timeout, EstimationService, ValidationService){
    
    $scope.estimation = {
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
        $scope.estimation.theoCoverage = ($scope.estimation.vs * 10) / $scope.estimation.dft;
        $scope.estimation.theoCoverage = $scope.estimation.theoCoverage ? $scope.estimation.theoCoverage.toFixed(2) : 0;
        return $scope.estimation.theoCoverage;
    };

    //Wastage M2/ltr => =E10*(1-F10)
    $scope.wastageMS = function() {
        $scope.estimation.wastageMS = $scope.estimation.theoCoverage * (1 - ($scope.estimation.wastageP / 100));
        $scope.estimation.wastageMS = $scope.estimation.wastageMS ? $scope.estimation.wastageMS.toFixed(2) : 0;
        return $scope.estimation.wastageMS;
    };

    //Paint Cost M2/ltr => =E10*(1-F10)
    $scope.paintMS = function() {
        $scope.estimation.paintMS = 1 / $scope.estimation.wastageMS;
        $scope.estimation.paintMS = ($scope.estimation.paintMS && isFinite($scope.estimation.paintMS)) ? $scope.estimation.paintMS.toFixed(2) : 0;

        return $scope.estimation.paintMS;
    };

    //Paint Cost LTR => =H10*I10
    $scope.paintLTR = function() {
        $scope.estimation.paintLTR = $scope.estimation.paintMS * $scope.estimation.areaMS;
        $scope.estimation.paintLTR = $scope.estimation.paintLTR ? $scope.estimation.paintLTR.toFixed(2) : 0;
        return $scope.estimation.paintLTR;
    };

    //Thinner Cost MS => =I10*0.1
    $scope.thinnerMS = function() {
        $scope.estimation.thinnerMS = $scope.estimation.paintMS * 0.1;
        $scope.estimation.thinnerMS = $scope.estimation.thinnerMS ? $scope.estimation.thinnerMS.toFixed(2) : 0;
        return $scope.estimation.thinnerMS;
    };

    //Thinner Cost LTR => =L10*H10
    $scope.thinnerLTR = function() {
        $scope.estimation.thinnerLTR = $scope.estimation.thinnerMS * $scope.estimation.areaMS;
        $scope.estimation.thinnerLTR = $scope.estimation.thinnerLTR ? $scope.estimation.thinnerLTR.toFixed(2) : 0;
        return $scope.estimation.thinnerLTR;
    };

    //Total Cost MS => =I10*K10+L10*N10
    $scope.totalCostMS = function() {
        $scope.estimation.totalCostMS = ($scope.estimation.paintMS * $scope.estimation.paintTotal) + ($scope.estimation.thinnerMS * $scope.estimation.thinnerTotal);
        $scope.estimation.totalCostMS = $scope.estimation.totalCostMS ? $scope.estimation.totalCostMS.toFixed(2) : 0;
        return $scope.estimation.totalCostMS;
    };

    //Total Cost => =I10*K10+L10*N10
    $scope.totalCost = function() {
        $scope.estimation.totalCost = $scope.estimation.areaMS * $scope.estimation.totalCostMS;
        $scope.estimation.totalCost = $scope.estimation.totalCost ? $scope.estimation.totalCost.toFixed(2) : 0;
        return $scope.estimation.totalCost;
    };

    function getItembyId(){
        EstimationService.getItembyId(EstimationService.getIdFromEndPoint())
            .success(function(data){
                if (data){
                    $scope.estimation = {
                        id: data.estimation[0].id,
                        project_id: data.estimation[0].project_id,
                        coatNo : data.estimation[0].coatNo,
                        coatName : data.estimation[0].coatName,
                        vs : data.estimation[0].vs,
                        dft : data.estimation[0].dft,
                        theoCoverage : data.estimation[0].theoCoverage,
                        wastageP : data.estimation[0].wastageP,
                        wastageMS : data.estimation[0].wastageMS,
                        areaMS : data.estimation[0].areaMS,
                        paintMS : data.estimation[0].paintMS,
                        paintLTR : data.estimation[0].paintLTR,
                        paintTotal : data.estimation[0].paintTotal,
                        thinnerMS : data.estimation[0].thinnerMS,
                        thinnerLTR : data.estimation[0].thinnerLTR,
                        thinnerTotal : data.estimation[0].thinnerTotal,
                        totalCostMS : data.estimation[0].totalCostMS,
                        totalCost : data.estimation[0].totalCost
                    };

                    $scope.project_id = data.estimation[0].project_id;
                }

            });
    }

    getItembyId();

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

    $scope.saveForm = function (formdata) {

        var validationMessages = ValidationService.getValidationErrorMessage(
            [
                { name : $scope.estimation.coatNo || "", errorMessage : 'please enter coat no\n'},
                { name : $scope.estimation.coatName || "", errorMessage : 'please enter coat name\n'}
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

            EstimationService.update(EstimationService.getIdFromEndPoint(), formdata)
                .success(function (d) {
                    if (d.status && d.status == 'successful') displayMessage();
                    //$location.path('/coats/main' + EstimationService.getIdFromEndPoint());
                    $window.location.href = '/estimation/' + $scope.project_id;
                    //$http.get('/coats/main/' + EstimationService.getIdFromEndPoint());

                    $timeout(
                        function afterTimeOut() {
                            clearMessage();
                            clearcoats();
                        }
                    , 5000);
                });

        }

    }
}