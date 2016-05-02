/**
 * ChecklistPanel
 * @namespace Directives
 */
(function () {
    "use strict";

    angular
        .module("app")
        .directive("checklistPanel", checklistPanel);

   checklistPanel.$inject = [];

    /**
     * @namespace rrbmChecklistPanel
     * @desc Checklist Panel
     * @param {} $rootScope
     * @returns {}
     */
    function checklistPanel() {
        // Usage:
        //     <rrbm-checklist-panel></rrbm-checklist-panel>

        var directive = {
            restrict: "E",
            transclude: true,
            replace: true,
            scope: {
                panelTitle: "@panelTitle",
                canStartNewChecklist: "@canStartNewChecklist",
                canAddNewChecklistItem: "@canAddNewChecklistItem",
                startNewChecklist: "=startNewChecklist",
                markChecklistComplete: "=markChecklistComplete",
                addNewChecklistItem: "=addNewChecklistItem",
                spinnerKey: "@spinnerkey"
            },
            link: link,
            templateUrl: "../app/Webapp/core/directives/checklistPanel.directive.html"
        };

        return directive;

        function link (scope, element, attrs) {
            //set the class to show edit or complete icon
            scope.isStartChecklistButtonVisible = isStartChecklistButtonVisible;
            scope.isCompleteChecklistButtonVisible = isCompleteChecklistButtonVisible;
            scope.isAddNewChecklistItemButtonVisible = isAddNewChecklistItemButtonVisible;

            if (!attrs.canStartNewChecklist) {
                attrs.canStartNewChecklist = "false";
            }
            if (!attrs.canAddNewChecklistItem) {
                attrs.canAddNewChecklistItem = "false";
            }

            return;

            function isStartChecklistButtonVisible() {
                return scope.canAddNewChecklistItem !== "true" && scope.canStartNewChecklist === "true";
            }

            function isCompleteChecklistButtonVisible() {
                return scope.canAddNewChecklistItem !== "true" && scope.canStartNewChecklist !== "true";
            }

            function isAddNewChecklistItemButtonVisible() {
                return scope.canAddNewChecklistItem === "true";
            }
        }
    }
})();
