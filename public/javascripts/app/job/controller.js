/**
 * Created by Akilon on 4/15/16.
 */
angular.module("JobModule")
    .controller("JobController", JobController);

JobController.$inject = ['$scope', '$timeout', 'JobService'];

function JobController($scope, $timeout, JobService) {

    $scope.jobs = [];
    $scope.projects = [];

    function run() {
        JobService.getJobs()
            .success(function(data){
                if(data && data.jobs && data.jobs.length > 0){
                    $scope.jobs = data.jobs;
                }
            });
        
        JobService.getProjects()
            .success(function(data){
                if(data && data.projects && data.projects.length > 0){
                    $scope.projects = data.projects;
                }
            });

    }

    run();

}