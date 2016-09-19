/**
 * Created by akilon on 9/18/16.
 */

angular.module("ExpenseModule")
    .controller("CreateController", CreateController);

CreateController.$inject = ['$window', '$scope', '$timeout', 'ExpenseService', 'ValidationService'];

function CreateController($window, $scope, $timeout, ExpenseService, ValidationService) {

    $scope.expense = {
        "name": "",
        "date": "",
        "branch_code": "",
        "bank_code": "",
        "bank_acc": "",
        "bank_accholder": ""
    };

    //$scope.expenseId = ExpenseService.getIdFromEndPoint();

    $scope.message = {
        containsSuccessfulMessage: false,
        successfulMessage: ""
    };

    $scope.validationResult = {
        containsValidationError: false,
        validationSummary: ""
    };

    function clear_expense() {
        $scope.expense.name = "";
        $scope.expense.date = "";
        $scope.expense.branch_code = "";
        $scope.expense.bank_code = "";
        $scope.expense.bank_acc = "";
        $scope.expense.bank_accholder = "";
    }

    function clearMessage() {
        $scope.message.containsSuccessfulMessage = false;
        $scope.message.successfulMessage = "";
    }

    function displayMessage() {
        $scope.message.containsSuccessfulMessage = true;
        $scope.message.successfulMessage = "A Record added successfully"
    }

    $scope.saveForm = function (expense) {
        var validationMessages = ValidationService.getValidationErrorMessage(
            [
                { name: $scope.expense.name || "", errorMessage: 'Please enter your name\n' },
                { name: $scope.expense.date || "", errorMessage: 'please enter a date\n' },
                { name: $scope.expense.branch_code || "", errorMessage: 'please enter your branch code\n' },
                { name: $scope.expense.bank_code || "", errorMessage: 'please enter your bank code\n' },
                { name: $scope.expense.bank_acc || "", errorMessage: 'please enter your bank account no.\n' },
                { name: $scope.expense.bank_accholder || "", errorMessage: 'please enter your bank account full name\n' }
            ]);

        if (validationMessages.length > 0) {
            $scope.validationResult.containsValidationError = true;
            angular.element("#validationErrorMessage").empty();
            validationMessages.forEach(function (errorMessage) {
                angular.element("<i></i>")
                    .html(errorMessage)
                    .appendTo("#validation ErrorMessage");
            });
        } else {
            $scope.validationResult.containsValidationError = false;
            $scope.expenses.push(expense);
            displayMessage();
                    
            $timeout(
                function afterTimeOut() {
                    clearMessage();
                    clearprogress();
                    $('#newExpense').hide();
                }
                , 5000);
        }
    }
}