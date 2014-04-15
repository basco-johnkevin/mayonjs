module.exports = function (accountModel) {

  var self = this;

  self.index = function (req, res) {
    res.render('index', { title: 'Accounts' });
  }

}