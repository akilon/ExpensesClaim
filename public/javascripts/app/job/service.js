/**
 * Created by akilon on 4/14/16.
 */

angular.module("JobModule")
.factory("JobService", JobService);

JobService.$inject = ['$http', '$location'];

function JobService($http, $location) {
    return {
        getJobs : function(){
            return $http.get('/jobs/jobs');
        },
        getProjects : function(){
            return $http.get('/jobs/projects');
        },
        getIdFromEndPoint : function(){
            var absoluteurl = $location.absUrl();
            var segments = absoluteurl.split("/");
            var projectId = segments[segments.length - 1];
            return projectId;
        }
    }
}