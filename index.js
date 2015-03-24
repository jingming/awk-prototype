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

  console.log("init: successfully connected to mongodb");

  var questionSchema = new mongoose.Schema({
    data: String,
    updated_at: { type: Date, default: Date.now }
  });

  console.log("init: successfully created schema");

  var Question = mongoose.model('t_questions', questionSchema);

  /** dustjs initialization */
  var dust = require('dustjs-linkedin');
  dust.helpers = require('dustjs-helpers');

  console.log("init: successfully loaded dust");

  /** App initialization */
  var express = require('express');
  var consolidate = require('consolidate');
  var app = express();

  console.log("init: successfully created express instance");

  app.engine('dust', consolidate.dust);
  app.set('view engine', 'dust');
  app.set('views', __dirname + '/dust');
  app.set('port', (process.env.PORT || 5000));
  app.use(express.static(__dirname));

  console.log("init: successfully set initialization requirements");

  app.get('/', function (request, response) {
    console.log("Handling request: " + request);

    Question.findOne({}, function(error, question) {
      console.log(question);
      response.render('index', { question: question.data });
    });
  });

  console.log("init: loading application");

  app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
  });

}());