angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('SearchCtrl',function ($scope,menuService) {
  $scope.Servicio = [];
  loadServicio();
  function loadServicio() {
		var promiseGet = menuService.getJSON();
        promiseGet.then(function (pl) {
            $scope.Servicio = pl.data;
            console.log(JSON.stringify($scope.Servicio));
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}



})

.controller('ProfesionalCtrl', function ($scope,profesionalService) {
  $scope.idProfesional;
  $scope.open = true;
  $scope.Profesionales = [];
  $scope.Profesional= {};
  $scope.filtro = "1";
  var json = {"id":0,"idSector":"1","descripcion":"Sistemas","tipo":"Sector"};

  getProfesionales();

  function getProfesionales () {
    var promiseGet = profesionalService.postJSON(json);
    promiseGet.then(function (pl) {
        $scope.Profesionales = pl.data.profesionales;
    },
    function (errorPl) {
      console.log('Error Al Cargar Datos', errorPl);
    });
  }

  $scope.Detalles = function (profesional) {
    if (profesional.status == false) {
      profesional.status = true;
    }else {
      profesional.status = false;
    }
    $scope.Profesional = profesional;
  }

  $scope.Filtro = function  () {
		switch($scope.filtro) {
			case "1":
				getProfesionales()
				break;
			case "3":
				getProfesionalesVisitados()
				break;
			case "4":
				//getProfesionalesDistancia()
				break;
		}
	}

  function getProfesionalesDistancia () {
		var promiseGet = profesionalService.postJSONDistancia(serverData.json);
        promiseGet.then(function (pl) {
        	if (pl.data.profesionales.length > 0) {
        		$scope.Profesionales = pl.data.profesionales;
        	};
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}

  function getProfesionalesVisitados () {
		var promiseGet = profesionalService.postJSONVisitados(serverData.json);
        promiseGet.then(function (pl) {
            $scope.Profesionales = pl.data.profesionales;
        },
        function (errorPl) {
        	console.log('Error Al Cargar Datos', errorPl);
        });
	}


})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
