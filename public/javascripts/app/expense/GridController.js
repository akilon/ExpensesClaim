/**
 * Created by Akilon on 9/18/16.
 */
angular.module("ExpenseModule")
.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
})
.filter('sumOfValue', function () {
    return function (data, key) { 
        if (angular.isUndefined(data) && angular.isUndefined(key))
            return 0;        
        var sum = 0;        
        angular.forEach(data,function(value){
            if(value.expenseId === key)
                sum = sum + value['amountInRM'];
        });        
        return sum.toFixed(2);
    }
})
.controller("GridController", GridController);

GridController.$inject = ['$window', '$scope', '$timeout', 'ExpenseService', 'ValidationService'];

function GridController($window, $scope, $timeout, ExpenseService, ValidationService) {

    $scope.expenses = [];
    $scope.expenseId = '';
   
   // $scope.list = data;
    $scope.currentPage = 1; //current page
    $scope.entryLimit = 10; //max no of items to display in a page
    $scope.filteredItems = $scope.expenses.length; //Initially for no filter
    $scope.totalItems = $scope.expenses.length;

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

    function run(){
        ExpenseService.getAll()
            .success(function(data){
                if(data && data.expenses && data.expenses.length > 0){
                    $scope.expenses = data.expenses;
                    $scope.totalItems = data.expenses.length;
                    $scope.filteredItems = data.expenses.length;
                }
            });

        ExpenseService.getCurrency()
            .success(function(data){
                if(data){
                    $scope.currencies = data.rates;
                    $scope.currencies.MYR = 1;
                    console.log($scope.currencies);
                }
            });

    };
    run();


    //Create
    $scope.expense = {
        "name": "",
        "date": "",
        "branch_code": "",
        "bank_code": "",
        "bank_acc": "",
        "bank_accholder": ""
    };

    $scope.message = {
        containsSuccessfulMessage: false,
        successfulMessage: ""
    };

    $scope.validationResult = {
        containsValidationError: false,
        validationSummary: ""
    };

    function clearExpense() {
        $scope.expense.name = "";
        $scope.expense.date = "";
        $scope.expense.branch_code = "";
        $scope.expense.bank_code = "";
        $scope.expense.bank_acc = "";
        $scope.expense.bank_accholder = "";
    };


    function clearMessage() {
        $scope.validationResult.containsValidationError = false;
        $scope.message.containsSuccessfulMessage = false;
        $scope.message.successfulMessage = "";
    };

    $('.modal').on('hidden.bs.modal', function () {
        clearMessage();
    })

    function displayMessage() {
        $scope.message.containsSuccessfulMessage = true;
        $scope.message.successfulMessage = "A Record added successfully"
    };

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
                angular.element("<li></li>")
                    .html(errorMessage)
                    .appendTo("#validationErrorMessage");
            });
        } else {
            $scope.validationResult.containsValidationError = false;
            $scope.expenses.push({
                "id" : Math.max.apply(Math,$scope.expenses.map(function(o){return o.id;})) + 1,
                "name" : expense.name,
                "date": expense.date,
                "branch_code": expense.branch_code,
                "bank_code": expense.bank_code,
                "bank_acc": expense.bank_acc,
                "bank_accholder": expense.bank_accholder,
                "total" : "00.00"
            });
            $('#newExpense').modal('hide');
            //displayMessage();
                    
            $timeout(
                function afterTimeOut() {
                    //clearMessage();
                    clearExpense();
                    
                }, 1000);
        }
    };


    //EXPENSEITEMS
    $scope.expenseItem = {
        id : "",
        date : "",
        costCenter : "",
        glcode : "",
        desc : "",
        currency : "",
        amount : "",
        gst : 6,
        fxrate : "",
        amountInRM : ""
    };

    $scope.expenseItems = [];

    $scope.setExpenseID = function(a){
        $scope.expenseId = a;
        console.log($scope.expenseId);
    };

    $scope.expenseItemsFilter = function (a) { 
        return a.expenseId === $scope.expenseId; 
    };

    function clearExpenseItems() {
        $scope.expenseItem.date = "";
        $scope.expenseItem.costCenter = "";
        $scope.expenseItem.glcode = "";
        $scope.expenseItem.desc = "";
        $scope.expenseItem.currency = "";
        $scope.expenseItem.amount = "";
    };

    $scope.glcodes = [
     { id : 4165, name : 'Staff Reimbursement Mobile Claim - Mobile phone charges' },
     { id : 4190, name : 'Postage'},
     { id : 4191, name : 'Couriers'},
     { id : 4200, name : 'Stationery'},
     { id : 4311, name : 'International Fares - Oversea Air-ticket'},
     { id : 4312, name : 'International Accomodation - Oversea hotel'},
     { id : 4313, name : 'International Expenses - Oversea Transports and Meals Expense'},
     { id : 4321, name : 'Local Fares - Taxi claim (client & candidate visit)'},
     { id : 4001, name : 'Local Accomodation'},
     { id : 4002, name : 'Local Expenses - OT meal'},
     { id : 4003, name : 'Staff Incentives'},
     { id : 4004, name : 'Staff flowers / Gifts - Gift / Bday cake for staff'},
     { id : 4005, name : 'Candidate Flowers / Gifts - Meals with Candidates'},
     { id : 4006, name : 'Entertainment - Clients (Meals with Client)'},
     { id : 4007, name : 'Entertainment - Staff (Meals with Team / Staff)'},
     { id : 4008, name : 'Subscriptions'},
     { id : 4009, name : 'Memberships'}
    ];

    $scope.saveExpenseItemForm = function (expenseItem) {
        var validationMessages = ValidationService.getValidationErrorMessage(
            [
                { name: $scope.expenseItem.costCenter || "", errorMessage: 'Please enter a Cost Center\n' },
                { name: $scope.expenseItem.date || "", errorMessage: 'please enter a date\n' },
                { name: $scope.expenseItem.glcode || "", errorMessage: 'please enter a GL Code\n' },
                { name: $scope.expenseItem.desc || "", errorMessage: 'please enter a description\n' },
                { name: $scope.expenseItem.currency || "", errorMessage: 'please enter a currency\n' },
                { name: $scope.expenseItem.amount || "", errorMessage: 'please enter the amount\n' }
            ]);

        if (validationMessages.length > 0) {
            $scope.validationResult.containsValidationError = true;
            angular.element("#validationErrorMessage2").empty();
            validationMessages.forEach(function (errorMessage) {
                angular.element("<li></li>")
                    .html(errorMessage)
                    .appendTo("#validationErrorMessage2");
            });
        } else {
            $scope.validationResult.containsValidationError = false;

            $scope.expenseItems.push({
                "expenseId" : $scope.expenseId,
                "id" : $scope.expenseItems.length > 0 ? Math.max.apply(Math,$scope.expenseItems.map(function(o){return o.id;})) + 1 : 1,
                "date" : expenseItem.date,
                "costCenter" : expenseItem.costCenter,
                "glcode" : expenseItem.glcode,
                "desc" : expenseItem.desc,
                "currency" : expenseItem.currency,
                "amount" : expenseItem.amount,
                "gst" : 6,
                "fxrate" : $scope.currencies[expenseItem.currency],
                "amountInRM" : expenseItem.amount / $scope.currencies[expenseItem.currency]
            });

            clearExpenseItems();  

            function test(){
                return $scope.expenseItems.filter(function(a){
                    return a.expenseId === $scope.expenseId;
                }).reduce(function(a, v){
                    return a + v.amountInRM;
                }, 0);
            }


            $scope.expenses.filter(function(a){
                return a.id === $scope.expenseId;
            }).map(function(a){
                a.total = test().toFixed(2);
            });

            
            //displayMessage();
                    
            /*$timeout(
                function afterTimeOut() {
                    clearMessage();                  
                }, 2000);*/
        }
    };



}