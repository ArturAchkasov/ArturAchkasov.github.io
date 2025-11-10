"use strict"
const github_url = "https://github.com/dmarichuk"
const telegram_url = "https://t.me/d_marichuk"
const linkedin_url = "https://www.linkedin.com/in/daniel-marichuk-8a078420a/"

var counter = document.querySelector("#counter")
var loader = document.querySelector(".loader")

function bindRedirectToElement(selector, url) {
  document.querySelector(selector).addEventListener("click", function () {
    window.open(url)
  })
}

function add_cookie() {
  counter.innerText = counter.innerText + 1
}

async function get_cookie_counter() {
  let promise = await fetch(
    "https://dmarichukcv-e392.restdb.io/rest/cookie-counter", {
      method: "GET",
      headers: [
        ["Content-Type", "application/json"],
        ["X-apikey","619a2709fc71545b0f5e09ed"],
        ["Cache-Control","no-cache"]
      ]
    });

  if (promise.ok) {
    let response = await promise.json();
    return response[0]
  } else {
    return {cookie_counter: "Гномы устали считать печньки :(" }
  }
}

async function put_cookie_counter() {

  let syncData = await get_cookie_counter();

  if (syncData["cookie_counter"] == "Гномы устали считать печньки :(") {
    alert("Печеньки закончились :(")
    return null
  }

  let data = JSON.stringify({cookie_counter: syncData["cookie_counter"] + 1});

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      loader.style.display = "none";
      counter.style.display = "block";
      counter.innerText = parseInt(counter.innerText) + 1
    } else {
      counter.style.display = "none";
      loader.style.display = "block";
    }
  })

  xhr.open("PUT", `https://dmarichukcv-e392.restdb.io/rest/cookie-counter/${syncData["_id"]}`);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("x-apikey", "619a2709fc71545b0f5e09ed");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.send(data)
}

document.querySelector("#cookie-jar").addEventListener("click", put_cookie_counter);

bindRedirectToElement(".bi-github", github_url)
bindRedirectToElement(".bi-telegram", telegram_url)
bindRedirectToElement(".bi-linkedin", linkedin_url)

document.addEventListener("DOMContentLoaded", async function() {
  var cookieResponse = await get_cookie_counter();
  counter.innerText = cookieResponse["cookie_counter"];
})
