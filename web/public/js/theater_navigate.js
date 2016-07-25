function playVideo(vid,still){
    var baseURL = 'http://localhost:9999/video/get_movie/';
    var vidplayer = document.getElementById('videoplayer');
    videojs(vidplayer).src({"type":"video/mp4", "src":baseURL + vid});
    videojs(vidplayer).poster(still);
}

function setFirstVideo(vid,still){
    var baseURL = 'http://localhost:9999/video/get_movie/';
    var vidplayer = document.getElementById('videoplayer');
    videojs(vidplayer).src({"type":"video/mp4", "src":baseURL + vid});
    videojs(vidplayer).poster(still);
}
