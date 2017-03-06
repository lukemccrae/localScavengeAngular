(function() {
    'use strict';

    angular.module('app').config(config)

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']
    //
    function config($stateProvider, $urlRouterProvider, $locationProvider, $http) {
        $locationProvider.html5Mode(true)
        $stateProvider
            .state({
                name: 'home',
                url: '/',
                component: 'home',
            })

    }
}());
