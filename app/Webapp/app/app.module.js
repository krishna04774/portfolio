/**
 * App Module
 * @namespace Modules
 */

(function () {
    angular.module("app", [
        "ui.router", // Angular flexible routing
        "ui.bootstrap", // AngularJS native directives for Bootstrap
        "ngResource",
        "ui.grid", //Angular UI- grid Directive for Tables.
        "ui.grid.pagination",//UI-pagination
        "ui.grid.exporter",
        "ui.grid.selection",
        "ui.grid.resizeColumns",
        'ui.grid.expandable',
        "ui.grid.edit",
        "ui.grid.cellNav",
    ]);
})();
