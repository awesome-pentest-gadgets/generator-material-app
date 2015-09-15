'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var BaseGenerator = require('../base.js');

var Generator = module.exports = function Generator() {
	BaseGenerator.apply(this, arguments);
	this.option('dir');
	this.option('moduleName');
	this.option('createModuleFile');
	this.option('composed');
	this.recipe = 'Filter';
};

util.inherits(Generator, BaseGenerator);

Generator.prototype.prompting = function askFor() {
	var self = this;
	var done = this.async();
	var prompts = [
		{
			name: 'dir',
			message: 'Where would you like to create this filter?',
			default: path.join(self.config.get('filterDirectory'), this.slugy())
		}
	];


	this.prompt(prompts, function (props) {
		this.processAnswers(props, this.config.get('filterDirectory'));
		done();
	}.bind(this));
};

Generator.prototype.writing = {
	createModule: createModule,
	createFiles:  createFiles
};

Generator.prototype.install = function build() {
	this.gulp(['inject']);
};

function createModule() {
	if (this.options.createModuleFile || !this.options.composed) {
		this.composeWith('material-app:module', {
			args: [this.moduleName],
			options: {
				dir: this.dir,
				skipBuild: true
			}
		});
	} else {
		this.registerAngularModule(this.moduleName, this.dir);
	}
}

function createFiles() {
	ngUtil.copyTemplates(this, 'filter');
}

