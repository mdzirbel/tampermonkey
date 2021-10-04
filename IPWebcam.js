// ==UserScript==
// @name         IP Webcam Big Video
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Filter, remove PROMOTED, clean up options a bit
// @author       Matthew Zirbel
// @include      http://192.168.0*:8080/*
// @grant        none
// @require      file://C:\Users\matth\Documents\Programming Projects\Tampermonkey\IPWebcam.js
// ==/UserScript==

(function() {
    setInterval(ongoingFixup, 1000);
})();
function ongoingFixup() {

    let width = window.innerWidth-2-40
    params = getUrlVars()
    if ("w" in params) {
        width = width / 100 * params["w"]
    }

    let video_pane = document.getElementById("video_pane")
    let browser_video = document.getElementById("browser_video")

    video_pane.style.margin = "0px"
    video_pane.style.width = width + "px"
    video_pane.border = "none"

    browser_video.setAttribute('style', 'max-width:none !important; max-height:none !important; width: '+width+'px !important;');
}

function getUrlVars() { // Maaaaaaaaaagic
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}