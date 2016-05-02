/**
 * App Config
 * @namespace Configs
 */

angular
    .module("app")
    .config(configState)

function configState($stateProvider, $urlRouterProvider) {
    // Optimize load start with remove binding information inside the DOM element

    // Set default state
    $urlRouterProvider.otherwise("/welcome");
    $stateProvider
        // Welcome Page
        .state("welcome", {
            url: "/welcome",
            templateUrl: "../app/Webapp/features/welcome.html",
            controllerAs: "vm",
            controller: "MainController",
            data: {
                pageTitle: "FirstPage",
                  }
        })
        //Summary Page
        .state("summaryPage", {
            url: "/summaryPage",
            templateUrl: "../app/Webapp/features/summary.html",
            controller: "SummaryController",
            controllerAs: "vm",

            data: {
                pageTitle: "Summary Page"
            }
        })

      /*We can add as Many states we want and we can also create a sub states by keepin /^ symbol at url*/

}
