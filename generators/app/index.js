'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
	prompting() {
		// Have Yeoman greet the user.
		this.log(
			yosay(
				'Welcome to the spectacular ' +
					chalk.red('generator-willyb-web') +
					' generator!'
			)
		);
	}

	writing() {
		this.fs.copy(this.templatePath('**/*'), this.destinationPath());
		this.fs.copy(this.templatePath('.*'), this.destinationPath());
	}

	install() {
		this.npmInstall([''], {'save-dev': true});
		this.installDependencies({bower: false});
	}
};
