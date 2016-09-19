/**
 * Created by akilon on 4/14/16.
 */

angular.module("EstimationModule")
.factory("EstimationService", EstimationService);

EstimationService.$inject = ['$http', '$location'];

function EstimationService($http, $location) {
    return {
        create : function (project_id, data) {
            return $http.post('/estimation/create',
                {
                    project_id : project_id,
                    coatNo : data.coatNo,
                    coatName : data.coatName,
                    vs : data.vs,
                    dft : data.dft,
                    theoCoverage : data.theoCoverage,
                    wastageP : data.wastageP,
                    wastageMS : data.wastageMS,
                    areaMS : data.areaMS,
                    paintMS : data.paintMS,
                    paintLTR : data.paintLTR,
                    paintTotal : data.paintTotal,
                    thinnerMS : data.thinnerMS,
                    thinnerLTR : data.thinnerLTR,
                    thinnerTotal : data.thinnerTotal,
                    totalCostMS : data.totalCostMS,
                    totalCost : data.totalCost
                }
            );
        },
        getAll : function(id){
            return $http.get('/estimation/getAll/' + id);
        },
        getIdFromEndPoint : function(){
            var absoluteurl = $location.absUrl();
            var segments = absoluteurl.split("/");
            var projectId = segments[segments.length - 1];
            return projectId;
        },
        getItembyId : function(id){
            return $http.get('/estimation/get/' + id);
        },
        update : function (id, data) {
            return $http.put('/estimation/' + id,
                {
                    id : id,
                    project_id : data.project_id,
                    coatNo : data.coatNo,
                    coatName : data.coatName,
                    vs : data.vs,
                    dft : data.dft,
                    theoCoverage : data.theoCoverage,
                    wastageP : data.wastageP,
                    wastageMS : data.wastageMS,
                    areaMS : data.areaMS,
                    paintMS : data.paintMS,
                    paintLTR : data.paintLTR,
                    paintTotal : data.paintTotal,
                    thinnerMS : data.thinnerMS,
                    thinnerLTR : data.thinnerLTR,
                    thinnerTotal : data.thinnerTotal,
                    totalCostMS : data.totalCostMS,
                    totalCost : data.totalCost
                }
            );
        },
        remove : function (id) {
            return $http.delete('/estimation/' + id);
        }
    }
}