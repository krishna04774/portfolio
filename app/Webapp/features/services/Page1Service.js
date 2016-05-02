(function () {
    angular.module('app')
        .factory('page1Service', page1Service);

    page1Service.$inject= ['$resource'];

            function page1Service ($resource) {
                var service= $resource('../app/Webapp/data/table1.json');
                return service;
        };
})();
