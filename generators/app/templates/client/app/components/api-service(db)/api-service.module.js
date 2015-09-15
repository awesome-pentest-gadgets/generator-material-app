/**
 * @ngdoc overview
 * @name auth
 * @description
 * The `<%= componentModule %>.apiservice` module
 *
 * @requires <%= componentModule %>.resource
 */

(function () {
	'use strict';

	angular
		.module('<%= componentModule %>.apiservice', [
			'<%= componentModule %>.resource'
		]);

})();
