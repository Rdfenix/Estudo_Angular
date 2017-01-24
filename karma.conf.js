module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		files: [
			'angular.min.js',
			'angular-mocks.js',
			'controller.js',
			'simpleSpec.js',
			'controllerSpec.js'
		],
		exclude: [],
		port: 8080,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: false
	});
};
