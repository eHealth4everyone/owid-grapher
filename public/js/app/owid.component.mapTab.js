;(function(d3) {
    "use strict";
    owid.namespace("owid.mapTab.mapTab");

    owid.component.mapTab = function(chart) {
        var mapTab = owid.dataflow();

        mapTab.requires('containerNode', 'bounds', 'colorData', 'years', 'inputYear', 'legendData', 'legendTitle', 'projection', 'defaultFill');

        mapTab.initial('map', function() { return owid.view.map(); });
        mapTab.initial('legend', function() { return owid.view.mapLegend(); });
        mapTab.initial('timeline', function() { 
            var timeline = owid.view.timeline(); 

            timeline.flow('targetYear', function(targetYear) {
                chart.map.set('targetYear', targetYear);
            });

            // hack to make header update disclaimer
            timeline.flow('isPlaying, isDragging', function(isPlaying, isDragging) {
                chart.render();
            });

            return timeline;
        });

        mapTab.flow('timeline, years, inputYear, containerNode, bounds', function(timeline, years, inputYear, containerNode, bounds) {
            if (years.length <= 1) {
                timeline.clean();
                return;
            }

            var changes = {
                years: years,
                containerNode: containerNode,
                outerBounds: bounds                
            };

            if (!timeline.isPlaying && !timeline.isDragging)
                changes.inputYear = inputYear;

            timeline.update(changes);
        });

        mapTab.flow('boundsForMap : timeline, bounds', function(timeline, bounds) {
            return { left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height-(timeline.isClean ? 10 : timeline.bounds.height) };
        });

        mapTab.flow('map, colorData, containerNode, boundsForMap, projection, defaultFill', function(map, colorData, containerNode, boundsForMap, projection, defaultFill) {
            map.update({ 
                colorData: colorData,
                containerNode: containerNode,
                bounds: boundsForMap,
                projection: projection,
                defaultFill: defaultFill,
                onHover: onHover,
                onHoverStop: onHoverStop,
                onClick: onClick
            });
        });

        mapTab.flow('legend, legendData, legendTitle, containerNode, boundsForMap', function(legend, legendData, legendTitle, containerNode, boundsForMap) {
            legend.update({
                legendData: legendData,
                title: legendTitle,
                containerNode: containerNode,
                outerBounds: boundsForMap
            });
        });

        function onHover(d) {
            chart.tooltip.fromMap(d, d3.event);
        }

        function onHoverStop(d) {
            chart.tooltip.hide();
        }

        function onClick(d) {
            if (d3.select(chart.dom).classed('mobile') || !_.includes(chart.model.get("tabs"), "chart")) return;

            var entityName = d.id,
                availableEntities = chart.vardata.get("availableEntities"),
                entity = _.find(availableEntities, function(e) {
                    return owid.entityNameForMap(e.name) == d.id;
                });

            if (!entity) return;
            chart.model.set({ "selected-countries": [entity] }, { silent: true });
            chart.data.chartData = null;
            chart.update({ activeTabName: 'chart' });
            chart.url.updateCountryParam();
        }

        mapTab.beforeClean(function() {
            onHoverStop();
            mapTab.now('map, timeline, legend', function(map, timeline, legend) {
                map.clean();
                timeline.clean();
                legend.clean();
            });
        });

        mapTab.render = function(bounds) {
            if (!chart.map.getVariable()) {
                chart.showMessage("No variable selected for map.");
                return;
            }

            chart.mapdata.update();

            mapTab.update({
                containerNode: chart.svg.node(),
                bounds: bounds,
                colorData: chart.mapdata.currentValues,
                years: chart.map.getYears(),
                inputYear: chart.map.get('targetYear'),
                legendData: chart.mapdata.legendData,
                legendTitle: chart.mapdata.legendTitle||null,
                projection: chart.map.get('projection'),
                defaultFill: chart.mapdata.getNoDataColor()
            }, function() { chart.dispatch.call('renderEnd'); });
        };

        return mapTab;
    };
})(d3v4);