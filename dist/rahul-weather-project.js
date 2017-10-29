/**
 * rahul-weather-project v0.1.0 ()
 * Copyright 2017 Rahul Shukla
 * Licensed under MIT
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (window, angular) {
    'use strict';

    var WeatherController = (function () {
        function WeatherController(weatherService) {
            'ngInject';

            _classCallCheck(this, WeatherController);

            this.weatherService = weatherService;
        }

        //Injections go here

        _createClass(WeatherController, [{
            key: '$onInit',
            value: function $onInit() {
                this.cityToSearch = "Sydney";
                this.unit = "c";
                this.showError = false;
                this.getWeatherData();
            }
        }, {
            key: 'getWeatherData',
            value: function getWeatherData() {
                var _this = this;

                this.weatherService.getWeatherData(this.cityToSearch, this.unit).then(function (response) {
                    if (response.results !== null) {
                        _this.showError = false;
                        _this.weatherDetails = response.results.channel;
                        _this.formattedCity = _this.weatherDetails.location.city + ', \n                                        ' + _this.weatherDetails.location.region + ', \n                                        ' + _this.weatherDetails.location.country;
                    } else {
                        _this.showError = true;
                    }
                });
            }
        }, {
            key: 'updateWeather',
            value: function updateWeather() {
                this.weatherDetails = undefined;
                if (this.cityToSearch !== '') {
                    this.getWeatherData();
                }
            }
        }]);

        return WeatherController;
    })();

    WeatherController.$inject = ['weatherService'];

    angular.module('rahulWeatherProject.components', []).component('weatherComponent', {
        templateUrl: 'weatherhome.html',
        controller: WeatherController
    });
})(window, window.angular);
'use strict';

(function (window, angular, undefined) {
  'use strict';

  angular.module('rahulWeatherProject', ['rahulWeatherProject.components', 'rahulWeatherProject.services', 'rahulWeatherProject.templates']);
})(window, window.angular);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function (window, angular) {
    'use strict';

    var weatherService = (function () {
        function weatherService($http) {
            'ngInject';

            _classCallCheck(this, weatherService);

            this.$http = $http;
        }

        //Injections go here

        _createClass(weatherService, [{
            key: 'getWeatherData',
            value: function getWeatherData(searchLocation, unit) {
                return this.$http.get("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22" + searchLocation + "%22)%20and%20u='" + unit + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys").then(function (response) {
                    return response.data.query;
                })['catch'](function (error) {
                    return error;
                });
            }
        }], [{
            key: 'weatherFactory',
            value: function weatherFactory($http) {
                return new weatherService($http);
            }
        }]);

        return weatherService;
    })();

    weatherService.$inject = ['$http'];

    /**
     * @ngdoc service
     * @name rahulWeatherProject.services:weatherService
     * @description Service to get weather Data
     */
    angular.module('rahulWeatherProject.services', []).factory('weatherService', weatherService.weatherFactory);
})(window, window.angular);
'use strict';

angular.module('rahulWeatherProject.templates', []).run(['$templateCache', function ($templateCache) {
  $templateCache.put('weatherhome.html', '<header ng-class="{\'cloudyHeader\': $ctrl.weatherDetails.item.condition.text.toLowerCase().indexOf(\'showers\')>-1 ||\n                                $ctrl.weatherDetails.item.condition.text.toLowerCase().indexOf(\'cloudy\')>-1}">\n    <h1>City weather</h1>\n    <p>By: Rahul Shukla</p>\n</header>\n<div class="main" ng-class="{\'cloudyBody\': $ctrl.weatherDetails.item.condition.text.toLowerCase().indexOf(\'showers\')>-1 ||\n                                $ctrl.weatherDetails.item.condition.text.toLowerCase().indexOf(\'cloudy\')>-1}">\n    <div class="container">\n        <div class="inputPanel">\n            <input type="text" ng-model="$ctrl.cityToSearch" placeholder="City name e.g. Bangalore">\n            <select ng-model="$ctrl.unit" ng-change="$ctrl.updateWeather()">\n                <option value="c">\xB0C</option>\n                <option value="f">\xB0F</option>\n            </select>\n            <input type="button" ng-click="$ctrl.updateWeather()" value="Update">\n            <div class="loader" ng-if="!$ctrl.weatherDetails && !$ctrl.showError"></div>\n            <div class="msg" ng-if="!$ctrl.weatherDetails && !$ctrl.showError">Loading ...</div>\n            <div class="msg" ng-if="$ctrl.showError">Sorry, could not find the city.</div>\n        </div>\n        <div class="weatherDetails animate-bottom" ng-if="$ctrl.weatherDetails">\n            <div class="cityTitle">{{$ctrl.formattedCity}}</div>\n            <div class="cityTemp">\n                {{$ctrl.weatherDetails.item.condition.temp}}\xB0{{$ctrl.weatherDetails.units.temperature}}\n                <div class="cityCondition">{{$ctrl.weatherDetails.item.condition.text}}</div>\n            </div>\n            <ul class="conditionList">\n                <!--<li>Current Temperature : {{$ctrl.weatherDetails.item.condition.temp}}\xB0{{$ctrl.weatherDetails.units.temperature}}</li>-->\n                <li>Sunrise : {{$ctrl.weatherDetails.astronomy.sunrise}}</li>\n                <li>Sunset : {{$ctrl.weatherDetails.astronomy.sunset}}</li>\n                <li>Humidity : {{$ctrl.weatherDetails.atmosphere.humidity}}%</li>\n                <li>Visibility : {{$ctrl.weatherDetails.atmosphere.visibility}}%</li>\n                <li>Wind:\n                    <ul class="ulWind">\n                        <li>Chill : {{$ctrl.weatherDetails.wind.chill}}\xB0F</li>\n                        <li>Direction : {{$ctrl.weatherDetails.wind.direction}}\xB0</li>\n                        <li>Speed : {{$ctrl.weatherDetails.wind.speed}} {{$ctrl.weatherDetails.units.speed}}</li>\n                    </ul>\n                </li>\n            </ul>\n            <div class="forecastTitle">Forecast for next 10 days</div>\n            <ul class="forecastList">\n                <li ng-repeat="forecast in $ctrl.weatherDetails.item.forecast">\n                    <div class="forecastDay">{{forecast.day}}</div>\n                    <div class="forecastDate">{{forecast.date}}</div>\n                    <div>High: {{forecast.high}}\xB0{{$ctrl.weatherDetails.units.temperature}}</div>\n                    <div>Low: {{forecast.low}}\xB0{{$ctrl.weatherDetails.units.temperature}}</div>\n                    <div class="forecastText">{{forecast.text}}</div>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>\n\n\n');
}]);