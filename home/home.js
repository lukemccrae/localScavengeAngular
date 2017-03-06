(function() {
    'use strict'

    angular.module('app')
        .component('home', {
            controller: controller,
            templateUrl: '/home/home.html'
        })

    function controller(NgMap) {
        NgMap.getMap("map").then(function(map) {
            console.log(map);
        });
        const vm = this;
        vm.time = 0;
        vm.showClues = false;

        vm.$onInit = function() {}

        vm.clues = function() {
            vm.showClues = !vm.showClues;
        }

        vm.start = function() {
            vm.time = 0;
        }
    }
}());
