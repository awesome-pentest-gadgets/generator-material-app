(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.<%= moduleName %>.list.detail submodule
   * and configure it.
   *
   * @requires ui.router
   * @requires angularMoment
   */

  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.list.detail', [
      'ui.router',
      'angularMoment'
    ])
    .config(configure<%= classedName %>ListDetail);

  // inject config<%= classedName %>Routes dependencies
  configure<%= classedName %>ListDetail.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the '<%= moduleName %>.detail' state with the detail template
   * paired with the <%= classedName %>DetailController as 'detail' for the
   * 'sidenav' sub view.
   * '<%= cameledName %>' is resolved as the <%= cameledName %> with the id found in
   * the state parameters.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configure<%= classedName %>ListDetail($stateProvider) {
    // The detail state configuration
    var detailState = {
      name: '<%= moduleName %>.list.detail',
      parent: '<%= moduleName %>.list',<% if (secure) {%>
      url: '/:id',
      authenticate: true,
      role: '<%= role %>',<%}%>
      onEnter: onEnter<%= classedName %>ListDetail,
      views: {
        'detail@<%= moduleName %>.list': {
          templateUrl: '<%= listDetailHtmlUrl %>',
          controller: '<%= classedName %>DetailController',
          controllerAs: 'detail',
          resolve: {<%= cameledName %>: resolve<%= classedName %>FromArray}
        }
      }
    };

    $stateProvider.state(detailState);
  }

  // inject on<%= classedName %>ListDetailEnter dependencies
  onEnter<%= classedName %>ListDetail.$inject = ['$timeout', 'ToggleComponent'];

  /**
   * Executed when entering the <%= moduleName %>.list.detail state. Open the component
   * registered with the component id '<%= moduleName %>.detailView'.
   *
    * @params {$timeout} $timeout - The $timeout service to wait for view initialization
   * @params {ToggleComponent} ToggleComponent - The service to toggle the detail view
   */
  function onEnter<%= classedName %>ListDetail($timeout, ToggleComponent) {
    $timeout(showDetails, 0, false);

    function showDetails() {
      ToggleComponent('<%= moduleName %>.detailView').open();
    }
  }

  // inject resolve<%= classedName %>FromArray dependencies
  resolve<%= classedName %>FromArray.$inject = ['<%= cameledName %>s', '$stateParams', '_'];

  /**
   * Resolve dependencies for the <%= moduleName %>.detail state
   *
   * @params {Array} <%= cameledName %>s - The array of <%= cameledName %>s
   * @params {Object} $stateParams - The $stateParams to read the <%= cameledName %> id from
   * @returns {Object|null} The <%= cameledName %> whose value of the _id property equals $stateParams._id
   */
  function resolve<%= classedName %>FromArray(<%= cameledName %>s, $stateParams, _) {
    return _.find(<%= cameledName %>s, {'_id': $stateParams.id});
  }

})();
