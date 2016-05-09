var myApp = angular.module('myApp', ['ngRoute']);

myApp.run(function($rootScope, $window) {

    $rootScope.back = function () {

            $window.history.back();

    };
});
myApp.config(function($routeProvider){
  $routeProvider.caseInsensitiveMatch = true;
  $routeProvider
      .when('/', {
        templateUrl : 'Views/allUsers.html',
        controller : 'AllUsersController'
      })
      .when('/users', {
        templateUrl : 'Views/allUsers.html',
        controller : 'AllUsersController'
      })
      .when('/users/add', {
        templateUrl : 'Views/addUser.html',
        controller : 'AddUserController'
      })
      .when('/users/:id', {
        templateUrl : 'Views/userDetails.html',
        controller : 'UserController'
      })
});


myApp.controller('AllUsersController', ['$scope','$http','$log','$location', function($scope,$http,$log, $location) {
    $scope.listOfUsers = []; // Empty array for users list
  $scope.moveToAddUser = function(){
    $location.path('/users/add');
  }
  $http({
    method: 'GET',
    url: 'http://mocker.egen.io/users',
  }).then(function successCallback(response) {
    $log.info("success retrieved list of useres");
    $scope.listOfUsers = response.data;
  }, function errorCallback(response) {
    $log.error("Error loading list of users ");
  });

}] ); //End of all user controller function


myApp.controller('UserController', ['$scope','$http','$log','$routeParams','$location','$timeout', function($scope,$http,$log,$routeParams,$location,$timeout) {
    $scope.selectedUser = {};
  $http({
    method: 'GET',
    url: 'http://mocker.egen.io/users/'+$routeParams.id,
  }).then(function successCallback(response) {
    $log.info("Successful in retrieving user information");
    $scope.selectedUser = response.data; // Setting the input fields with the retrieved data
  }, function errorCallback(response) {
    $log.error("Error fetching information with the User Id provided");
  });

  $scope.deleted = '';  // Storing the status of delete operation

  $scope.deleteUser = function(){
    $http({
      method: 'DELETE',
      url: 'http://mocker.egen.io/users/'+ $scope.selectedUser.id ,
    }).then(function successCallback(response) {
      $log.info("delete success");
      $scope.deleted = true; // Enabling success message
      $timeout(function(){
        $location.path("/users");
      }, 2000); // After success, take control to the main page after 2 second wait
    }, function errorCallback(response) {
      $log.error("fail");
      $scope.deleted = false; // Enabling the error message
    });
  }

}] ); //End for single user controller function



myApp.controller('AddUserController', ['$scope','$http','$log','$timeout', function($scope,$http,$log, $timeout) {
  $scope.formData = {}; // Storing form data
  $scope.added =''; // For storing status of the submit operation

  $scope.submit = function(){
    $http({
      method: 'POST',
      data : JSON.stringify($scope.formData),
      url: 'http://mocker.egen.io/users',
    }).then(function successCallback(response) {
      $log.info("successfully added new user");
      $scope.added = true; // Enabling success message
      $scope.formData = {}; // Replacing all fields with empty string
      $timeout(function(){
        $scope.added = '';
      }, 2000) // After success, slear the success message after 2 seconds
    }, function errorCallback(response) {
      $log.error("failed to add new user");
      $scope.added = false;  // Enabling error message
    });
  }

}] ); //End of all user controller function
