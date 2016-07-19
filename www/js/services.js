angular.module('starter.services', [])

.service('menuService', function($http) {
  this.getJSON = function  () {
		var req = $http.get(uri + '/app/json');
		return req;
	}
})
