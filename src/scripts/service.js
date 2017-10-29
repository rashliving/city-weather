((window, angular) => {
    'use strict';
class weatherService {
    constructor($http) {
        'ngInject';
        this.$http = $http;
    }

    getWeatherData(searchLocation, unit) {
        return this.$http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + searchLocation + "%22)%20and%20u='" + unit + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys")
            .then(response => response.data.query)
            .catch(error => error);
    }

    static weatherFactory($http){
        return new weatherService($http);
    }
}

//Injections go here
weatherService.$inject = ['$http'];

/**
 * @ngdoc service
 * @name rahulWeatherProject.services:weatherService
 * @description Service to get weather Data
 */
angular
    .module('rahulWeatherProject.services', [])
    .factory('weatherService', weatherService.weatherFactory);

})(window, window.angular);