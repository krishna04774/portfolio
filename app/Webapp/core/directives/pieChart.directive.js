/**
 * PieChart directive
 * @namespace Directives
 */
(function () {
    "use strict";

    angular
        .module("app")
        .directive("pieChart", pieChart);

    pieChart.$inject = ["$location"];

    /**
     * @namespace rrbmPieChart
     * @desc PieChart directive using HighCharts
     * @param {} $location
     * @returns {}
     */
    function pieChart($location) {
        // Usage:
        //     <rrbm-pie-chart id="Pie1" data="PatientsByWorkflowType" xTitle="Patients" yTitle="Visits" height="350" width="450"
        //                  selected="pieSelected" selectionchange="pieSelection()"></rrbm-pie-chart>
        //
        //    data - main data - watched for changes
        //    selected - selected values from directive
        //    selectionchange - call back method name on selection change
        var directive = {
            restrict: "E",
            replace: true,
            scope: {
                selected: "="
            },
            template: "<div id=\"\"></div>",
            link: link
        };

        return directive;

        function link(scope, element, attrs) {
            //must use parent because scope here is isolated
            scope.$parent.$watch(attrs.data, dataChanged);

            function dataChanged(newValue, oldValue) {
                if (newValue != undefined) {
                    drawChart(element[0].id, newValue, null, attrs.xtitle, attrs.ytitle, null);
                }
            }

            function drawChart(id, data, title, xTitle, yTitle, fieldForMedian, selectCallback) {
                var sum = 0;
                var seriesData = getDataArray(data);
                var css_title = getCookie(style_cookie_name);
                var selector = "#" + id;
                var options = {

                    credits: { enabled: false },
                    chart: {
                        //backgroundColor: "transparent",
                        type: "pie",
                        height: "350",
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        events: {
                            load: chartLoad
                        }
                    },
                    title: { text: title },
                    tooltip: { pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>" },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: "pointer",
                            dataLabels: {
                                enabled: true,
                                format: "<b>{point.name}</b>: {point.y}",
                                //style: {
                                //    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                //}
                            },
                            point: {
                                events: {
                                    select: pointSelected,
                                    unselect: pointUnselected
                                }
                            }
                        }
                    },

                    navigation: {
                        buttonOptions: {
                            symbolStroke: '#DDDDDD',
                            hoverSymbolStroke: '#FFFFFF',
                            theme: {
                                fill: {
                                    linearGradient: {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1
                                    },
                                    stops: [
                                        [0.4, '#606060'],
                                        [0.6, '#333333']
                                    ]
                                },
                                stroke: '#000000'
                            }
                        }
                    },

                    series: [{
                        name: xTitle,
                        colorByPoint: true,
                        data: seriesData,
                        shadow: true
                    }]
                };

                if (css_title) {
                    if (css_title == "modifiedStyleOne") {
                        Highcharts.setOptions(DARK_THEME);
                    } else if (css_title == "modifiedStyleTwo") {
                        Highcharts.setOptions(BLUE_THEME);
                    } else {
                        Highcharts.setOptions(DEFAULT_THEME);
                    }
                } else {
                    Highcharts.setOptions(DEFAULT_THEME);
                }

                $(selector).highcharts(options, function (e) {
                    //Default Theme Starts

                    $('#blueTheme').click(function () {
                        var chart = $(selector).highcharts();
                        /**
                         * Gray theme for Highcharts JS
                         * @author Torstein Hønsi
                         */
                        Highcharts.theme = BLUE_THEME;
                        // Apply the theme
                        var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
                        chart.destroy();
                        $(selector).highcharts(options);

                    });
                    //default theme Ends

                    $('#darkTheme').click(function () {
                        var chart = $(selector).highcharts();
                        /**
                         * Gray theme for Highcharts JS
                         * @author Torstein Hønsi
                         */
                        Highcharts.theme = DARK_THEME;

                        // Apply the theme
                        var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
                        chart.destroy();
                        $(selector).highcharts(options);

                    });
                    //Applying Secong theme
                    $('#defaultTheme').click(function () {
                        var chart = $(selector).highcharts();
                        /**
                         * Gray theme for Highcharts JS
                         * @author Torstein Hønsi
                         */
                        Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
                            proceed.call(this);
                            this.container.style.background = 'url(https://www.highcharts.com/samples/graphics/sand.png)'; // TODO: Replace with local file
                        });
                        Highcharts.theme = DEFAULT_THEME;
                        // Apply the theme
                        var highchartsOptions = Highcharts.setOptions(Highcharts.theme);
                        chart.destroy();
                        $(selector).highcharts(options);

                    });
          });
                function getDataArray(data) {
                    var dataArray = [];
                    var colorsp = {
                        FLD: '#7cb5ec', Profiler: '#e4d354', Manual: '#90ed7d', qualified: '#f7a35c', enrolling: '#b74600',
                        treatment: '#a3ba31', 'Old Data': '#434348', 'New Data': '#2b908f', intiated: '#21407d'
                    };
                    data.forEach(function (item, k) {
                        var point = {};
                        point.name = item.ValueName;
                        point.y = item.ValueFrequency;
                        point.color = colorsp[item.ValueName];
                        dataArray.push(point);
                        sum += point.y;
                    });

                    return dataArray;
                }

                function chartLoad(event) {
                    var text = this.renderer
                        .text("Number of Items: " + sum, this.plotLeft, this.plotTop + 5)  // TODO: Make text dynamic
                        .attr({ zIndex: 5 })
                        .add();
                }

                function pointSelected(event) {
                    if (event.accumulate) {
                        scope.selected.push(this);
                    } else {
                        scope.selected.length = 0; //clear array without killing refs to binding
                        scope.selected.push(this);
                    }
                    scope.$parent.$apply(attrs.selectionchange);
                }

                function pointUnselected(event) {
                    if (scope.selected.length === 0) {
                        return;
                    }
                    for (var i = 0; i < scope.selected.length; i++) {
                        if (scope.selected[i].name === this.name) {
                            scope.selected.splice(i, 1);
                            break;
                        }
                    }
                    scope.$parent.$apply(attrs.selectionchange);
                }
            }
        }
    }
})();
