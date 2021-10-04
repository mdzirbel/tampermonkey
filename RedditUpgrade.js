// ==UserScript==
// @name         Reddit Fix
// @namespace    http://tampermonkey.net/
// @description  Filter, remove PROMOTED, clean up options a bit
// @author       Matthew Zirbel
// @match        https://www.reddit.com/r/all/
// @grant        GM_getValue
// @grant        GM.setValue
// ==/UserScript==

(function() {

    setInterval(ongoingFixup, 3000);

})();

function ongoingFixup() {

    // Filter out PROMOTED

    let promotedEntities = document.evaluate("//span[.='promoted']", document, null, XPathResult.ANY_TYPE, null)
    let promotedEntity = promotedEntities.iterateNext()
    while (promotedEntity) {
        filterFromLink(promotedEntity)
        promotedEntity = promotedEntities.iterateNext()
    }

    // // Remove unnecessary options

    // let filteredOptions = ["Give Award", "share", "save", "hide", "report"]

    // for (let i=0; i<filteredOptions.length; i++) {
    //     let optionsToFilter = document.evaluate("//span[.='"+filteredOptions[i]+"']", document, null, XPathResult.ANY_TYPE, null)
    //     let optionToFilter = optionsToFilter.iterateNext()
    //     while (optionToFilter) {
    //         optionToFilter.parentElement.style.display = "none"
    //         optionToFilter = optionsToFilter.iterateNext()
    //     }
    // }

    // Add "Filter" button

    optionContainers = document.getElementsByClassName("_3-miAEojrCvx_4FQ8x3P-s ssgs3QQidkqeycI33hlBa") // The div which holds Comments, Filter button, etc.

    for (let i=0; i<optionContainers.length; i++) {
        optionContainer = optionContainers[i]

        if (!optionContainer.classList.contains("has_filter_button")) {

            // PROMOTED throw an error. Skip it
            try {
                let subredditName = optionContainer.parentElement.previousSibling.previousSibling.firstChild.firstChild.innerText

                let btn = document.createElement("BUTTON")
                btn.className = "_10K5i7NW6qcm-UoCtpB3aK _3tRpmsTw--cwH6_MAO3ZOm _3yh2bniLq7bYr4BaiXowdO _2sAFaB0tx4Hd5KxVkdUcAx _28vEaVlLWeas1CDiLuTCap"
                btn.setAttribute("role", "menuitem")
                btn.addEventListener("click", function(){addToFilter(subredditName)})

                let span = document.createElement("SPAN")
                span.innerHTML = "Filter"
                span.className = "_2-cXnP74241WI7fpcpfPmg"

                btn.appendChild(span)
                optionContainer.insertBefore(btn, optionContainer.children[6])

                optionContainer.classList.add("has_filter_button")

            }
            catch (ReferenceError) {} 
        }
    }

    // Filter out subreddits

    filteredSubreddits = localStorage.getItem("filteredSubreddits")

    if (filteredSubreddits !== null) {
        filteredSubreddits = filteredSubreddits.split(" ")

        for (let i=0; i<filteredSubreddits.length; i++) {
            if (filteredSubreddits[i] !== "") {
                filterSubreddit(filteredSubreddits[i])
            }
        }
    }
}

function addToFilter(subredditName) {
    console.log("Adding " + subredditName + " to filter")
    filteredSubreddits = localStorage.getItem("filteredSubreddits")
    filteredSubreddits += " " + subredditName
    localStorage.setItem("filteredSubreddits", filteredSubreddits)
}

function filterSubreddit(subreddit) {
    let entriesFromSubreddit = document.evaluate("//a[.='"+subreddit+"']", document, null, XPathResult.ANY_TYPE, null)
    let entryFromSubreddit = entriesFromSubreddit.iterateNext()
    while (entryFromSubreddit) {
        filterFromLink(entryFromSubreddit)
        entryFromSubreddit = entriesFromSubreddit.iterateNext()
    }
}

function filterFromLink(entryFromSubreddit) {
    entryFromSubreddit.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.display = "none";
}

function listFilters() {
    let filters = localStorage.getItem("filteredSubreddits")
    console.log("Currently filtered subreddits:"+filters)
}