(function() {
    'use strict'

    angular.module('app')
        .component('clues', {
            controller: controller,
            templateUrl: '/clues/clues.html'
        })

    function controller() {
        const vm = this;

        vm.$onInit = function() {
            console.log("hi from home controller");
        }
    }
}());
