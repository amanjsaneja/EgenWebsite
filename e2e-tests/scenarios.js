
/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('Http Requests Test', function() {
  'use strict';

  var $http, $httpBackend, usersCntrl, addCntrl, detailsCntrl, scope;
    var testData = [
        {
            "id": "8ab2f4e9-f289-4e1b-90dc-ab362c3cf917",
            "firstName": "Enrique",
            "lastName": "Oberbrunner",
            "email": "Hadley86@gmail.com",
            "address": {
                "street": "259 Mathew Dale",
                "city": "Melany port"
            }
        },
        {
            "id": "689fdb71-85a2-433b-bed6-31b34ace08e8",
            "firstName": "Mylene",
            "lastName": "Franecki",
            "email": "Audrey30@gmail.com",
            "address": {
                "street": "2757 Gulgowski Knolls",
                "city": "Terrence mouth"
            }
        },
        {
            "id": "5de1df8e-593a-4ac6-9291-462739d5d4a6",
            "firstName": "Ryley",
            "lastName": "Ward",
            "email": "Orland_Cummerata59@yahoo.com",
            "address": {
                "street": "8394 Russel Shore",
                "city": "Derek chester"
            }
        },
        {
            "id": "de33449a-4906-4dcf-8fd3-0c9e6b380eb1",
            "firstName": "Jennifer",
            "lastName": "Kautzer",
            "email": "Elton.Lebsack@yahoo.com",
            "address": {
                "street": "22946 Lucienne Flat",
                "city": "East Itzel ville"
            }
        },
        {
            "id": "3b5d99ab-ab6d-4941-b61b-b078fc6728db",
            "firstName": "Marcella",
            "lastName": "Lang",
            "email": "Fabiola.Homenick@yahoo.com",
            "address": {
                "street": "46064 Morar Crossing",
                "city": "West Liliana stad"
            }
        },
        {
            "id": "6e51f1ed-85af-420d-9b3d-ec0965fb7dff",
            "firstName": "Mervin",
            "lastName": "Hammes",
            "email": "Elmore_Cummerata61@yahoo.com",
            "address": {
                "street": "6465 Maggio Prairie",
                "city": "Lake Pearlie"
            }
        }
    ];
    beforeEach(module("myApp"));
    beforeEach(inject(function(_$http_, _$httpBackend_ ){
        $http= _$http_;
        $httpBackend = _$httpBackend_;
    }));

    describe('Testing main view', function(){

        beforeEach(inject(function($controller, $rootScope){
            scope = $rootScope.$new();
            usersCntrl = $controller("AllUsersController",{
                $scope :scope
            });
        }));


        it('Try getting user list', function() {
            $httpBackend.whenGET("http://mocker.egen.io/users").respond(testData);
            $httpBackend.flush();
            expect(scope.listOfUsers.length).toBe(6);

        });

        it('Check if correct fields are updated after retriving users', function() {
            $httpBackend.whenGET("http://mocker.egen.io/users").respond(testData);
            $httpBackend.flush();
            expect(scope.listOfUsers[0].firstName).toBe("Enrique");
            expect(scope.listOfUsers[5].firstName).toBe("Mervin");
        });

    });


  describe('Check Single User Deails View', function() {

      beforeEach(inject(function($controller, $rootScope){
          scope = $rootScope.$new();
          detailsCntrl = $controller("UserController",{
              $scope :scope
          });
      }));

      it('1. Deleted variable is set to "" ', function() {
          expect(scope.deleted).toBe("");
      });

      it('2. Try getting user details', function() {
          $httpBackend.whenGET("http://mocker.egen.io/users/undefined").respond(testData[0]);
          $httpBackend.flush();
          expect(scope.selectedUser.firstName).toBe("Enrique");
      });

      it('3. Delete Operation Success Check', function() {
          $httpBackend.whenGET("http://mocker.egen.io/users/undefined").respond(testData[0]);
          $httpBackend.flush();
          scope.deleteUser();
          $httpBackend.when('DELETE', 'http://mocker.egen.io/users/'+ scope.selectedUser.id).respond(200, '');
          $httpBackend.flush();
          expect(scope.deleted).toBe(true);
      });

      it('4. Delete Operation Failure Check', function() {
          $httpBackend.whenGET("http://mocker.egen.io/users/undefined").respond(testData[0]);
          $httpBackend.flush();
          scope.deleteUser();
          $httpBackend.when('DELETE', 'http://mocker.egen.io/users/'+ scope.selectedUser.id).respond(404, '');
          $httpBackend.flush();
          expect(scope.deleted).toBe(false);
      });

  });

    describe('Check Add User View', function() {

        beforeEach(inject(function($controller, $rootScope){
            scope = $rootScope.$new();
            addCntrl = $controller("AddUserController",{
                $scope :scope
            });
        }));

        it('1. Check for Form Data Object and Added variable value', function() {
            expect(Object.keys(scope.formData).length).toBe(0);
            expect(scope.added).toBe('');
        });

        it('2. Try Success Add Operation', function() {
            // $httpBackend.when('POST', 'http://mocker.egen.io/users/').respond(200, '');
            // $httpBackend.whenPOST('http://mocker.egen.io/users/').respond(function(){
            //     return [200, {}, {}];
            // });
            scope.submit();
            expect(scope.added).toBe(true);
        });

        it('3. Try Failed Add Operation', function() {
            scope.submit();
            $httpBackend.when('POST', 'http://mocker.egen.io/users/').respond(404, '');
            expect(scope.added).toBe(false);
        });

    });
    
});
