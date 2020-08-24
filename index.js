// const dotenv = require('dotenv')
// dotenv.config()
// const api_key = process.env.API_KEY

let arrayOfChars
let addedParam = ""
let initialResults = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=${api_key}&limit=100&nameStartsWith=`
const captureInput = (input) => {
  addedParam = input
}
const allPosts = document.getElementById("fetch-body")
window.onload = function () {
  getChars()
  // setTimeout(displayStuff, 2000)
}
async function getChars() {
  const response = await fetch(`${initialResults}` + `${addedParam}`)
    .then((res) => res.json())
    .then((chars) => (arrayOfChars = chars.data.results))
  displayStuff()
} 
// display styled api content
const displayStuff = function () {
  clearChildren()
  arrayOfChars.forEach((character) => {
    const li = document.createElement("LI")
    const div = document.createElement("DIV")
    const thumbnail = document.createElement("IMG")
    div.className = "tooltip"
    const tooltipText = document.createElement("SPAN")
    tooltipText.className = "tooltiptext"
    const comicText = document.createElement("LI")
    comicText.innerHTML = `COMICS: ${character.comics.items.map((x) => x.name)}`
    const seriesText = document.createElement("LI")
    seriesText.innerHTML = `SERIES: ${character.series.items.map(
      (x) => x.name
    )}`
    const storiesText = document.createElement("LI")
    storiesText.innerHTML = `STORIES: ${character.stories.items.map(
      (x) => x.name
    )}`
    const eventsText = document.createElement("LI")
    eventsText.innerHTML = `EVENTS: ${character.events.items.map(
      (x) => x.name
    )}`
    const archivesText = document.createElement("LI")
    archivesText.innerHTML = `OFFICIAL ARCHIVES: ${character.urls.map(
      (x) => `<a href="${x.url}">${x.type}</a>`
    )}`
    comicText.className = "comic-text"
    seriesText.className = "series-text"
    storiesText.className = "stories-text"
    eventsText.className = "events-text"
    archivesText.className = "archives-text"

    tooltipText.innerHTML = `${character.name}. ${character.description}`

    div.appendChild(thumbnail)
    thumbnail.src = `${character.thumbnail.path}.${character.thumbnail.extension}`
    // thumbnail.style.width = "400px"
    thumbnail.addEventListener("click", function () {
      li.append(comicText)
      li.append(seriesText)
      li.append(storiesText)
      li.append(eventsText)
      li.append(archivesText)
    })

    li.appendChild(div)
    div.appendChild(tooltipText)
    allPosts.appendChild(li)
    li.style.listStyleType = "none"
  })

  let tooltip = document.querySelectorAll(".tooltiptext")
  document.addEventListener("mousemove", fn, false)
  function fn(e) {
    for (let i = tooltip.length; i--; ) {
      tooltip[i].style.left = e.pageX + "px"
      tooltip[i].style.top = e.pageY + "px"
    }
  }

  const h3portion = " (some details and/or images unavailable)"
  const spanElement = document.createElement("SPAN")
  spanElement.style.color = "red"
  spanElement.innerHTML = h3portion
  h3.innerText = `Click images for Details`
  h3.append(spanElement)
  h3portion.style.color = "red"
}
// displayStuff ends here //

// clears results
const clearChildren = () => {
  let element = document.getElementById("fetch-body")
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
