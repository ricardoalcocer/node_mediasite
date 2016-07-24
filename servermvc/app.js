var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var debug         = require('debug')('app4');
var fs            = require('fs');
var data          = fs.readFileSync('./db/data.json', 'utf8');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req,res){
  res.render('index', { title: 'Express' });
})

app.get('/data/get', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.parse(data));
});

app.get('/video/get_meta/:video_title', function (req, res) {
  var videoTitle = req.params.video_title;

  JSON.parse(data).forEach(function(item,key){
    if (item.title === videoTitle) {
      res.setHeader('Content-Type', 'application/json');
      res.send(item);
    }
  })
})

app.get('/video/get_movie/:video_id', function (req, res) {
  var videoId = req.params.video_id;

  // **********
  var movie = req.url.substr(1);
  var file = path.resolve(__dirname, './videos/' + videoId);

  fs.stat(file, function(err, stats) {
    if (err) {
          if (err.code === 'ENOENT') {
              // 404 Error if file not found
              //return res.sendStatus(404);
              res.end(err); // I added this
          }
          res.end(err);
    }

    var range = req.headers.range;

    if (!range) {
          // 416 Wrong range
          //return res.sendStatus(416);
          console.log('Err: It seems like someone tried to download the video.');
          res.end(err);
      }else{
          var positions   = range.replace(/bytes=/, "").split("-");
          var start       = parseInt(positions[0], 10);
          var total       = stats.size;
          var end         = positions[1] ? parseInt(positions[1], 10) : total - 1;
          var chunksize   = (end - start) + 1;

          res.writeHead(206, {
              "Content-Range": "bytes " + start + "-" + end + "/" + total,
              "Accept-Ranges": "bytes",
              "Content-Length": chunksize,
              "Content-Type": "video/mp4"
          });

          var stream = fs.createReadStream(file, {
              start: start,
              end: end
          }).on("open", function() {
              stream.pipe(res);
          }).on("error", function(err) {
              res.end(err);
          });
      }
  });
  // **********
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
