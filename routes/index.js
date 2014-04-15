module.exports = function(app, controllers) {

  app.get('/', controllers.pageController.index);

  app.get('/accounts', controllers.accountController.index);

}
