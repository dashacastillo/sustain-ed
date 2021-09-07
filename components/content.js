'use strict';

var current_page = "dfa-prompts-intro";
var index = 0;
var pages = ["motivation", "wanted", "sustainable", "return", "disposal", "dfa-congrats", "dfa-reflection"];
var default_responses = ["Building better habits starts with small steps.", "Always think through purchases before buying.", "You took the time today to be more sustainable!"];
var summaries = ["hmm, maybe reconsider this purchase or think about how it can be more sustainable!", "this sounds like a good purchase, but we still recommend thinking about it longer!", "this sounds like a sustainable, conscientious purchase! if you're sure, go for it!"];
function shuffle(array) {
    array.sort(function () {
        return Math.random() - 0.5;
    });
}

function resetQuestions() {
    final_points = [0, 0, 0, 0, 0];
    final_responses = new Set();
    var question_btns = document.getElementsByClassName("dfa-question-active");
    for (var i = question_btns.length - 1; i >= 0; i--) {
        if (question_btns[i].children[0].className == "dfa-main-leaf") {
            question_btns[i].children[0].className = "dfa-empty-leaf";
        } else {
            question_btns[i].children[0].className = "dfa-empty-check";
        }
        question_btns[i].className = "dfa-question";
    }
}

function goPage(page) {
    document.getElementById(current_page).style.display = "none";
    document.getElementById(page).style.display = "block";
    current_page = page;
}

function goHome() {
    goPage("dfa-home");
    resetQuestions();
    activateHome();

    document.getElementById("dfa-arrow-container").style.display = "none";
}

function goPrompts() {
    goPage('dfa-prompts-intro');
    resetQuestions();
    activatePrompts();

    document.getElementById("dfa-arrow-container").style.display = "none";
}

function goFirstPage() {
    goPage(pages[0]);
    index = 0;

    document.getElementById("dfa-arrow-container").style.display = "flex";
    document.getElementById("dfa-left-arrow").style.display = "none";
    document.getElementById("dfa-right-arrow").style.right = "0";
    document.getElementById("dfa-right-arrow").style.position = "absolute";
    activatePrompts();
}

function goForward() {
    index += 1;
    goPage(pages[index]);

    if (current_page == "dfa-reflection") {
        document.getElementById("dfa-arrow-container").style.display = "none";
        var score = final_points.reduce(function (a, b) {
            return a + b;
        }, 0);
        var summary = "";
        if (score < 4) {
            summary = summaries[0];
            document.getElementById("summary").style = "color: #cc7070";
            if (score == 0) {
                document.getElementById("stars").className = "stars zero-stars";
            } else if (score == 1) {
                document.getElementById("stars").className = "stars one-stars";
            } else if (score == 2) {
                document.getElementById("stars").className = "stars two-stars";
            } else {
                document.getElementById("stars").className = "stars three-stars";
            }
        } else if (score < 5) {
            summary = summaries[1];
            document.getElementById("summary").style = "olor: f4d600";
            document.getElementById("stars").className = "stars four-stars";
        } else {
            summary = summaries[2];
            document.getElementById("summary").style = "color: #5aa16e";
            document.getElementById("stars").className = "stars five-stars";
        }

        document.getElementById("summary").innerHTML = summary;
        if (final_responses.size < 3) {
            default_responses.forEach(final_responses.add, final_responses);
        }
        var possible_reponses = Array.from(final_responses);
        shuffle(possible_reponses);
        document.getElementById("response1").innerHTML = possible_reponses[0];
        document.getElementById("response2").innerHTML = possible_reponses[1];
        document.getElementById("response3").innerHTML = possible_reponses[2];
    }

    if (current_page == "dfa-congrats") {
        setTimeout(function () {
            if (current_page == "dfa-congrats") {
                goForward();
            }
        }, 2700);
    }

    document.getElementById("dfa-left-arrow").style.display = "block";
}

function goBack() {
    index -= 1;
    goPage(pages[index]);

    if (current_page == "dfa-prompts-intro") {
        document.getElementById("dfa-arrow-container").style.display = "none";
    } else if (current_page == pages[0]) {
        document.getElementById("dfa-left-arrow").style.display = "none";
    }
}

function goAbout() {
    goPage('dfa-about-us');
    activatePrompts();
}

function goInfo() {
    window.open('https://web.mit.edu/sustained/', '_blank');
}

function goWebsite() {
    window.open('https://web.mit.edu/sustained/', '_blank');
}

function activateHome() {
    document.getElementById("active-button-home").style.display = "block";
    document.getElementById("inactive-button-home").style.display = "none";
    document.getElementById("active-button-prompts").style.display = "none";
    document.getElementById("inactive-button-prompts").style.display = "block";
}

function activatePrompts() {
    document.getElementById("active-button-home").style.display = "none";
    document.getElementById("inactive-button-home").style.display = "block";
    document.getElementById("active-button-prompts").style.display = "block";
    document.getElementById("inactive-button-prompts").style.display = "none";
}

document.getElementById("dfa-button-home").addEventListener('click', goHome);
document.getElementById("dfa-button-prompts").addEventListener('click', goPrompts);
document.getElementById("dfa-button-begin").addEventListener('click', goFirstPage);
document.getElementById("dfa-right-arrow").addEventListener('click', goForward);
document.getElementById("dfa-left-arrow").addEventListener('click', goBack);
document.getElementById("dfa-answer").addEventListener('click', goFirstPage);
document.getElementById("dfa-learn").addEventListener('click', goInfo);
document.getElementById("dfa-tell").addEventListener('click', goWebsite);
document.getElementById("dfa-resources").addEventListener('click', goWebsite);
document.getElementById("home-resources").addEventListener('click', goWebsite);