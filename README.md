![](logo.png)

I built this out of sheer curiosity after reading [this Gist](https://gist.github.com/paolorossi/1993068).  It looked like an interesting idea, so I started playing with it and over a weekend decided to turn this into an actual media client and server project.

At the moment, I'm not actively using this, so expect little enhancements.  I hope someone finds this useful and encourage anyone to send in your PRs.

## Disclaimer

Please don't consider this a full-featured media server or expect it to be production-ready.  I provide this as-is in the hopes that it's useful.

## Server

The server is an Express 4 app.  It exposes the following endpoints:

* **/data/get** : Returns a JSON String with all the videos on the site.
* **/video/get_meta/video-title** : Returns a JSON string with meta data for the specified video title
* **/video/get/video-file-name** : Returns a stream of the selected video

### Starting the server

To start the server on port 9999 use the following command

```
PORT=9999 nodemon npm start
```

**Notice that I'm using [nodemon](https://github.com/remy/nodemon) to help in the development process**


> NOTE : One thing I was watching for was reducing the possibility of downloading the videos.  The video player provides a Save Video link.  There are also extensions like VideoDownloadHelper, which detect media files on a web page and return download links.  For some reason, this implementation prevents downloading, resulting on an empty file.  I don't know why this is, but it's definitely a #WIN

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
