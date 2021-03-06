'use strict';

describe('Controller: <%= classedName %>MainController', function () {

  // load the controller's module
  beforeEach(module('<%= scriptAppName %>.<%= moduleName %>.main'));

  var controller;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('<%= classedName %>MainController', {
      // $scope: scope
    });
  }));

  it('object should exist', function () {
    Should.exist(controller);
    controller.should.be.an.instanceof(Object);
  });

});
