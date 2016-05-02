/**
 * PageTitle
 * @namespace Directives
 */

(function () {
    "use strict";

    angular
        .module("app")
        .directive("pageTitle", pageTitle);

    pageTitle.$inject = ["$rootScope", "$timeout"];

    /**
     * @namespace rrbmPageTitle
     * @desc Directive for set Page title - mata title
     * @param {} $rootScope
     * @param {} $timeout
     * @returns {}
     */
    function pageTitle($rootScope, $timeout) {
        // Usage:
        //     <title page-title></title>

        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        function link (scope, element, attrs) {
            var listener = function (event, toState, toParams, fromState, fromParams) {
                // Default title
                var title = "PlayProject | Implementing my Skills";
                // Create your own title pattern
                if (toState.data && toState.data.pageTitle) {
                    title = "PlayProject | " + toState.data.pageTitle;
                }
                $timeout(function () {
                    element.text(title);
                });
            };
            $rootScope.$on("$stateChangeStart", listener);
        }
    }
})();
