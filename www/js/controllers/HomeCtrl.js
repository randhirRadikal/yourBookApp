app.controller('HomeCtrl', function ($scope, $state, $rootScope, $stateParams,$timeout,$ionicPopup) {
    //ionic.material.ink.displayEffect();
    //ionicMaterialInk.displayEffect();
    if($rootScope.isPageReload){
      window.location.reload(true);
      $rootScope.isPageReload = false;
    }
    

});
