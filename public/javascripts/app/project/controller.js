/**
 * Created by Akilon on 4/15/16.
 */
angular.module("ProjectModule")
    .controller("ProjectController", ProjectController);

ProjectController.$inject = ['$scope', '$timeout', 'ProjectService'];

function ProjectController($scope, $timeout, ProjectService) {

    $scope.projects = [];
    $scope.estimations = [];

    function run() {
        ProjectService.projects(ProjectService.getIdFromEndPoint())
            .success(function(data){
                if(data && data.projects && data.projects.length > 0){
                    $scope.projects = data.projects;
                }
            });
        
        ProjectService.estimations()
            .success(function(data){
                
                if(data && data.estimations && data.estimations.length > 0){
                    $scope.estimations = data.estimations;
                }
                data.estimations.forEach(function(d){
                    chartData(d);

                });
                //console.log(data.estimations);
            });
    }

    function chartData(estimations){
            ProjectService.progressChart(estimations.id)
            .success(function(data){
                if(data && data.progress && data.progress.length > 0){
                    estimations.chartData = data.progress;
                }

                //console.log(JSON.stringify(data.progress));
                createGraph(estimations);
            });
    }

    function createGraph(data){
        console.log(JSON.stringify(data));

        //$('#chart'+data.id+' svg').remove();
        var chart;
        nv.addGraph(function() {
            chart = nv.models.linePlusBarChart()
                .margin({top: 50, right: 80, bottom: 30, left: 80})
                .legendRightAxisHint(' (right axis)')
                .color(d3.scale.category10().range());

            chart.xAxis.tickFormat(function(d) {
                return d3.time.format('%d %b')(new Date(d))
            }).showMaxMin(false);

            chart.y2Axis.tickFormat(function(d) { return d3.format(',f')(d) });
            chart.bars.forceY([0]).padData(false);

            chart.x2Axis.tickFormat(function(d) {
                return d3.time.format('%d %b')(new Date(d))
            }).showMaxMin(false);

            d3.select("#chart" + data.id + " svg")
                .datum(data.chartData)
                .transition().duration(500).call(chart);

            nv.utils.windowResize(chart.update);

            chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });

            return chart;
        });
    }


    run();

}