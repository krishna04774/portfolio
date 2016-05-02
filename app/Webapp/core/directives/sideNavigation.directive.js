/**
 * SideNavigation
 * @namespace Directives
 */
(function () {
    "use strict";

    angular
        .module("app")
        .directive("sideNavigation", sideNavigation);

    sideNavigation.$inject = ["$window"];

    /**
     * @namespace rrbmSideNavigation
     * @desc Directive for run metsiMenu on sidebar navigation
     * @param {} $window
     * @returns {}
     */
    function sideNavigation($window) {
        // Usage:
        //     <ul rrbm-side-navigation class="nav" id="side-menu">

        var directive = {
            link: link,
            restrict: "A"
        };

        return directive;

        function link (scope, element, attrs) {
            // Call the metsiMenu plugin and plug it to sidebar navigation
            element.metisMenu();
        }
    }
})();
