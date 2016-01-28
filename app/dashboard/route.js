import Ember from 'ember';

/*global $:false */
/*global d3:false */
/*global Rickshaw:false */
export default Ember.Route.extend({

    model: function (params) {
        //var userId = params.user_id;
        console.log(params);

        var seriesData = [];
        var graph;

        //var configuration = this.modelFor('configured');
        //var currentSeason = configuration.get('currentSeason');
        var currentWeekIndex = 3;//configuration.get('currentWeekIndex');

        // Get the chart data
        this.get('store').query('charity-donation-summary', {startWeekIndex: currentWeekIndex, endWeekIndex: currentWeekIndex})
            .then(function (data) {
                var p = d3.scale.category10();
                var newChartData = {};
                var charityCount = 0;

                data.forEach(function (evs) {
                    // get the series
                    var charityTitle = evs.get("charityTitle");
                    var chartData = newChartData[charityTitle];

                    if (chartData == null) {
                        chartData = {};
                        chartData.name = charityTitle;
                        chartData.color = p(charityCount);
                        chartData.data = [];
                        newChartData[charityTitle] = chartData;
                        charityCount++;
                    }

                    // now add to the time values
                    chartData.data.push({x: evs.get("weekStartDate"), y: evs.get("rawScore")});
                });
                $.each(newChartData, function (k, v) {
                    seriesData.push(v);
                });
                graph.update();
                $('#legend').empty();
                new Rickshaw.Graph.Legend({
                    element: document.querySelector('#legend'),
                    graph: graph
                });
            });

        Ember.run.scheduleOnce('afterRender', this, function () {
            graph = new Rickshaw.Graph({
                element: document.querySelector("#chart"),
                width: 540,
                height: 240,
                renderer: 'line',
                series: seriesData
            });

            new Rickshaw.Graph.Axis.Time({graph: graph});

            new Rickshaw.Graph.Axis.Y({
                graph: graph,
                orientation: 'left',
                tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
                element: document.getElementById('y_axis')
            });

            new Rickshaw.Graph.Legend({
                element: document.querySelector('#legend'),
                graph: graph
            });

            graph.render();
        });

        return null;
    },

    actions: {}
});
