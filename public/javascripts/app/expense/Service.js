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
        getIdFromEndPoint : function(pos = 1){
            var absoluteurl = $location.absUrl();
            var segments = absoluteurl.split("/");
            var projectId = segments[segments.length - pos];
            return projectId;
        },
        getItembyId : function(id){
            return $http.get('/progress/get/' + id);  
        },
        getCurrency : function () {
            return $http.get('http://api.fixer.io/latest?base=MYR');
        },
        remove : function (id) {
            return $http.delete('/progress/' + id);
        } 
    }
}