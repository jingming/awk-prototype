/**
 * awk application initialization
 *
 * @author Jingming Niu
 * @since  2015-03-23
 */
(function() {

  /** db initialization */
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_URL);

  var questionSchema = new mongoose.Schema({
    data: String,
    updated_at: { type: Date, default: Date.now }
  });

  var Question = mongoose.model('t_questions', questionSchema);

  var question = new Question({
    data: 'Do you have any siblings?'
  });
  question.save(function(result) {
    console.log(result);
  });

  /** App initialization */
  var express = require('express');
  var app = express();

  app.set('port', (process.env.PORT || 5000));
  app.use(express.static(__dirname + '/public'));

  app.get('/', function (request, response) {
      response.send("username: " + process.env.MONGO_USERNAME + "\npassword: " + process.env.MONGO_PASSWORD);
  });

  app.listen(app.get('port'), function () {
      console.log("Node app is running at localhost:" + app.get('port'));
  });

}());