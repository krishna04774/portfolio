/**
 * Workflow Service
 * @namespace Services
 */

/*All the Services are Dummy and we don't have connection with db
==> Just representing the format to add, Update, Delete*/
(function () {
    "use strict";

    angular
        .module("app")
        .service("recordService", recordService);

    recordService.$inject = ["$resource", "API_DOMAIN"];

    function recordService($resource, API_DOMAIN) {
        var service = {
            getRecordItemsForUser: $resource(API_DOMAIN + "api/workflow/items/user/:id", {
                id: "@userid"
            }),
            getWorkflowItemsForlocation: $resource(API_DOMAIN + "api/workflow/items/location/:id", {
                id: "@locationid"
            }),
            getWorkflowPackagesForlocation: $resource(API_DOMAIN + "api/workflow/packet/site/:id", {
                id: "@siteid"
            }),
            getTaskItem: $resource(API_DOMAIN + "api/Task/:id", {
                id: "@TaskItemId"
            }, {
                query: {
                    method: "GET",
                    isArray: false
                }
            }),
            TaskItem: $resource(API_DOMAIN + "api/Task/:id", {
                id: "@taskItemId"
            },
            {
                update: {
                    method: "PUT",
                    params: { id: "@taskItemId" },
                    headers: { 'Content-Type': "application/json" }
                },
                get: {
                    method: "GET",
                    params: { id: "@taskItemId" },
                    headers: { 'Content-Type': "application/json" }
                },
                insert: {
                    method: "POST",
                    headers: { 'Content-Type': "application/json" }
                }
            })
        };

        initialize();

        return service;

        function initialize() {
            // Service startup stuff
        }
    }
})();
