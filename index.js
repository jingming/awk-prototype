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

  /** dustjs initialization */
  var dust = require('dustjs-linkedin');
  dust.helpers = require('dustjs-helpers');

  /** App initialization */
  var express = require('express');
  var consolidate = require('consolidate');
  var app = express();

  app.engine('dust', consolidate.dust);
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/dust');
  app.set('port', (process.env.PORT || 5000));
  app.use(express.static(__dirname));

  app.get('/', function (request, response) {
    Question.findOne({}, function(error, question) {
      console.log(question);
      response.render('index', { question: question.data });
    });
  });

  app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
  });

}());