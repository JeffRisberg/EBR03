import Ember from 'ember';

export default Ember.Route.extend({

    model: function (params) {
        var userId = params.user_id;

        //var configuration = this.modelFor('configured');
        //var currentSeason = configuration.get('currentSeason');
        //var currentWeekIndex = configuration.get('currentWeekIndex');

        // Get the chart data
        //var episodeVoteSummaries = this.get('store').query('episode-vote-summary/' + currentWeekIndex);

        var chartData = [];
        var chart;

        chart = {
            name: "Charity1",
            data: [
                {x: 1449101800, y: 10},
                {x: 1449706600, y: 20},
                {x: 1450311401, y: 30}
            ],
            color: 'red'
        };
        chartData.push(chart);

        chart = {
            name: "Charity2",
            data: [
                {x: 1449101800, y: 20},
                {x: 1449706600, y: 19},
                {x: 1450311401, y: 24}
            ],
            color: 'blue'
        };
        chartData.push(chart);

        chart = {
            name: "Charity3",
            data: [
                {x: 1449101800, y: 12},
                {x: 1449706600, y: 22},
                {x: 1450311401, y: 29}
            ],
            color: 'green'
        };
        chartData.push(chart);

        // check the episodeVoteSummaries
        /*
         var newChartData = {};
         episodeVoteSummaries.forEach(function (evs) {
         // get the series
         var series = evs.get("series");
         var seriesTitle = series.get("title");
         var chartData = newChartData[seriesTitle];

         if (chartData == null) {
         chartData = {};
         chartData.name = series.name;
         chartData.color = "green";
         newChartData[seriesTitle] = chartData;
         }

         // now add to the time values
         // to be written
         });
         console.log(newChartData);
         */

        Ember.run.scheduleOnce('afterRender', this, function () {
            console.log("beginAfterRender");

            /* jshint ignore:start */
            var graph = new Rickshaw.Graph({
                element: document.querySelector("#chart"),
                width: 540,
                height: 240,
                renderer: 'line',
                series: chartData
            });

            var x_axis = new Rickshaw.Graph.Axis.Time({graph: graph});

            var y_axis = new Rickshaw.Graph.Axis.Y({
                graph: graph,
                orientation: 'left',
                tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
                element: document.getElementById('y_axis')
            });

            var legend = new Rickshaw.Graph.Legend({
                element: document.querySelector('#legend'),
                graph: graph
            });

            console.log(graph);
            console.log(x_axis);
            console.log(y_axis);
            console.log(legend);

            graph.render();
            /* jshint ignore:end */
            console.log("endAfterRender");
        });

        return {
            chartData: chartData
        };
    },

    actions: {}
});