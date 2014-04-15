'use strict';

module.exports = function () {

  var self = this;

  self.index = function (req, res) {
    res.render('index', { title: 'Express' });
  };

};