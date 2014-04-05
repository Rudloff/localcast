/*global chrome*/
/*jslint devel: true, browser: true */
var castBtn, stopBtn, statusText;
var session, currentMedia;

function receiverListener() {
    'use strict';
    console.log('receiverListener');
}

function onMediaDiscovered(how, media) {
    'use strict';
    console.log('onMediaDiscovered', how);
    currentMedia = media;
    castBtn.classList.add('cast-btn-on');
    stopBtn.disabled = false;
    if (media.media) {
        statusText.textContent = 'Casting ' + media.media.contentId;
    }
}

function onStopCast() {
    'use strict';
    statusText.textContent = 'Not casting';
    castBtn.classList.remove('cast-btn-on');
    stopBtn.disabled = true;
    session = undefined;
}

function stopCast() {
    'use strict';
    session.stop(onStopCast);
}

function onMediaError(e) {
    'use strict';
    console.log('onMediaError', e.description);
    stopCast();
}

function castMedia() {
    'use strict';
    var serverInfo = document.getElementById('server_info'), fileChooser = document.getElementById('fileChooser'), imgURL = 'http://' + serverInfo.textContent + serverInfo.dataset.path + '/media/' + fileChooser.value, mediaInfo = new chrome.cast.media.MediaInfo(imgURL, fileChooser.options[fileChooser.selectedIndex].dataset.mime), request = new chrome.cast.media.LoadRequest(mediaInfo);
    console.log('Casting', imgURL);
    session.loadMedia(request, onMediaDiscovered.bind(this, 'loadMedia'), onMediaError);
}

function sessionListener(e) {
    'use strict';
    if (castBtn) {
        session = e;
        session.addMediaListener(onMediaDiscovered.bind(this, 'addMediaListener'));
        if (session.media.length !== 0) {
            onMediaDiscovered('onRequestSessionSuccess', session.media[0]);
        }
    }
}

function onRequestSessionSuccess(e) {
    'use strict';
    session = e;
    castMedia();
}

function onLaunchError(e) {
    'use strict';
    console.log('onLaunchError', e.description);
}

function launchCast() {
    'use strict';
    if (session) {
        castMedia();
    } else {
        chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
    }
}

function onInitSuccess() {
    'use strict';
    castBtn = document.getElementById('cast_btn_launch');
    stopBtn = document.getElementById('cast_btn_stop');
    statusText = document.getElementById('status');
    if (castBtn) {
        castBtn.addEventListener('click', launchCast, false);
        stopBtn.addEventListener('click', stopCast, false);
    }
}

function onError() {
    'use strict';
    console.log('onError');
}

function initializeCastApi() {
    'use strict';
    var sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID), apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function loadCastApi(loaded, errorInfo) {
    'use strict';
    if (loaded) {
        initializeCastApi();
    } else {
        console.log(errorInfo);
    }
}

window['__onGCastApiAvailable'] = loadCastApi;
