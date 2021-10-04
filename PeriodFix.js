// ==UserScript==
// @name         WebNovelOnline Period Fix
// @namespace    http://tampermonkey.net/
// @description  Fix the error where some words have periods in them (ex.a.m.p.le)
// @author       Matthew Zirbel
// @match        https://webnovelonline.com/*
// ==/UserScript==

(function() {

    console.log("Working")

    let removeTexts = ["Previous Chapter", "*** You are reading on https://webnovelonlinecom ***", "Table of Contents", "Next Chapter", "{{commentPoster}}", "Joined {{commentJoinDate | formatDate}}", "{{commentUserComments}} comments", "This comment has been deleted!", "{{commentLikes}}", "{{commentDislikes}}", "Posted (Not yet approved)"]

    var paragraphs = document.getElementsByTagName("p")

    console.log(paragraphs.length)
	for (var i=0; i < paragraphs.length; i++) {


		let text = paragraphs[i].innerHTML

		if (removeTexts.includes(text) || text === "*** You are reading on https://webnovelonlinecom ***") {
			paragraphs[i].remove()
		}

		else {
			
			console.log("@: " + text)

			text = text.split(". ").join("@@@")
			text = text.split(".").join("")
			text = text.split("@@@").join(". ")
			console.log(text)

			paragraphs[i].innerHTML = text

		}

		
	}

})();