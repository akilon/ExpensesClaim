/**
 * Created by akilon on 9/18/16.
 */

angular.module("ExpenseModule")
.factory("ExpenseService", ExpenseService);

ExpenseService.$inject = ['$http', '$location'];

function ExpenseService($http, $location) {
    return {
        getAll : function(id){
            return $http.get('/expense/getAll');
        },
        getGLcodes : function(){
            return $http.get('/expense/getGLcodes');
        },
        getCurrency : function () {
            return $http.get('http://api.fixer.io/latest?base=MYR');
        }
    }
}