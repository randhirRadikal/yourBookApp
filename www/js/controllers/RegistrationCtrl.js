app.controller('RegistrationCtrl', function ($scope, $state, $rootScope, $stateParams,$timeout,$ionicPopup,$ionicLoading) {

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

   $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };

   $scope.userRegistration = function(registrationData){
     $scope.showLoading();
      firebase.auth().createUserWithEmailAndPassword(registrationData.email, registrationData.password).then(function(snapp) {
        var rootRef = firebase.database().ref();
        var cUserRef = rootRef.child('users').child(snapp.uid);
        registrationData.isActive = true;
        cUserRef.set(registrationData);
        $timeout(function () {
          $scope.hideLoading();
          $scope.showAlert('Success','Registration successfully.','app.login');
        }, 0);
			}).catch(function(error){
				console.log(error);
			});
   };
});
