![](logo.png)

** *A YouTube-like video streaming server and web client written in Node.js.* **

I built this out of sheer curiosity after reading [this Gist](https://gist.github.com/paolorossi/1993068).  It looked like an interesting idea, so I started playing with it and over a weekend decided to turn this into an actual media client and server project.

At the moment, I'm not actively using this, so expect little enhancements.  I hope someone finds this useful and encourage anyone to send in your PRs.

## Disclaimer

First, the code right now is very dirty, hacky and disorganized.  I plan to fix this.  For the moment I'm working on this very organically, so please bear with me :)

Please don't consider this a full-featured media server or expect it to be production-ready.  I provide this as-is in the hopes that it's useful.

## Roadmap

I want to at least finish the client with a nice responsive UI, and perhaps build native mobile apps for iOS and Android, perhaps using [ReactNative](https://facebook.github.io/react-native/).

## Server

The server is an Express 4 app.  It exposes the following endpoints:

* **/data/get** : Returns a JSON String with all the videos on the site.
* **/video/get_meta/video-title** : Returns a JSON string with meta data for the specified video title
* **/video/get/video-file-name** : Returns a stream of the selected video

### Starting the server

Before proceeding, you'll need to create a **videos** folder at **servermvc/videos**, and drop some video files in it - I've only tested with **MOV** and **MP4** files by the way.  Then go to servermvc/db and open data.json.  To this file, add data that is relevant to the videos you have.

To start the server on port 9999 use the following command

```
PORT=9999 nodemon npm start
```

**Notice that I'm using [nodemon](https://github.com/remy/nodemon) to help in the development process**


> NOTE : One thing I was watching for was reducing the possibility of downloading the videos.  The [video player I'm using](http://videojs.com/) provides a Save Video link.  There are also extensions like VideoDownloadHelper, which detect media files on a web page and return download links.  For some reason, this implementation prevents downloading, resulting on an empty file.  I don't know why this is, but it's definitely a #WIN

## Start Client

The client is also an Express 4 app.  It acts as a thin-client consuming the APIs from the server.  It was designed to be as loosely-coupled as possible.


### Starting the client

To start the client on port 8080 use the following command.

```
PORT=8080 nodemon npm start
```

**Notice that I'm using [nodemon](https://github.com/remy/nodemon) to help in the development process**

## License

Licensed under the terms of the [MIT License](http://alco.mit-license.org/).
