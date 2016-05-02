/**
 * SimplePanel
 * @namespace Directives
 */
(function () {
    "use strict";

    angular
        .module("app")
        .directive("simplePanel", simplePanel);

    simplePanel.$inject = ["$rootScope"];

    /**
     * @namespace rrbmSimplePanel
     * @desc Simple Panel
     * @param {} $rootScope
     * @returns {}
     */
    function simplePanel($rootScope) {
        //note: outer scope variable (headertext) and set to inner scope variables of headerText.
        //template for directive will use the "headerText" variables.
        //also note that the @ converts all interpolated {{}} values to string so boolean true becomes "true"
        //this kicked my ass for half a day.  :)

        var directive = {
            restrict: "E",
            transclude: true,
            replace: true,
            scope: {
                headerText: "@headertext",
                addAction: "=addaction",
                detailsAction: "=detailsaction"
            },
            templateUrl: "../app/Webapp/core/directives/simplePanel.directive.html"
        };

        return directive;
    }
})();
