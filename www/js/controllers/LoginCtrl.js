app.controller('LoginCtrl', function ($scope, $state, $rootScope, $stateParams,$timeout,$ionicPopup) {
    //ionic.material.ink.displayEffect();
    //ionicMaterialInk.displayEffect();
    /*$scope.showConfirm = function(title,message) {
      var confirmPopup = $ionicPopup.confirm({
         title: title,
         template: message
      });
      confirmPopup.then(function(res) {
         if(res) {
            console.log('Sure!');
         } else {
            console.log('Not sure!');
         }
      });
   };*/
   $scope.showAlert = function(title,message,path) {
      var alertPopup = $ionicPopup.alert({
         title: title,
         template: message
      });
      alertPopup.then(function(res) {
        $rootScope.isPageReload = true;
        $state.go(path);
      });
   };

    $scope.doLogin = function(){
      $scope.isButtonBusy = true;
      firebase.auth().signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password)
      .then(function(res){
        $timeout(function () {
          $scope.isButtonBusy = false;
          localStorage.setItem('yourBook_Uid', res.uid);
          $scope.showAlert('Success','Login successfully.','app.home');
        },0);
      })
      .catch(function(err) {
        $scope.showAlert('Error','Please enter valied email and password.');
        console.log(err);
      });
    };

    $scope.logout = function(){
      firebase.auth().signOut().then(function() {
      $timeout(function(){
        $rootScope.isLoggedIn = false;
        localStorage.removeItem('yourBook_Username');
        localStorage.removeItem('yourBook_Email');
        localStorage.removeItem('yourBook_Uid');
        $scope.showAlert('Success','Logout successfully.','app.login');
      },0);
    }).catch(function(error) {
      $scope.showAlert('Error','Some problem please try agin later.');
      console.log(error);
    });
    };
});
