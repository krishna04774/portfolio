/**
 * HamburgerLeftMenu
 * @namespace Directives
 */
(function () {
    "use strict";

    angular
        .module("app")
        .directive("toggleLeftMenu", toggleLeftMenu);

    toggleLeftMenu.$inject = ["$window"];

    /**
     * @namespace rrbmHamburgerLeftMenu
     * @desc Directive for hamburger/minimalize sidebar on the left side of screen
     * @param {} $window
     * @returns {}
     */
    function toggleLeftMenu($window) {
        // Usage:
        //     <rrbm-hamburger-left-menu></rrbm-hamburger-left-menu>

        var directive = {
            restrict: "EA",
            controller: controller,
            templateUrl: "../app/Webapp/core/directives/toggleLeftMenu.directive.html"
        };

        return directive;

        function controller ($scope, $element) {
            $scope.minimalize = minimalize;
        }

        function minimalize () {
            if ($(window).width() < 769) {
                $("body").toggleClass("show-left-sidebar");
            } else {
                $("body").toggleClass("hide-left-sidebar");
            }
        }
    }
})();
