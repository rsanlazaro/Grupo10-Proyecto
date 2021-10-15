
let videoScreen = document.querySelector('#video-screen');
let takeScreenshotBtn = document.querySelector('#take-screenshot');
//var canvas = document.getElementById("my-canvas");

let stopBtn = document.querySelector('#stop');
let showScreenshotCanvas = document.querySelector('#show-screenshot');

let img = document.querySelector('#token-img');

//popup
    
$('.show-popup').click(function (e) {
    e.preventDefault();
    $('.' + $(this).data('popup')).fadeIn();
    var constraints = {
        audio: false,
        video: true
    };
    
    takeScreenshotBtn.addEventListener("click", () => {
        showScreenshotCanvas.width = videoScreen.videoWidth;
        showScreenshotCanvas.height = videoScreen.videoHeight;
        showScreenshotCanvas.getContext('2d').drawImage(videoScreen, 0, 0);
    
         img.src = showScreenshotCanvas.toDataURL("image/webp");
    });
    
    stopBtn.addEventListener("click", () => {
        var streams = videoScreen.srcObject;
        var tracks = streams.getTracks();
    
        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
        }
    
        video.srcObject = null;
    });
    
    navigator.mediaDevices.getUserMedia(constraints)
        .then((streams) => {
            videoScreen.srcObject = streams;
        })
        .catch((error) => {
            console.log(error);
        })
    
    let takeScreenshot = document.querySelector("#take-screenshot");
    let imageContainer = document.querySelector("#img-container");
    takeScreenshot.addEventListener('click', () => {
        imageContainer.style.display = "block";
    });
    
    
    let btnDownload = document.querySelector('#Download-Btn');
    let img1 = document.querySelector('#token-img');
     
     
    // Must use FileSaver.js 2.0.2 because 2.0.3 has issues.
    btnDownload.addEventListener('click', () => {
        let imagePath = img1.getAttribute('src');
        console.log('imagePath -> ' + imagePath)
        let fileName = 'l'
        console.log('click -> ')
        saveAs(imagePath,"image.jpeg");
        $("#imagePreview").attr("src", imagePath);
        $("#imageUpload").attr("value", imagePath);
    });
     
    function getFileName(str) {
        return str.substring(str.lastIndexOf('/') + 1)
    }
});

$('.popup').click(function () {
    var streams = videoScreen.srcObject;
    var tracks = streams.getTracks();
    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }
    $(this).fadeOut();
});

$('.popup .inner').click(function (e) {
    e.stopPropagation();
});

$('.popup .exit').click(function (e) {
    var streams = videoScreen.srcObject;
    var tracks = streams.getTracks();
    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }
    e.preventDefault();
    $(this).parentsUntil('.popup').parent().fadeOut();
    //$(this).parents('.popup').fadeOut();
});

$(document).keydown(function (e) {
    var streams = videoScreen.srcObject;
    var tracks = streams.getTracks();
    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }
    if (e.keyCode === 27) {
        $('.popup').fadeOut();
    }
});