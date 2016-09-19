/**
 * Created by akilon on 4/14/16.
 */

angular.module("ProjectModule")
.factory("ProjectService", ProjectService);

ProjectService.$inject = ['$http', '$location'];

function ProjectService($http, $location) {
    return {
        projects : function(jobId){
            return $http.get('/project/projects/'+jobId);
        },
        estimations : function(){
            return $http.get('/project/estimations');
        },
        progressChart : function(projectId){
            return $http.get('/project/progresschart/'+projectId);
        },
        getIdFromEndPoint : function(){
            var absoluteurl = $location.absUrl();
            var segments = absoluteurl.split("/");
            var projectId = segments[segments.length - 1];
            return projectId;
        }
    }
}