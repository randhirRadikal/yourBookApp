app.controller('FriendsCtrl', function ($scope,$state, $stateParams,$timeout) {
    //ionic.material.ink.displayEffect();

    var rootRef = firebase.database().ref();
    var userRef = rootRef.child('users');
    $scope.cUserId = localStorage.yourBook_Uid;
    $scope.users = [];
    userRef.on('value', function(snapshot) {
       $timeout(function () {
         $scope.users = snapshot.val();
       },0);
    });

    $scope.chat = function(fuser){
      $state.go('app.friends.chat', {'fUserId':fuser});
    };
});
