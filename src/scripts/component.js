(function(window, angular) {
    'use strict';
    class WeatherController {
        constructor(weatherService) {
            'ngInject';
            this.weatherService = weatherService;
        }

        $onInit() {
            this.cityToSearch = "Sydney";
            this.unit = "c";
            this.showError = false;
            this.getWeatherData();
        }

        getWeatherData() {
            this.weatherService.getWeatherData(this.cityToSearch, this.unit).then(response => {
                if(response.results !== null){
                    this.showError = false;
                    this.weatherDetails = response.results.channel;
                    this.formattedCity = `${this.weatherDetails.location.city}, 
                                        ${this.weatherDetails.location.region}, 
                                        ${this.weatherDetails.location.country}`;
                } else {
                    this.showError = true;
                }
            });
        }

        updateWeather() {
            this.weatherDetails = undefined;
            if(this.cityToSearch !== ''){
                this.getWeatherData();
            }
        }

    }

    //Injections go here
    WeatherController.$inject = ['weatherService'];

    angular
        .module('rahulWeatherProject.components', [])
        .component('weatherComponent', {
            templateUrl: 'weatherhome.html',
            controller: WeatherController
    });

})(window, window.angular);