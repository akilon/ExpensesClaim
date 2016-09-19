/**
 * Created by akilon on 4/16/16.
 */

angular.module("ExpenseModule")
    .factory("ValidationService", ValidationService);

function ValidationService(){

    function _getValidationMessage(requiredInfos){
        var errorMessages = [];
        
        if (requiredInfos.length > 0){
            angular.forEach(requiredInfos, function(requiredInfo){

                if (requiredInfo.name !== 'undefined' &&
                    (requiredInfo.name === null ||
                    requiredInfo.name == '' ||
                    requiredInfo.name.length == 0)){

                        errorMessages.push(requiredInfo.errorMessage);
                }
            });
        }

        console.log(errorMessages);
        return errorMessages;
    }

    return {
        getValidationErrorMessage : _getValidationMessage
    };
}
