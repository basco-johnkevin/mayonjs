module.exports = function (mongoose) {

  var AccountSchema = new mongoose.Schema({
    company: String,
    email: String,
    password: String,
    createdAt: {type: Date, default: Date.now},
  });

  var Account = mongoose.model('Account', AccountSchema);

  var self = this;

  self.get = function (callback) {
    console.log('implement');
  }

}