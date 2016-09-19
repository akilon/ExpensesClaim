/**
 * Created by akilon on 4/14/16.
 */

angular.module("WorkerModule")
.factory("WorkerService", WorkerService);

WorkerService.$inject = ['$http', '$location'];

function WorkerService($http, $location) {
    return {
        create : function (id, worker) {
            return $http.post('/worker/create',
                {
                    job_id : id,
                    firstname : worker.firstname,
                    lastname : worker.lastname,
                    barcode : worker.barcode,
                    nationality : worker.nationality,
                    work_permit : worker.work_permit,
                    account_no : worker.account_no
                }
            );
        },
        getAll : function(id){
            return $http.get('/worker/getAll/' + id);
        },
        getIdFromEndPoint : function(){
            var absoluteurl = $location.absUrl();
            var segments = absoluteurl.split("/");
            var id = segments[segments.length - 1];
            return id;
        },
        getItembyId : function(id){
            return $http.get('/worker/get/' + id);
        },
        update : function (worker) {
            return $http.put('/worker/' + worker.id, worker);
        },
        remove : function (id) {
            return $http.delete('/worker/' + id);
        }
    }
}