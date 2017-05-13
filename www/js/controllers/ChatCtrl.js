app.controller('ChatCtrl', function ($scope, $state, $rootScope, $stateParams,$timeout,$ionicPopup) {
    //ionic.material.ink.displayEffect();
    //ionicMaterialInk.displayEffect();
    console.log($stateParams.fUserId);
    console.log(localStorage.yourBook_Uid);
    if($stateParams.fUserId){
      $scope.fUserId = $stateParams.fUserId;
    }else{
      $state.go('');
    }
    var rootRef = firebase.database().ref();
    var cUserRef = rootRef.child('users').child(localStorage.yourBook_Uid);
    var fUserRef = rootRef.child('users').child($scope.fUserId);
    var chatRoomfUserRef1 = rootRef.child('chatRooms').child(localStorage.yourBook_Uid).child($scope.fUserId);
    var chatRoomfUserRef2 = rootRef.child('chatRooms').child($scope.fUserId).child(localStorage.yourBook_Uid);

    cUserRef.on('value', function(snapshot) {
       $timeout(function () {
         $scope.cUserDetails = snapshot.val();
       },0);
    });

    fUserRef.on('value', function(snapshot) {
       $timeout(function () {
         $scope.fUserDetails = snapshot.val();
       },0);
    });

    chatRoomfUserRef1.once('value',function(snapp){
      if(snapp.val()){
        $timeout(function () {
          $scope.chatRoomId = snapp.val();
          $scope.getChatList($scope.chatRoomId);
        },0);
      }else{
        chatRoomfUserRef2.once('value',function(snapp1){
          if(snapp1.val()){
            $timeout(function () {
              $scope.chatRoomId = snapp1.val();
              $scope.getChatList($scope.chatRoomId);
            },0);
          }else{
            $timeout(function () {
              $scope.chatRoomId = new Date().getTime();
              chatRoomfUserRef1.set($scope.chatRoomId);
              $scope.getChatList($scope.chatRoomId);
            },0);
          }
        },function(err){
          console.log(err);
        });
      }
    },function(err){
      console.log(err);
    });


    $scope.getChatList = function(chatRoomId){
      var chatRef = rootRef.child('chat').child(chatRoomId);
      chatRef.on('value',function(snapp){
        $timeout(function () {
          $scope.chatList = snapp.val();
          console.log(snapp.val());
        },0);
      });
    };

    $scope.sendMessage = function(message){
      var data = {
        message:message,
        currentUserId:localStorage.yourBook_Uid,
        name:$scope.cUserDetails.name
      };
      var chatRef = rootRef.child('chat').child($scope.chatRoomId);
      chatRef.push(data);
      $scope.message= '';
    };





});
