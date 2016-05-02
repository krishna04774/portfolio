(function () {
    angular
        .module("app")
        .controller("SummaryController", SummaryController);

    SummaryController.$inject = ["$rootScope", "$scope", "$state", "$modal", "$log","page1Service", "$timeout", "$window"];

    /**
     * @namespace MainController
     * @desc Main Controller
     * @param {} $rootScope
     * @param {} $scope
     * @param {} $state
     * @param {} $timeout
     * @param {} $window
     * @param {} userService
     * @param {} patientService
     * @returns {}
     */
    // ReSharper disable once InconsistentNaming
    function SummaryController($rootScope, $scope, $state, $modal, $log, page1Service, $timeout, $window) {
        var vm = this;
        vm.dataLoad = dataLoad;
        vm.editChecklistItem = editChecklistItem;
        vm.removeChecklistItem = removeChecklistItem;
        vm.startNewChecklist = startNewChecklist;
        initialize();
        return;

        //#region Public Functions
        function dataLoad(){
            page1Service.query(function(data){
                $scope.batchdata= data;
               // console.log($scope.batchdata);
            });

        };


    function startNewChecklist() {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '../app/Webapp/features/common/checklistAddItemModal.html',
            controller: AddItemsController,
            size: 'md',
        });

         modalInstance.result.then(function (newItem) {
            getWorkflowItems($scope.PatientId);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    function AddItemsController ($scope, $modalInstance) {
                $scope.addChecklist = addChecklist;
                $scope.cancel = cancel;

                function addChecklist (addChecklist) { $scope.batchdata.push(addedDomain);
                }

                function cancel () {
                    $modalInstance.dismiss("cancel");
                }

                function createChecklistTemplateItemSuccessResponse (response) {
                    $modalInstance.close($scope.addedChecklistItem);
                }

                function createChecklistTemplateItemErrorResponse (response) {
                    console.log(response);
                    cancel();
                }
            }

        }



        function editChecklistItem (selectedItem) {
            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: "../app/Webapp/features/common/checklistEditItemModal.html",
                controller: editItemsController
            });
            modalInstance.result.then(function (item) {
                getChecklistTemplate();
            });

            function editItemsController ($scope, $modalInstance) {
                $scope.checklistTemplateItem = angular.copy(selectedItem);
                $scope.ok = ok;
                $scope.cancel = cancel;

                function ok (checklistTemplateItem) {
                    if (!$scope.editChecklist.$invalid) {
                        checklistTemplateItem.Domains = [];
                        for (var i = 0; i < $scope.selectedDomains.length; i++) {
                            var addedDomain = {
                                "DomainId": $scope.selectedDomains[i]
                            };
                            checklistTemplateItem.Domains.push(addedDomain);
                        }
                        checklistService.updateChecklistTemplateItem(checklistTemplateItem.Id, checklistTemplateItem,
                            updateChecklistTemplateItemSuccessResponse,
                            updateChecklistTemplateItemErrorResponse);
                    } else {
                        $scope.editChecklist.$invalid = true;
                        $scope.editChecklist.$pristine = false;
                        $scope.editChecklist.error = true;
                    }
                }

                function cancel () {
                    $modalInstance.dismiss("cancel");
                }

                function updateChecklistTemplateItemSuccessResponse (response) {
                    $modalInstance.close($scope.checklistTemplateItem);
                }

                function updateChecklistTemplateItemErrorResponse (response) {
                    console.log(response);
                    cancel();
                }
            }
        }

        function removeChecklistItem(selectedItem) {
            var modalInstance = $modal.open({
                animation: $scope.animaionsEnabled,
                templateUrl: "../app/Webapp/features/common/checklistRemoveItemDialog.html",
                controller: removeRowController,
            });

            function removeRowController ($scope, $modalInstance, $state) {
                $scope.ok = ok;
                $scope.cancel = cancel;

                function cancel () {
                    $modalInstance.dismiss("cancel");
                }

                function ok () {
                    page1Service.deleteChecklistTemplateItem(selectedItem.Id, deleteChecklistTemplateItemSuccessResponse, deleteChecklistTemplateItemErrorResponse);
                    $modalInstance.dismiss();
                }

                function deleteChecklistTemplateItemSuccessResponse (response) {
                    getChecklistTemplate();
                }

                function deleteChecklistTemplateItemErrorResponse (response) {
                    console.log(response);
                }
            }
        }

            function drawTableUsingGrid() {
                $scope.gridOptions = {
                    enableVerticalScrollbar: 2,
                    enableHorizontalScrollbar: 0,
                    enableFiltering: true,
                    paginationPageSizes: [10, 25, 50, 75, 100, 700],
                    enableGridMenu: true,
                    sorting: true,
                    paginationPageSize: 10,
                    columnDefs: [
                        { name: "Users", displayName: "Users", field: "Patient_ID",sort: { direction: 'asc' }, cellClass: "pad5", type: "number", width: "*" },
                        { name: "Protocol", field: "Protocol", type: "number", width: "*" },
                        { name: "Site", field: "Site_ID", type: "number", width: "*" },
                        { name: "Visit", field: "Visit_ID", type: "number", width: "*" },
                        { name: "New Items", field: "NewDataItems", width: "*" },
                        { name: "New AEs", displayName: "New AEs", field: "Aes", type: "number", width: "*" },
                        { name: "New SAEs", displayName: "New SAEs", field: "SAEs", type: "number", width: "*" },
                        { name: "New Workflow", field: "ProfileWorkFlow", type: "number", width: "*" },
                        {
                        name: "Actions",
                        width: "10%",
                        cellClass: "textAlignCenter",
                        headerCellClass: "textAlignLeft",
                        enableCellEdit: false,
                        enableFiltering: false,
                        enableSorting: false,
                        enableColumnMenu: false,
                        cellTemplate: "<button ng-click=\"grid.appScope.vm.editChecklistItem(row.entity)\" width =\"5%\" class = \"BtnClr\"><i class=\"fa fa-pencil\"></i></button><button  width =\"5%\" class = \"BtnClr\" ng-click=\"grid.appScope.vm.removeChecklistItem(row.entity)\"><i class=\"fa fa-minus-square-o\"></i></button>"
                    }
                    ],
                    data:  $scope.batchdata
                };
            }

         function initialize () {
            dataLoad();
            drawTableUsingGrid();

        }

        //#endregion
    }
})();
